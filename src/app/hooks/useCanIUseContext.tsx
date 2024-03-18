// @ts-nocheck
'use client';

import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useHash } from './useHash';
import usePrefersColorScheme from 'use-prefers-color-scheme';

interface CanIUseContextInterface {
  loading: boolean;
  hasError: boolean;
  iOSLacking: any;
  activeIndex: number;
  updateHash: (hash: string) => void;
  statusCounts: any;
  statuses: any;
  filters: any;
  setFilters: (filters: any) => void;
  isDarkMode: boolean;
  setColorScheme: (mode: string) => void;
  filteredData: any;
  search: string;
  setSearch: (search: string) => void;
  setNextFeature: (args: {
    forwards: boolean;
    e?: Event;
    featureActive?: boolean;
  }) => void;
}

const dataLink =
  'https://raw.githubusercontent.com/Fyrd/caniuse/master/fulldata-json/data-2.0.json';
const android_chrome = 'and_chr';
const ios_safari = 'ios_saf';

// Features that we don't actually care about - deprecated or not relevant to mobile/ipad
const skipFeatures = [
  'asmjs', // deprecated
  'do-not-track', // not adopted
  'filesystem', // might no longer be maintained but still supported in chrome
  'sql-storage', // deprecating maybe drop later?,
  'battery-status', // remove because due to fingerprinting - really they should just limit the api some
  'feature-policy', // deprecated
];

