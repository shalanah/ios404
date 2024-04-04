import { Suspense } from 'react';
import { Model } from './milkcarton';
import { MilkCartonText } from './milkcartontext';
import useCanIUseContext from '../hooks/useCanIUseContext';
import { a, useSpring } from '@react-spring/three';
import { Handler, useGesture } from '@use-gesture/react';
import { VerticalCenterWithMargin } from './verticalCenterWithMargin';
import { useBrowserFixes } from '@/hooks/useBrowserFixes';
import { Plane } from '@react-three/drei';

const getTextRotationAndPosition = (
  turns: number
): {
  position: [number, number, number];
  rotation: [number, number, number];
} => {
  let mod = turns % 4;
  if (mod < 0) mod += 4;
  switch (mod) {
    case 0:
      return {
        position: [0.1, 58, 51],
        rotation: [0, 0, 0],
      };
    case 1:
      return {
        position: [51, 58, 0.1],
        rotation: [0, Math.PI / 2, 0],
      };

    case 2:
      return {
        position: [0.1, 58, -51],
        rotation: [0, Math.PI, 0],
      };
    default:
    case 3:
      return {
        position: [-51, 58, 0.1],
        rotation: [0, (Math.PI * 3) / 2, 0],
      };
  }
};

const config = { mass: 0.05, tension: 600, friction: 40 };
export default function Experience() {
  const {
    activeIndex,
    setNextFeature,
    filteredData,
    turns,
    iOSMissingFeatures,
  } = useCanIUseContext();
  const { isIPhone } = useBrowserFixes();
  const rot = [0, (turns * -Math.PI) / 2, 0];
  const len = iOSMissingFeatures.length;

  const [spring, api] = useSpring(
    () => ({
      rotation: rot,
      config,
    }),
    [rot]
  );

  const dragOpts = {
    axis: 'x',
    filterTaps: true,
  } as const;

  const onDrag: Handler<
    'drag',
    PointerEvent | MouseEvent | TouchEvent | KeyboardEvent
  > = ({ movement: [mx], last }) => {
    const value = Math.min(Math.abs(mx), 44.5); // clamping...
    const sign = Math.sign(mx);
    if (last) {
      if (value > 35 && filteredData.length > 1) {
        setNextFeature({ forwards: sign === -1, action: 'swipe' });
        return;
      } else {
        api.start({
          rotation: [0, (turns * -Math.PI) / 2, 0],
          config,
        });
        return;
      }
    }
    api.start({
      rotation: [rot[0], rot[1] + (Math.PI / (360 * 2)) * value * sign, rot[2]],
      config,
    });
  };

  // Backup for desktop
  const bind = useGesture(
    { onDrag },
    { drag: dragOpts, pointer: { touch: true } }
  );

  if (len === 0 || activeIndex === -1) return null;

  return (
    <>
      {/* <Perf position="top-right" /> */}
      <Suspense fallback={null}>
        <VerticalCenterWithMargin>
          <a.group {...(spring as any)}>
            <Model />
            <MilkCartonText
              index={activeIndex}
              {...getTextRotationAndPosition(turns)}
              bind={isIPhone ? undefined : bind} // needed for desktop mainly - breaks on iPhones
            />
          </a.group>
          {/* @ts-ignore */}
          <Plane args={[300, 300]} position={[0, 0, 100]} {...bind()}>
            <meshBasicMaterial
              attach="material"
              color="white"
              opacity={0}
              transparent
            />
          </Plane>
        </VerticalCenterWithMargin>
      </Suspense>
    </>
  );
}
