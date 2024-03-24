import { useState, useEffect } from 'react';
import Bowser from 'bowser';

export const useIsFirefox = () => {
  const [isFirefox, setIsFirefox] = useState(false);
  useEffect(() => {
    const browser = Bowser.getParser(window?.navigator?.userAgent);
    setIsFirefox(browser.isBrowser('Firefox'));
  }, []);
  return isFirefox;
};
