import { useEffect, useCallback, useState } from 'react';

export type ActionType = 'button' | 'load' | 'arrows' | 'keys' | 'swipe';
type HashType = string;

// Inspiration: https://www.30secondsofcode.org/react/s/use-hash/
export const useHash = () => {
  const [{ hash, actionType }, setHash] = useState<{
    hash: HashType;
    actionType: ActionType;
  }>(() => {
    return {
      hash: window?.location?.hash || '',
      actionType: 'load',
    };
  });

  const hashChangeHandler = useCallback(() => {
    setHash({ hash: window?.location?.hash || '', actionType: 'load' });
  }, []);
  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler);
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler);
    };
  }, [hashChangeHandler]);

  const updateHash = useCallback(
    (newHash: HashType, action: ActionType) => {
      if (newHash !== hash) {
        const urlWithoutHash = window.location.href.split('#')[0];
        window.history.replaceState(null, '', `${urlWithoutHash}#${newHash}`);
        setHash({ hash: `#${newHash}`, actionType: action });
      }
    },
    [hash]
  );

  return { hash: hash.slice(1), updateHash, actionType };
};
