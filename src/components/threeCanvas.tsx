import { Canvas } from '@react-three/fiber';
import Experience from '../components/experience';
import { useEffect, useRef, useState } from 'react';
import { useBrowserFixes } from '../hooks/useBrowserFixes';
import { startCameraPosArray } from '../components/verticalCenterWithMargin';
import useCanIUseContext from '../hooks/useCanIUseContext';

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
  const { verticalView } = useCanIUseContext();
  const { isIPhone } = useBrowserFixes();

  const ref = useRef<HTMLCanvasElement>(null);
  const [iosSafarKey, setIosSafariKey] = useState(0);
  useEffect(() => {
    if (isIPhone) {
      const canvas = ref.current;

      // On Visibility Change
      // - iOS bug not doing onPointerUp when swiping tabs - puts gesture in a bad state
      const visibilityChange = () => {
        if (document.visibilityState === 'visible') {
          setIosSafariKey((prev) => prev + 1);
        }
      };

      // On Pointer Cancel
      // - iOS bug still firing onPointerCancel even with `pointer.touch: true`
      const onPointerCancel = () => {
        setIosSafariKey((prev) => prev + 1);
      };
      document.addEventListener('visibilitychange', visibilityChange);
      canvas?.addEventListener('pointercancel', onPointerCancel);
      return () => {
        document.removeEventListener('visibilitychange', visibilityChange);
        canvas?.removeEventListener('pointercancel', onPointerCancel);
      };
    }
  }, [isIPhone, iosSafarKey]);

  return (
    <Canvas flat camera={verticalView ? cameraMobile : camera} ref={ref}>
      <Experience key={iosSafarKey} />
    </Canvas>
  );
};
