import { useEffect, useState } from 'react';
import { parseMdnData } from '../utils/parseMdnData';
import bcd, { CompatData } from '@mdn/browser-compat-data';

const dataLink = 'https://unpkg.com/@mdn/browser-compat-data/data.json';

export const useMDNData = () => {
  const [loading, setLoading] = useState(false);
  const [mdnData, setData] = useState<any>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(dataLink)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        // throw new Error('Network response was not ok');
        setData(parseMdnData(data as CompatData));
        setLoading(false);
      })
      .catch((err) => {
        setHasError(true);
        setLoading(false);
        setData(bcd);
        console.error(err);
      });
  }, []);
  return { loading, mdnData, hasError, setHasError };
};
