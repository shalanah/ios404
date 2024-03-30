import { useEffect } from 'react';
import useCanIUseContext, { buttonClass } from './useCanIUseContext';

export const useArrowKeysFeatureProgression = () => {
  const { setNextFeature } = useCanIUseContext();

  // Use arrow keys to loop through features
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const el = document.querySelectorAll(`.${buttonClass}`);
      const hasFocus = Array.from(el).some(
        (el) => el === document.activeElement
      );
      if (!hasFocus) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        // Prevent default scrolling behavior - we'll handle it in setNextFeature
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      // Make sure no other keys are pressed (like tab)....
      if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key))
        return;
      // alt keys

      // Not while we are in a modal
      if (document.querySelector('[role="dialog"]')) return;

      setNextFeature({
        e,
        forwards: ['ArrowDown', 'ArrowRight'].includes(e.key),
        action: 'keys',
      });
    };
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [setNextFeature]);
};
