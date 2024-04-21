import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { clamp } from '../utils/math';
import { scaleOpts } from '../utils/constants';

interface ZoomContextInterface {
  scale: number;
  increaseScale: () => void;
  decreaseScale: () => void;
}

export const ZoomContext = createContext<ZoomContextInterface | null>(null);
export const ZoomContextProvider = ({ children }: { children: ReactNode }) => {
  const [scale, setScale] = useState(() => {
    return clamp(
      Number(localStorage.getItem('scale') || 1),
      scaleOpts.min,
      scaleOpts.max
    ); // TODO: maybe also round via steps if they change in the future
  });
  const increaseScale = useCallback(
    () => setScale((s) => Math.min(s + scaleOpts.step, scaleOpts.max)),
    []
  );
  const decreaseScale = useCallback(
    () => setScale((s) => Math.max(s - scaleOpts.step, scaleOpts.min)),
    []
  );

  useEffect(() => {
    localStorage.setItem('scale', String(scale)); // remember user's preference for scale
  }, [scale]);

  return (
    <ZoomContext.Provider
      value={{
        scale,
        increaseScale,
        decreaseScale,
      }}
    >
      {children}
    </ZoomContext.Provider>
  );
};

const useZoomContext = () => {
  const context = useContext(ZoomContext);
  if (!context) {
    // Let's yell at ourselves to make sure we use our Provider wrapper
    throw new Error(
      "Oooops, I'm guessing your forgot to use the Provider for this context"
    );
  }
  return context;
};

export default useZoomContext;
