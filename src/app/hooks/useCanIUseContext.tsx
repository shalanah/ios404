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
}

const dataLink =
  'https://raw.githubusercontent.com/Fyrd/caniuse/master/fulldata-json/data-2.0.json';
const android_chrome = 'and_chr';
const ios_safari = 'ios_saf';

// Features that we don't actually care about - deprecated or not relevant to mobile/ipad
const skipFeatures = [
  'asmjs', // deprecated
  'css3-cursors', // cursors are not super relevant to mobile
  'css3-cursors-grab', // cursors are not super relevant to mobile
  'css3-cursors-newer', // cursors are not super relevant to mobile
  'do-not-track', // not adopted
  'filesystem', // might no longer be maintained but still supported in chrome
  'sql-storage', // deprecating maybe drop later?,
  'battery-status', // remove because due to fingerprinting - really they should just limit the api some
  'feature-policy', // deprecated
];

const getIOSSafariLacking = (canIUseData: any) => {
  if (!canIUseData) return [];
  const { statuses, data, agents } = canIUseData;
  const chromeVersion = agents[android_chrome].version_list.at(-1).version;
  const iosVersion = agents[ios_safari].version_list.at(-1).version;
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
      return {
        ...v,
        key: k,
        firstSeen,
        noBrowserFullSupport, // TODO: make a note that no browser full supports this feature
        safariStat: v.stats[ios_safari][iosVersion],
        chromeStat: v.stats[android_chrome][chromeVersion],
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

  console.log({ iOSLacking, canIUseData });

  // on mount... if hash doesn't exist remove hash
  // useEffect(() => {
  //   if (activeIndex !== -1 && prevActiveIndex === -1) {
  //     // scroll element into view
  //     const el = document.querySelector(
  //       `.${buttonClass}[data-index="${activeIndex}"]`
  //     );
  //     if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  //   }
  // }, [activeIndex, prevActiveIndex]);

  // console.log(activeIndex, hash);

  // console.log({ activeIndex, hash });
  // console.log(canIUseData);
  console.log(iOSLacking, canIUseData?.statuses);
  // console.log(canIUseData);

  // If Safari brings up that caniuse data isn't up-to-date...
  // Maybe they should work on that --- who do they really have to blame? That's part of their job, right? Right?
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

  return (
    <CanIUseContext.Provider
      value={{
        statusCounts,
        loading,
        hasError,
        iOSLacking,
        updateHash,
        activeIndex,
        statuses: canIUseData?.statuses,
        filters,
        filteredData: iOSLacking.filter((v) => filters.statuses[v.status]),
        setFilters,
        isDarkMode,
        setColorScheme,
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
