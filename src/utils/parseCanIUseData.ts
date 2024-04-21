import { CIU } from './canIUseTypes';
import { MissingFeatureType, SupportType } from './missingFeature';
import { compareBrowsers } from './constants';

const ios_saf = 'ios_saf';

export const orderCanIUseData = (data: CIU): CIU => {
  return {
    ...data,
    data: Object.fromEntries(
      Object.entries(data.data).sort((a, b) =>
        a[1].title.localeCompare(b[1].title)
      )
    ),
  };
};

// Features that we don't actually care about - deprecated or not relevant to mobile/ipad
const skipFeatures = [
  'webkit-user-drag', // draggable taking its place
  'asmjs', // deprecated
  'do-not-track', // not adopted
  'filesystem', // no longer be maintained but still supported in chrome
  'sql-storage', // deprecating maybe drop later?,
  'feature-policy', // deprecated
] as const;

const getCompareBrowserSupport = ({ stats, agents }) => {
  const iOSVersion = agents[ios_saf].current_version;
  const iOSStatus = stats[ios_saf][iOSVersion];
  const iOSN = iOSStatus.startsWith('n');
  const iOSA = iOSStatus.startsWith('a');
  return compareBrowsers.map(({ ciuKey: key }) => {
    const version = agents[key].current_version;
    const support = stats[key][version];
    const betterSupport =
      (iOSN && !support.startsWith('n')) || (iOSA && support.startsWith('y'));
    return { key, support, betterSupport };
  });
};

const getFirstSeen = ({
  stats,
  level,
  agents,
}: {
  stats: any;
  level: 'a' | 'y';
  agents: any;
}) => {
  const found = Object.entries(stats).reduce((acc, [browserKey, stat]) => {
    const first = Object.entries(stat).find(
      ([_, status]) => status.startsWith(level) && _ !== 'TP' // we don't count TP
    );
    if (first) {
      const date = agents[browserKey].version_list.find(
        (v) => v.version === first[0]
      ).release_date;
      if (!date) return acc;
      return (acc.length === 0 || date < acc[1]) && browserKey !== 'baidu' // let chromium win over say Baidu... might need to do this with more
        ? [agents[browserKey].browser, date, first[0]]
        : acc;
    }
    return acc;
  }, []);
  return {
    found,
    noBrowserFullSupport: found.length === 0,
  };
};

export const parseCanIUseData = (canIUseData: CIU | null) => {
  console.log(canIUseData);
  if (!canIUseData) return [];
  // TODO: Make sure this is memorized?
  const { data, agents } = canIUseData;
  const iosVersion = agents[ios_saf].current_version;
  const safariVersion = agents.safari.current_version;
  const safariDoesNotSupport = Object.entries(data)
    .filter(([k, v]) => {
      if (skipFeatures.includes(k)) return false; // non-relevant features
      return getCompareBrowserSupport({
        agents,
        stats: v.stats,
      }).some(({ betterSupport }) => betterSupport);
    })
    .map(([k, v]) => {
      // Find first time fully supported
      let { found: firstSeen, noBrowserFullSupport } = getFirstSeen({
        stats: v.stats,
        level: 'y',
        agents,
      });
      // Maybe the best support is partial
      if (noBrowserFullSupport) {
        ({ found: firstSeen, noBrowserFullSupport } = getFirstSeen({
          stats: v.stats,
          level: 'a',
          agents,
        }));
      }

      const browsers = Object.fromEntries(
        getCompareBrowserSupport({
          agents,
          stats: v.stats,
        }).map(({ key, support, betterSupport }) => [
          key,
          { support: support.slice(0, 1) as SupportType, betterSupport },
        ])
      );

      const desktopSafariStat = v.stats.safari[safariVersion];
      const iOSWebkitStat = v.stats[ios_saf][iosVersion];

      const notes = Object.entries(v.notes_by_num)
        .map(([num, note]) => {
          if (
            !iOSWebkitStat
              .replaceAll(' ', '')
              .replaceAll(/a|n|y/gi, '')
              .split('#')
              .includes(num)
          )
            return undefined;
          return note;
        })
        .filter((v) => v);

      // Not all props are getting passed through
      // for not ignoring: categories, chrome_id, links, notes, parent, stats, ucprefix, usage_perc_a, usage_perc_y

      const res: MissingFeatureType = {
        title: v.title,
        description: v.description,
        notes,
        specUrl: v.spec,
        specKey: v.status,
        iOSWebkitStat: iOSWebkitStat.slice(0, 1) as SupportType,
        desktopSafariStat: desktopSafariStat.slice(0, 1) as SupportType,
        id: k,
        firstSeen,
        browsers,
        source: 'caniuse',
        sourceUrl: `https://caniuse.com/${k}`,
      };

      return res;
    })
    .filter((v) => v.firstSeen.length > 0); // needs to have been supported at some time
  return safariDoesNotSupport;
};
