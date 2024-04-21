import { useEffect } from 'react';
import useMainContext from './useMainContext';
import { buttonClass } from '@/utils/constants';

export const useScrollToActiveFeatureOnLoad = () => {
  const { activeIndex } = useMainContext();

  // On first load - bring active into view
  useEffect(() => {
    if (activeIndex !== -1) {
      const el = document.querySelector(`.${buttonClass}[data-active="true"]`);
      if (el && document.activeElement !== el) {
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
        (el as HTMLElement).focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex !== -1]);
};
