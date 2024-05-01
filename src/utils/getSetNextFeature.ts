import { ActionType, HashType } from '@/hooks/useFeatureIndex';
import { MissingFeatureIndexType } from './missingFeature';
import { buttonClass } from './constants';

export const getSetNextFeature = ({
  filteredData,
  activeIndex,
  updateHash,
}: {
  filteredData: MissingFeatureIndexType[];
  activeIndex: number;
  updateHash: (newHash: HashType, action: ActionType) => void;
}) => {
  // useCallback?
  return ({
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
    const { id, index } = filteredData[filteredIndex];
    updateHash(id, action);
    const el = document.querySelector(`.${buttonClass}[data-index="${index}"]`);
    if (featureActive) {
      if (el) (el as HTMLElement).focus(); // scroll ino view
    } else {
      if (el) el.scrollIntoView({ block: 'nearest' });
    }
  };
};
