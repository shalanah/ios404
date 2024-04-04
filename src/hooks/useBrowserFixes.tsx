import { useState, useEffect } from 'react';
import Bowser from 'bowser';
import { is } from '@react-three/fiber/dist/declarations/src/core/utils';

export const useBrowserFixes = () => {
  const [browserData, setBrowserData] = useState({
    isFirefox: false,
    isIPadOrIPhone: false,
  });
  useEffect(() => {
    const browser = Bowser.getParser(window?.navigator?.userAgent);
    const platform = browser.getPlatform() || '';
    const vendor = platform.vendor || '';
    const device = platform.type || '';
    const isIpad =
      device !== 'mobile' && vendor === 'Apple' && 'ontouchend' in document;
    const isIPadOrIPhone =
      (vendor === 'Apple' && ['mobile', 'tablet'].includes(device)) || isIpad;
    setBrowserData({
      isFirefox: browser.isBrowser('Firefox'),
      isIPadOrIPhone,
    });
  }, []);
  return browserData;
};
