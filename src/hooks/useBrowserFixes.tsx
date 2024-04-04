import { useState, useEffect } from 'react';
import Bowser from 'bowser';
import { is } from '@react-three/fiber/dist/declarations/src/core/utils';

export const useBrowserFixes = () => {
  const [browserData, setBrowserData] = useState({
    isFirefox: false,
    isIPhone: false,
  });
  useEffect(() => {
    const browser = Bowser.getParser(window?.navigator?.userAgent);
    const platform = browser.getPlatform() || '';
    const vendor = platform.vendor || '';
    const device = platform.type || '';

    const isIPhone = vendor === 'Apple' && device === 'mobile';
    setBrowserData({
      isFirefox: browser.isBrowser('Firefox'),
      isIPhone,
    });
  }, []);
  return browserData;
};
