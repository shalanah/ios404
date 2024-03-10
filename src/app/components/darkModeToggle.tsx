import React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import useCanIUseContext from '../hooks/useCanIUseContext';

export const DarkModeToggle = () => {
  const { isDarkMode, setColorScheme } = useCanIUseContext();
  return (
    <button
      onClick={() => setColorScheme(isDarkMode ? 'light' : 'dark')}
      style={{ width: 22, height: 22 }}
    >
      {isDarkMode ? (
        <SunIcon style={{ width: 22, height: 22 }} />
      ) : (
        <MoonIcon style={{ width: 21, height: 21 }} />
      )}
    </button>
  );
};
