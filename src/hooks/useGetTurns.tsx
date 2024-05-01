import { useRef } from 'react';
import { MissingFeatureIndexType } from '../utils/missingFeature';
import { ActionType } from '@/hooks/useFeatureIndex';
import usePrevious from '@/hooks/usePrevious';

export const useGetTurns = ({
  filteredData,
  activeIndex,
  position: pos,
  verticalView,
  actionType,
}: {
  filteredData: MissingFeatureIndexType[];
  activeIndex: number;
  position: number;
  verticalView: boolean;
  actionType: ActionType;
}) => {
  const filteredLen = filteredData.length;
  const turns = useRef(0);
  const prevActiveIndex = usePrevious(activeIndex);
  const doNotRotate = verticalView && actionType === 'button'; // too distracting with drawer open
  if (activeIndex !== -1 && prevActiveIndex !== -1 && !doNotRotate) {
    const prevPos = filteredData.findIndex((v) => v.index === prevActiveIndex);
    if (prevPos < pos) {
      const looping = pos === filteredLen - 1 && prevPos === 0;
      turns.current += looping ? -1 : 1;
    } else if (pos < prevPos) {
      const looping = pos === 0 && prevPos === filteredLen - 1;
      turns.current += looping ? 1 : -1;
    }
  }

  return { doNotRotate, turns: turns?.current };
};
