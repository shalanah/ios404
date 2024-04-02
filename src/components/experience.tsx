import { Ref, Suspense, useEffect, useRef } from 'react';
import { Model } from './milkcarton';
import { MilkCartonText } from './milkcartontext';
import useCanIUseContext from '../hooks/useCanIUseContext';
import usePrevious from '../hooks/usePrevious';
import { a, useSpring } from '@react-spring/three';
import { useGesture } from '@use-gesture/react';
import { VerticalCenterWithMargin } from './verticalCenterWithMargin';

const getTextRotationAndPosition = (turns: number) => {
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
    iOSMissingFeatures,
    setNextFeature,
    filteredData,
    doNotRotate,
    position: pos,
  } = useCanIUseContext();
  const len = iOSMissingFeatures.length;
  const filteredLen = filteredData.length;
  const turns = useRef(0);
  const prevActiveIndex = usePrevious(activeIndex);

  if (activeIndex !== -1 && prevActiveIndex !== -1 && !doNotRotate) {
    const prevPos = filteredData.findIndex((v) => v.index === prevActiveIndex);
    if (prevPos < pos) {
      const looping = pos === filteredLen - 1 && prevPos === 0;
      turns.current += looping ? -1 : 1;
    } else if (pos < prevPos) {
      const looping = pos === 0 && prevPos === filteredLen - 1;
      turns.current += looping ? 1 : -1;
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rot = [0, (turns.current * -Math.PI) / 2, 0];
  const [spring, api] = useSpring(() => ({
    rotation: rot,
    config,
  }));

  useEffect(() => {
    api.start({
      rotation: rot,
      config,
    });
  }, [api, rot]);

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx], last }) => {
        const value = Math.min(Math.abs(mx), 44.5); // clamping...
        const sign = Math.sign(mx);
        if (last) {
          if (value > 35 && filteredData.length > 1) {
            setNextFeature({ forwards: sign === -1, action: 'swipe' });
            return;
          } else {
            api.start({
              rotation: [0, (turns.current * -Math.PI) / 2, 0],
              config,
            });
            return;
          }
        }
        api.start({
          rotation: [
            rot[0],
            rot[1] + (Math.PI / (360 * 2)) * value * sign,
            rot[2],
          ],
          config,
        });
      },
    },
    {
      drag: {
        axis: 'x',
        filterTaps: true,
      },
    }
  );

  if (len === 0 || activeIndex === -1) return null;

  return (
    <>
      {/* <Perf position="top-right" /> */}
      <Suspense fallback={null}>
        <VerticalCenterWithMargin>
          <a.group {...(spring as any)} {...bind()}>
            <Model />
            <MilkCartonText
              index={activeIndex}
              {...getTextRotationAndPosition(turns?.current)}
              bind={bind}
            />
          </a.group>
        </VerticalCenterWithMargin>
      </Suspense>
    </>
  );
}