const getIOSSafariLacking = (canIUseData: any) => {
  if (!canIUseData) return [];
  const { statuses, data, agents } = canIUseData;
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

// Game state... could probably be broken out into smaller files / hooks
export const CanIUseContext = createContext<CanIUseContextInterface | null>(
  null
);
export const buttonClass = 'feature-list-button';

export const CanIUseContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [loading, setLoading] = useState(true);
  const [canIUseData, setData] = useState(false);
  const [hasError, setHasError] = useState(false);
  const iOSLacking = getIOSSafariLacking(canIUseData);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{
    statuses: { [k: string]: boolean };
  }>({
    statuses: {
      cr: true,
      ls: true,
      other: true,
      pr: true,
      rec: true,
      unoff: true,
      wd: true,
    },
  });
  const statusCounts = iOSLacking.reduce((acc, v) => {
    acc[v.status] += 1;
    return acc;
  }, Object.fromEntries(Object.entries(canIUseData?.statuses || {}).map(([k, v]) => [k, 0])));
  const prefersColorScheme = usePrefersColorScheme();
  const [mode, setColorScheme] = useState(prefersColorScheme);
  const isDarkMode = mode === 'dark';
  useEffect(() => {
    setColorScheme(prefersColorScheme);
  }, [prefersColorScheme]);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const [hash, updateHash] = useHash();
  let activeIndex =
    iOSLacking.length > 0 ? iOSLacking.findIndex((v) => v.key === hash) : -1;
  if (activeIndex === -1 && iOSLacking.length > 0) activeIndex = 0;

  // on mount... if hash doesn't exist remove hash
  useEffect(() => {
    if (activeIndex === -1 && iOSLacking.length > 0 && hash) updateHash('');
  }, [updateHash, activeIndex, iOSLacking.length, hash]);

  // If Safari brings up that caniuse data isn't up-to-date...
  // Maybe they should work on that --- who do they really have to blame? That's part of their job, right? Right?
  useEffect(() => {
    fetch('https://unpkg.com/@mdn/browser-compat-data')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        let parsedData = [];
        for (const [cat, mainFeatures] of Object.entries(data)) {
          for (const [mainFeatureKey, features] of Object.entries(
            mainFeatures
          )) {
            if (features.__compat && features.__compat.mdn_url) {
              if (features?.status?.deprecated) continue;
              const {
                __compat: {
                  support: { safari_ios, chrome_android },
                },
              } = features;
              const chromeSupport = Array.isArray(chrome_android)
                ? chrome_android?.[0]?.version_added
                : chrome_android?.version_added;
              const safariSupport = Array.isArray(safari_ios)
                ? safari_ios?.[0]?.version_added
                : safari_ios?.version_added;
              if (safariSupport || !chromeSupport) continue;
              parsedData.push({ cat, mainFeatureKey, features });
            } else {
              for (const [featureKey, feature] of Object.entries(features)) {
                if (feature.__compat && feature.__compat.mdn_url) {
                  if (feature?.status?.deprecated) continue;
                  const {
                    __compat: {
                      support: { safari_ios, chrome_android },
                    },
                  } = feature;
                  const chromeSupport = Array.isArray(chrome_android)
                    ? chrome_android?.[0]?.version_added
                    : chrome_android?.version_added;
                  const safariSupport = Array.isArray(safari_ios)
                    ? safari_ios?.[0]?.version_added
                    : safari_ios?.version_added;
                  if (safariSupport || !chromeSupport) continue;
                  parsedData.push({ cat, mainFeatureKey, feature, featureKey });
                }
              }
            }
          }
        }

        // const parseData = Object.entries(data).reduce(
        //   (acc, [cat, mainFeatures]) => {
        //     return Object.entries(mainFeatures).reduce(
        //       (a, [mainFeatureKey, features]) => {
        //         if (features.__compat && features.__compat.mdn_url) {
        //           const compat = features.__compat;
        //           const status = compat.status;
        //           if (
        //             status?.deprecated ||
        //             compat?.support?.safari_ios?.version_added || // supported in ios
        //             !compat?.support?.chrome_android?.version_added // not supported in chrome android
        //           )
        //             return acc;
        //           return [...acc, { cat, mainFeatureKey, features }];
        //         } else {
        //           return acc;
        //           console.log('there is more');
        //         }
        //       },
        //       []
        //     );
        //   },
        //   []
        // );
        console.log(parsedData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetch(dataLink)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false); // could be useReducer instead
      })
      .catch((err) => {
        setHasError(true);
        setLoading(false);
        console.error(err);
      });
  }, []);

  let filteredData = iOSLacking.filter((v) => filters.statuses[v.status]);
  if (search.trim().length > 0) {
    const searchLower = search.trim().toLowerCase();
    filteredData = filteredData.filter((v) => {
      return v.title.toLowerCase().includes(searchLower);
    });
  }

  const setNextFeature = ({
    forwards,
    e,
    featureActive = true,
  }: {
    forwards: boolean;
    e?: Event;
    featureActive?: boolean;
  }) => {
    const len = filteredData.length;
    if (len < 1) return;

    let filteredIndex = 0;
    if (filteredData.some((v) => v.index === activeIndex) && len > 1) {
      const findIndex = filteredData.findIndex((v) => v.index === activeIndex);
      if (forwards) filteredIndex = (findIndex + 1) % len;
      else filteredIndex = (findIndex - 1 + len) % len;
    }
    if (e) e.preventDefault(); // prevent scrolling down
    const { key, index } = filteredData[filteredIndex];
    updateHash(key);
    const el = document.querySelector(`.${buttonClass}[data-index="${index}"]`);
    if (featureActive) {
      if (el) el.focus(); // scroll ino view
    } else {
      if (el) el.scrollIntoView({ block: 'nearest' });
    }
  };

  return (
    <CanIUseContext.Provider
      value={{
        search,
        setSearch,
        statusCounts,
        loading,
        hasError,
        iOSLacking,
        updateHash,
        activeIndex,
        statuses: canIUseData?.statuses,
        filters,
        filteredData,
        setFilters,
        isDarkMode,
        setColorScheme,
        setNextFeature,
      }}
    >
      {children}
    </CanIUseContext.Provider>
  );
};

const useCanIUseContext = () => {
  const context = useContext(CanIUseContext);
  if (!context) {
    // Let's yell at ourselves to make sure we use our Provider wrapper
    throw new Error(
      "Oooops, I'm guessing your forgot to use the Provider for this context"
    );
  }
  return context;
};

export default useCanIUseContext;
