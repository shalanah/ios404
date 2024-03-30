// @ts-nocheck

import { CIU } from './canIUseTypes';

const ios_saf = 'ios_saf';
const compareBrowsers = [
  { key: 'and_chr', title: 'Chrome for Android' },
  { key: 'and_ff', title: 'Firefox for Android' },
  { key: 'safari', title: 'Mac Safari (Desktop)' },
];

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
  'filesystem', // might no longer be maintained but still supported in chrome
  'sql-storage', // deprecating maybe drop later?,
  'battery-status', // remove because due to fingerprinting - really they should just limit the api some
  'feature-policy', // deprecated
] as const;

const getCompareBrowserSupport = ({ stats, agents }) => {
  const iOSVersion = agents[ios_saf].current_version;
  const iOSStatus = stats[ios_saf][iOSVersion];
  const iOSN = iOSStatus.startsWith('n');
  const iOSA = iOSStatus.startsWith('a');
  return compareBrowsers.map(({ key }) => {
    const version = agents[key].current_version;
    const support = stats[key][version];
    const moreThanIOSSafari =
      (iOSN && !support.startsWith('n')) || (iOSA && support.startsWith('y'));
    return { key, support, moreThanIOSSafari };
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

export const getIOSMissingFeatures = (canIUseData: CIU | null) => {
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
      }).some(({ moreThanIOSSafari }) => moreThanIOSSafari);
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
        }).map(({ key, support, moreThanIOSSafari }) => [
          key,
          { support, moreThanIOSSafari },
        ])
      );

      const desktopSafariStat = v.stats.safari[safariVersion];
      const safariStat = v.stats[ios_saf][iosVersion];
      return {
        ...v,
        desktopSafariStat,
        key: k,
        firstSeen,
        noBrowserFullSupport, // TODO: make a note that no browser full supports this feature
        safariStat,
        browsers,
      };
    })
    .filter((v) => v.firstSeen.length > 0) // needs to have been supported at some time
    .map((v, i) => {
      return { ...v, index: i };
    });
  return safariDoesNotSupport;
};

export type IOSMissingFeaturesType = ReturnType<typeof getIOSMissingFeatures>;
