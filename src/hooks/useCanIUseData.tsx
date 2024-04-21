import { useEffect, useState } from 'react';
import { CIU } from '../utils/canIUseTypes';
import canIUseDataSaved from '../utils/canIUseData.json';
import { parseCanIUseData } from '@/utils/parseCanIUseData';
import { MissingFeatureType } from '@/utils/missingFeature';

const dataLink =
  'https://raw.githubusercontent.com/Fyrd/caniuse/master/fulldata-json/data-2.0.json';

export const useCanIUseData = () => {
  const [loading, setLoading] = useState(true);
  const [canIUseData, setData] = useState<MissingFeatureType[] | null>(null);
  const [{ statuses, canIUseDataUpdated }, setAuxData] = useState({
    statuses: {},
    canIUseDataUpdated: 0,
  });
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    fetch(dataLink)
      .then((res) => {
        return res.json();
      })
      .then((data: CIU) => {
        // throw new Error('Network response was not ok');
        setData(parseCanIUseData(data));
        setAuxData({
          statuses: data.statuses,
          canIUseDataUpdated: data.updated,
        });
        setLoading(false); // could be useReducer instead
      })
      .catch((err) => {
        setHasError(true);
        setLoading(false);
        setData(parseCanIUseData(canIUseDataSaved as CIU));
        setAuxData({
          statuses: canIUseDataSaved?.statuses!, // TODO: double check
          canIUseDataUpdated: (canIUseDataSaved as CIU).updated,
        });
        console.error(err);
      });
  }, []);
  return {
    loading,
    canIUseData,
    hasError,
    setHasError,
    statuses,
    canIUseDataUpdated,
  };
};
