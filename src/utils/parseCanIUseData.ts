// @ts-nocheck

const android_chrome = 'and_chr';
const ios_safari = 'ios_saf';

export const orderCanIUseData = (data: any) => {
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
  'asmjs', // deprecated
  'do-not-track', // not adopted
  'filesystem', // might no longer be maintained but still supported in chrome
  'sql-storage', // deprecating maybe drop later?,
  'battery-status', // remove because due to fingerprinting - really they should just limit the api some
  'feature-policy', // deprecated
] as const;

export const getIOSSafariLacking = (canIUseData: any) => {
  if (!canIUseData) return [];
  // TODO: Make sure this is memorized?
  const { data, agents } = canIUseData;
  const chromeVersion = agents[android_chrome].current_version;
  const iosVersion = agents[ios_safari].current_version;
  const safariVersion = agents.safari.current_version;
  const safariDoesNotSupport = Object.entries(data)
    .filter(([k, v]) => {
      if (skipFeatures.includes(k)) return false; // non-relevant features
      const iOSStatus = v.stats[ios_safari][iosVersion];
      const androidChromeStatus = v.stats[android_chrome][chromeVersion];
      return (
        (iOSStatus.startsWith('n') && !androidChromeStatus.startsWith('n')) ||
        (iOSStatus.startsWith('a') && androidChromeStatus.startsWith('y'))
      );
    })
    .map(([k, v]) => {
      // find first time supported
      // TODO: Make sure Android Chrome get credit for Chromium first parenting
      let firstSeen = Object.entries(v.stats).reduce(
        (acc, [browserKey, stat]) => {
          const firstY = Object.entries(stat).find(
            ([_, status]) => status.startsWith('y') && _ !== 'TP' // come on we don't count TP
          );
          if (firstY) {
            const date = agents[browserKey].version_list.find(
              (v) => v.version === firstY[0]
            ).release_date;
            if (!date) return acc;
            // console.log(date, firstY);
            return (acc.length === 0 || date < acc[1]) && browserKey !== 'baidu' // let chromium win over say Baidu
              ? [agents[browserKey].browser, date, firstY[0]]
              : acc;
          }
          return acc;
        },
        []
      );

      let noBrowserFullSupport = false;

      // maybe just kinda supported elsewhere
      if (firstSeen.length === 0) {
        firstSeen = Object.entries(v.stats).reduce(
          (acc, [browserKey, stat]) => {
            const firstY = Object.entries(stat).find(
              ([_, status]) => status.startsWith('a') && _ !== 'TP' // come on we don't count TP
            );
            if (firstY) {
              const date = agents[browserKey].version_list.find(
                (v) => v.version === firstY[0]
              ).release_date;
              if (!date) return acc;
              // console.log(date, firstY);
              return (acc.length === 0 || date < acc[1]) &&
                browserKey !== 'baidu' // let chromium win over say Baidu
                ? [agents[browserKey].browser, date, firstY[0]]
                : acc;
            }
            return acc;
          },
          []
        );
        if (firstSeen.length === 0) {
          noBrowserFullSupport = true;
        }
      }
      const desktopSafariStat = v.stats.safari[safariVersion];
      const safariStat = v.stats[ios_safari][iosVersion];
      const chromeStat = v.stats[android_chrome][chromeVersion];
      return {
        ...v,
        desktopSafariStat,
        key: k,
        firstSeen,
        noBrowserFullSupport, // TODO: make a note that no browser full supports this feature
        safariStat,
        chromeStat,
      };
    })
    .filter((v) => {
      return v.firstSeen.length > 0;
    })
    .map((v, i) => {
      return { ...v, index: i };
    });
  return safariDoesNotSupport;
};
