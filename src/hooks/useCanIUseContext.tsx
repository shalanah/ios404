// @ts-nocheck
import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { useHash } from './useHash';
import {
  getIOSSafariLacking,
  orderCanIUseData,
} from '../utils/parseCanIUseData';
import canIUseDataSaved from '../utils/canIUseData.json';

const dataLink =
  'https://raw.githubusercontent.com/Fyrd/caniuse/master/fulldata-json/data-2.0.json';

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
  filteredData: any;
  search: string;
  setSearch: (search: string) => void;
  setNextFeature: (args: {
    forwards: boolean;
    e?: Event;
    featureActive?: boolean;
  }) => void;
  canIUseData: any;
  setHasError: (error: boolean) => void;
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
  const [loading, setLoading] = useState(true);
  const [canIUseData, setData] = useState(false);
  const [hasError, setHasError] = useState(false);
  const iOSLacking = useMemo(
    () => getIOSSafariLacking(canIUseData),
    [canIUseData]
  );
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

  const [hash, updateHash] = useHash();
  let activeIndex =
    iOSLacking.length > 0 ? iOSLacking.findIndex((v) => v.key === hash) : -1;
  if (activeIndex === -1 && iOSLacking.length > 0) activeIndex = 0;

  // on mount... if hash doesn't exist remove hash
  useEffect(() => {
    if (activeIndex === -1 && iOSLacking.length > 0 && hash) updateHash('');
  }, [updateHash, activeIndex, iOSLacking.length, hash]);

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

  useEffect(() => {
    fetch(dataLink)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // throw new Error('Network response was not ok');
        setData(orderCanIUseData(data));
        setLoading(false); // could be useReducer instead
      })
      .catch((err) => {
        setHasError(true);
        setLoading(false);
        setData(orderCanIUseData(canIUseDataSaved));
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
        setNextFeature,
        canIUseData,
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
