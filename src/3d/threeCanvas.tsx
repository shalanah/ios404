import { Canvas } from '@react-three/fiber';
import Experience from './experience';
import { useEffect, useRef, useState } from 'react';
import { useBrowserFixes } from '../hooks/useBrowserFixes';
import { startCameraPosArray } from './verticalCenterWithMargin';
import useMainContext from '../hooks/useMainContext';

const camera = {
  position: startCameraPosArray,
  fov: 56,
  near: 120,
  far: 450,
} as const;

const cameraMobile = {
  ...camera,
  fov: 60,
};

export const ThreeCanvas = () => {
  const { verticalView, cartonInteractionMode } = useMainContext();
  const { isIPhone } = useBrowserFixes();

  // On Visibility Change
  // - iOS bug not doing onPointerUp when swiping tabs/urls - puts gesture in a bad state
  const ref = useRef<HTMLCanvasElement>(null);
  const [iosSafarKey, setIosSafariKey] = useState(0);
  useEffect(() => {
    if (isIPhone) {
      const visibilityChange = () => {
        if (document.visibilityState === 'visible') {
          setIosSafariKey((prev) => prev + 1);
        }
      };
      document.addEventListener('visibilitychange', visibilityChange);
      return () => {
        document.removeEventListener('visibilitychange', visibilityChange);
      };
    }
  }, [isIPhone]);

  return (
    <Canvas
      flat
      camera={verticalView ? cameraMobile : camera}
      ref={ref}
      style={{ cursor: cartonInteractionMode === 'grab' ? 'grab' : 'auto' }}
    >
      <Experience key={iosSafarKey} />
    </Canvas>
  );
};
