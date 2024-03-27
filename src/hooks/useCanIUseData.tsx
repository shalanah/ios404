import { useEffect, useState } from 'react';
import { CIU } from '../utils/canIUseTypes';
import { orderCanIUseData } from '../utils/parseCanIUseData';
import canIUseDataSaved from '../utils/canIUseData.json';

const dataLink =
  'https://raw.githubusercontent.com/Fyrd/caniuse/master/fulldata-json/data-2.0.json';

export const useCanIUseData = () => {
  const [loading, setLoading] = useState(true);
  const [canIUseData, setData] = useState<CIU | null>(null);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    fetch(dataLink)
      .then((res) => {
        return res.json();
      })
      .then((data: CIU) => {
        // throw new Error('Network response was not ok');
        setData(orderCanIUseData(data));
        setLoading(false); // could be useReducer instead
      })
      .catch((err) => {
        setHasError(true);
        setLoading(false);
        setData(orderCanIUseData(canIUseDataSaved as CIU));
        console.error(err);
      });
  }, []);
  return { loading, canIUseData, hasError, setHasError };
};
