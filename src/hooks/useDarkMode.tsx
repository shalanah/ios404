import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import usePrefersColorScheme from 'use-prefers-color-scheme';

interface DarkModeInterface {
  isDarkMode: boolean;
  setColorScheme: Dispatch<SetStateAction<'dark' | 'light' | 'no-preference'>>;
}

export const DarkMode = createContext<DarkModeInterface | null>(null);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const prefersColorScheme = usePrefersColorScheme();
  const [mode, setColorScheme] = useState(prefersColorScheme);
  const isDarkMode = mode !== 'light';
  useEffect(() => {
    setColorScheme(prefersColorScheme);
  }, [prefersColorScheme]);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  return (
    <DarkMode.Provider
      value={{
        isDarkMode,
        setColorScheme,
      }}
    >
      {children}
    </DarkMode.Provider>
  );
};

const useDarkMode = () => {
  const context = useContext(DarkMode);
  if (!context) {
    // Let's yell at ourselves to make sure we use our Provider wrapper
    throw new Error(
      "Oooops, I'm guessing your forgot to use the Provider for this context"
    );
  }
  return context;
};

export default useDarkMode;
