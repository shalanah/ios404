import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';
import { useFeatureIndex } from './useFeatureIndex';
import { useCanIUseData } from './useCanIUseData';
import { useFilters } from './useFilters';
import { getFilteredData } from '@/utils/filterData';
import { getSetNextFeature } from '@/utils/getSetNextFeature';
import { useGetTurns } from '@/hooks/useGetTurns';
import { useMDNData } from './useMDNData';

// TODO: Continue type checking + CLEANUP (more sharing of types)
// TODO: Break apart into smaller hooks? Use state management like RTK? Context... is getting big
// TODO: Add a CSV download of data?
type MainContextValue = ReturnType<typeof useMainProviderValue>;
export const MainContext = createContext<MainContextValue | null>(null);

const useMainProviderValue = ({
  verticalView = false,
}: {
  verticalView?: boolean;
}) => {
  const [search, setSearch] = useState('');
  const [cartonInteractionMode, setCartonInteractionMode] = useState<
    'grab' | 'text'
  >('grab');
  const [filters, setFilters] = useFilters();
  const [paginationHeight, setPaginationHeight] = useState<number | null>(null);

  // TODO: Handle more elegantly... promise all kind a thing
  const {
    canIUseData,
    loading: ciuLoading,
    hasError: ciuHasError,
    setHasError: setCiuHasError,
    statuses, // TODO: Move outside of this hook
    canIUseDataUpdated,
  } = useCanIUseData();
  // TODO: In-progress MDN data
  const {
    mdnData,
    loading: mdnLoading,
    hasError: mdnHasError,
    setHasError: setMdnHasError,
  } = useMDNData();

  const missingFeatures = useMemo(() => {
    if (!canIUseData || !mdnData) return [];
    return [...canIUseData, ...mdnData]
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((v, i) => {
        return { ...v, index: i };
      });
  }, [canIUseData, mdnData]);

  const { updateHash, actionType, activeIndex } = useFeatureIndex({
    missingFeatures,
  });

  const { filteredData, filteredBeforeSpecs, position, activeInFilteredData } =
    getFilteredData({
      filters,
      missingFeatures,
      search,
      activeIndex,
    });

  // Don't rotate when we are in vertical view and the drawer is open --- way too distracting with the animation being half covered
  const { doNotRotate, turns } = useGetTurns({
    filteredData,
    activeIndex,
    position,
    verticalView,
    actionType,
  });

  const setNextFeature = getSetNextFeature({
    filteredData,
    activeIndex,
    updateHash,
  });

  return {
    paginationHeight,
    setPaginationHeight,
    search,
    setSearch,
    loading: ciuLoading || mdnLoading,
    hasError: ciuHasError || mdnHasError,
    missingFeatures,
    updateHash,
    activeIndex,
    statuses,
    filters,
    filteredData, // browsers and specs applied
    filteredBeforeSpecs, // specs not applied
    setFilters,
    setNextFeature,
    canIUseDataUpdated,
    setHasError: (v: any) => {
      setCiuHasError(v);
      setMdnHasError(v);
    },
    activeInFilteredData,
    position,
    actionType,
    doNotRotate,
    verticalView,
    turns,
    isTouchDevice: 'ontouchstart' in window,
    cartonInteractionMode,
    setCartonInteractionMode,
  };
};

export const MainProvider = ({
  verticalView = false,
  children,
}: {
  verticalView?: boolean;
  children: ReactNode;
}) => {
  const value = useMainProviderValue({ verticalView });
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    // Let's yell at ourselves to make sure we use our Provider wrapper
    console.log(context);
    throw new Error(
      "Oooops, I'm guessing your forgot to use the Provider for this context"
    );
  }
  return context;
};

export default useMainContext;
