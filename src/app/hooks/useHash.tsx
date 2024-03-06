import { useEffect, useCallback, useState, use } from 'react';

// Source: https://www.30secondsofcode.org/react/s/use-hash/
export const useHash = () => {
  const [hash, setHash] = useState(() => window.location.hash);

  const hashChangeHandler = useCallback(() => {
    setHash(window.location.hash);
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler);
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler);
    };
  }, [hashChangeHandler]);

  const updateHash = useCallback(
    (newHash: string) => {
      if (newHash !== hash) window.location.hash = newHash;
    },
    [hash]
  );

  return [hash.slice(1), updateHash];
};
