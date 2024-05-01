import { MissingFeatureIndexType } from '@/utils/missingFeature';
import { useEffect, useCallback, useState } from 'react';

export type ActionType = 'button' | 'load' | 'arrows' | 'keys' | 'swipe';
export type HashType = string;

// Inspiration: https://www.30secondsofcode.org/react/s/use-hash/
export const useFeatureIndex = ({
  missingFeatures,
}: {
  missingFeatures: MissingFeatureIndexType[];
}) => {
  const [{ hash, actionType }, setHash] = useState<{
    hash: HashType;
    actionType: ActionType;
  }>(() => {
    return {
      hash: window?.location?.hash || '',
      actionType: 'load',
    };
  });
  const parsedHash = hash.slice(1);

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

  let activeIndex =
    missingFeatures.length > 0
      ? missingFeatures.findIndex((v) => v.id === parsedHash)
      : -1;
  if (activeIndex === -1 && missingFeatures.length > 0) activeIndex = 0; // maybe first filtered feature instead?

  // If hash doesn't exist remove hash
  useEffect(() => {
    // Let's just remove if ever the hash is not found
    if (
      missingFeatures.length > 0 &&
      activeIndex !== -1 &&
      parsedHash !== missingFeatures[activeIndex]?.id
    ) {
      updateHash('', 'load');
    }
  }, [updateHash, activeIndex, missingFeatures, parsedHash]);

  return { updateHash, actionType, activeIndex };
};
