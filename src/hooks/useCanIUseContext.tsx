// TODO: Really need to go back and do all types
import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import { useHash } from './useHash';
import { getIOSSafariLacking } from '../utils/parseCanIUseData';
import cloneDeep from 'lodash/cloneDeep';
import { useCanIUseData } from './useCanIUseData';
import { useFilters, type FiltersType } from './useFilters';
// import { parseMdnData } from '../utils/parseMdnData';

export type SpecTypes = keyof FiltersType['statuses'];

type StatusCounts = {
  [K in SpecTypes]: number;
};

interface CanIUseContextInterface {
  loading: boolean;
  hasError: boolean;
  iOSLacking: any;
  activeIndex: number;
  updateHash: (newHash: string) => void;
  statusCounts: StatusCounts;
  statuses: { [k: string]: string } | undefined;
  filters: FiltersType;
  setFilters: Dispatch<SetStateAction<FiltersType>>;
  filteredData: any;
  search: string;
  setSearch: (search: string) => void;
  setNextFeature: (args: {
    forwards: boolean;
    e?: Event;
    featureActive?: boolean;
  }) => void;
  canIUseDataUpdated: number | undefined;
  setHasError: (error: boolean) => void;
  filteredByBrowser: any;
}

// Game state... could probably be broken out into smaller files / hooks
export const CanIUseContext = createContext<CanIUseContextInterface | null>(
  null
);
export const buttonClass = 'feature-list-button';

// TODO: Separate out some of these providers?
export const CanIUseContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { canIUseData, loading, hasError, setHasError } = useCanIUseData();
  const iOSLacking = useMemo(
    () => getIOSSafariLacking(canIUseData),
    [canIUseData]
  );
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useFilters();
  const [hash, updateHash] = useHash();
  let activeIndex =
    iOSLacking.length > 0 ? iOSLacking.findIndex((v) => v.key === hash) : -1;
  if (activeIndex === -1 && iOSLacking.length > 0) activeIndex = 0;

  // If hash doesn't exist remove hash
  useEffect(() => {
    // Let's just remove if ever the hash is not found
    if (
      iOSLacking.length > 0 &&
      activeIndex !== -1 &&
      hash !== iOSLacking[activeIndex]?.key
    ) {
      updateHash('');
    }
  }, [updateHash, activeIndex, iOSLacking, hash]);

  const hasBrowsers = Object.values(filters.browsers).some((v) => v);
  const filteredByBrowser = iOSLacking.filter((v) => {
    return hasBrowsers
      ? Object.entries(filters.browsers)
          .filter(([_, on]) => on)
          .every(([k, on]) => {
            return on && v.browsers[k].moreThanIOSSafari;
          })
      : false;
  });
  // Add status filters
  let filteredData = cloneDeep(filteredByBrowser).filter((v) => {
    return filters.statuses[v.status as keyof FiltersType['statuses']];
  });
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
      if (el) (el as HTMLElement).focus(); // scroll ino view
    } else {
      if (el) el.scrollIntoView({ block: 'nearest' });
    }
  };

  const statusCounts: StatusCounts = filteredByBrowser.reduce((acc, v) => {
    acc[v.status] += 1;
    return acc;
  }, Object.fromEntries(Object.entries(canIUseData?.statuses || {}).map(([k, v]) => [k, 0])));

  // MDN DATA: TODO: Later
  // If Safari brings up that caniuse data isn't up-to-date...
  // Maybe they should work on that --- who do they really have to blame? That's part of their job, right? Right?
  // useEffect(() => {
  //   fetch('https://unpkg.com/@mdn/browser-compat-data')
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       parseMdnData(data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

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
        filteredByBrowser,
        setFilters,
        setNextFeature,
        canIUseDataUpdated: canIUseData?.updated,
        setHasError,
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
