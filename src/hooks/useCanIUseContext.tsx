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
import { ActionType, useHash } from './useHash';
import {
  getIOSMissingFeatures,
  IOSMissingFeaturesType,
} from '../utils/parseCanIUseData';
import cloneDeep from 'lodash/cloneDeep';
import { useCanIUseData } from './useCanIUseData';
import { useFilters, type FiltersType } from './useFilters';
// import { parseMdnData } from '../utils/parseMdnData';

// TODO: Continue type checking + CLEANUP (more sharing of types)
interface CanIUseContextInterface {
  loading: boolean;
  hasError: boolean;
  activeIndex: number;
  updateHash: (newHash: string, action: ActionType) => void;
  statuses: { [k: string]: string } | undefined;
  filters: FiltersType;
  setFilters: Dispatch<SetStateAction<FiltersType>>;
  search: string;
  setSearch: (search: string) => void;
  setNextFeature: (args: {
    forwards: boolean;
    e?: Event;
    featureActive?: boolean;
    action: ActionType;
  }) => void;
  canIUseDataUpdated: number | undefined;
  setHasError: (error: boolean) => void;
  iOSMissingFeatures: IOSMissingFeaturesType;
  filteredData: IOSMissingFeaturesType;
  filteredByBrowserOnly: IOSMissingFeaturesType;
  activeInFilteredData: boolean;
  position: number;
  actionType: ActionType;
  doNotRotate: boolean;
  paginationHeight: number | null;
  setPaginationHeight: Dispatch<SetStateAction<number | null>>;
  verticalView: boolean;
}

// Game state... could probably be broken out into smaller files / hooks
export const CanIUseContext = createContext<CanIUseContextInterface | null>(
  null
);
export const buttonClass = 'feature-list-button';

// TODO: Separate out some of these providers?
export const CanIUseContextProvider = ({
  verticalView = false,
  children,
}: {
  verticalView?: boolean;
  children: ReactNode;
}) => {
  const { canIUseData, loading, hasError, setHasError } = useCanIUseData();
  const iOSMissingFeatures = useMemo(
    () => getIOSMissingFeatures(canIUseData),
    [canIUseData]
  );
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useFilters();
  const { hash, updateHash, actionType } = useHash();

  let activeIndex =
    iOSMissingFeatures.length > 0
      ? iOSMissingFeatures.findIndex((v) => v.key === hash)
      : -1;
  if (activeIndex === -1 && iOSMissingFeatures.length > 0) activeIndex = 0;

  // If hash doesn't exist remove hash
  useEffect(() => {
    // Let's just remove if ever the hash is not found
    if (
      iOSMissingFeatures.length > 0 &&
      activeIndex !== -1 &&
      hash !== iOSMissingFeatures[activeIndex]?.key
    ) {
      updateHash('', 'load');
    }
  }, [updateHash, activeIndex, iOSMissingFeatures, hash]);

  const hasBrowsers = Object.values(filters.browsers).some((v) => v);
  const filteredByBrowserOnly = iOSMissingFeatures.filter((v) => {
    return hasBrowsers
      ? Object.entries(filters.browsers)
          .filter(([_, on]) => on)
          .every(([k, on]) => {
            return on && v.browsers[k].moreThanIOSSafari;
          })
      : false;
  });
  // Add status filters
  let filteredData = cloneDeep(filteredByBrowserOnly).filter((v) => {
    return filters.statuses[v.status as keyof FiltersType['statuses']];
  });
  if (search.trim().length > 0) {
    const searchLower = search.trim().toLowerCase();
    filteredData = filteredData.filter((v) => {
      return v.title.toLowerCase().includes(searchLower);
    });
  }

  // useCallback?
  const setNextFeature = ({
    forwards,
    e,
    featureActive = true,
    action,
  }: {
    forwards: boolean;
    e?: Event;
    featureActive?: boolean;
    action: ActionType;
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
    updateHash(key, action);
    const el = document.querySelector(`.${buttonClass}[data-index="${index}"]`);
    if (featureActive) {
      if (el) (el as HTMLElement).focus(); // scroll ino view
    } else {
      if (el) el.scrollIntoView({ block: 'nearest' });
    }
  };

  const [paginationHeight, setPaginationHeight] = useState<number | null>(null);

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

  const pos = filteredData.findIndex((v) => v.index === activeIndex); // actual position in list --- active index + prev active is out of the WHOLE non-filtered list

  return (
    <CanIUseContext.Provider
      value={{
        paginationHeight,
        setPaginationHeight,
        search,
        setSearch,
        loading,
        hasError,
        iOSMissingFeatures,
        updateHash,
        activeIndex,
        statuses: canIUseData?.statuses,
        filters,
        filteredData, // browsers and specs applied
        filteredByBrowserOnly, // specs not applied
        setFilters,
        setNextFeature,
        canIUseDataUpdated: canIUseData?.updated,
        setHasError,
        activeInFilteredData: filteredData && pos !== -1,
        position: pos,
        actionType,
        doNotRotate: verticalView && actionType === 'button', // too distracting with drawer open
        verticalView,
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
