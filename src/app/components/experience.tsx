// @ts-nocheck

'use client';

import { Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import { Center } from '@react-three/drei';
import AnimateRotation from './animateRotation';
// import { Perf } from 'r3f-perf';
import { Model } from './milkcarton';
import { Text } from './text';
import useCanIUseContext from '../hooks/useCanIUseContext';
import usePrevious from '../hooks/usePrevious';

export default function Experience() {
  const { activeIndex, iOSLacking } = useCanIUseContext();
  const len = iOSLacking.length;
  const quarterTurns = useRef(0);
  const prevActiveIndex = usePrevious(activeIndex);

  if (prevActiveIndex < activeIndex) {
    if (activeIndex === len - 1 && prevActiveIndex === 0) {
      quarterTurns.current -= 1;
    } else {
      quarterTurns.current += 1;
    }
  } else if (prevActiveIndex > activeIndex) {
    if (activeIndex === 0 && prevActiveIndex === len - 1) {
      quarterTurns.current += 1;
    } else {
      quarterTurns.current -= 1;
    }
  }

  let mod = quarterTurns.current % 4;
  if (mod < 0) mod += 4;

  let controls = {
    htmlPosition: [0.1, 58, 51],
  };
  let rotation = [0, 0, 0];
  switch (mod) {
    case 0:
      controls = {
        htmlPosition: [0.1, 58, 51],
      };
      rotation = [0, 0, 0];
      break;
    case 1:
      controls = {
        htmlPosition: [51, 58, 0.1],
      };
      rotation = [0, Math.PI / 2, 0];
      break;
    case 2:
      controls = {
        htmlPosition: [0.1, 58, -51],
      };
      rotation = [0, Math.PI, 0];
      break;
    case 3:
      controls = {
        htmlPosition: [-51, 58, 0.1],
      };
      rotation = [0, (Math.PI * 3) / 2, 0];
      break;
  }

  if (len === 0 || activeIndex === -1) return null;

  return (
    <>
      {/* <Perf position="top-left" /> */}
      <Suspense fallback={null}>
        <Center disableZ disableX>
          <AnimateRotation
            rotation={[
              0,
              (quarterTurns.current * -Math.PI) / 2 - Math.PI / 10,
              0,
            ]}
            config={{ mass: 0.05, tension: 600, friction: 40 }} // Spring config
          >
            {/* <axesHelper args={[100]} renderOrder={5} /> */}
            <Model />
            <Text rotation={rotation} index={activeIndex} controls={controls} />
          </AnimateRotation>
        </Center>
      </Suspense>
    </>
  );
}
