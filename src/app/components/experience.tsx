// @ts-nocheck

'use client';

import { Suspense, useRef } from 'react';
import { Center } from '@react-three/drei';
import PresentationControls from './PresentationControlsAltered';
import { Perf } from 'r3f-perf';
import { Model } from './milkcarton';
import { Text } from './text';
import useCanIUseContext from '../hooks/useCanIUseContext';
import usePrevious from '../hooks/usePrevious';

const bg = '#bad1df';

export default function Experience() {
  const { activeFeature, iOSLacking } = useCanIUseContext();
  const len = iOSLacking.length;
  const rotation = useRef(0);
  const prevActiveFeature = usePrevious(activeFeature);

  if (prevActiveFeature < activeFeature) {
    if (activeFeature === len - 1 && prevActiveFeature === 0) {
      rotation.current -= 1;
    } else {
      rotation.current += 1;
    }
  } else if (prevActiveFeature > activeFeature) {
    if (activeFeature === 0 && prevActiveFeature === len - 1) {
      rotation.current += 1;
    } else {
      rotation.current -= 1;
    }
  }

  let mod = rotation.current % 4;
  if (mod < 0) mod += 4;

  return (
    <>
      {/* <Perf position="top-left" /> */}
      <color attach="background" args={[bg]} />
      <Suspense fallback={null}>
        {/* <Stage adjustCamera={0.85} shadows={'none'}> */}
        <Center>
          <PresentationControls
            rotation={[
              0,
              (rotation.current * -Math.PI) / 2 - Math.PI / 10 + Math.PI / 2,
              0,
            ]}
            config={{ mass: 0.05, tension: 600, friction: 40 }} // Spring config
          >
            <axesHelper args={[100]} renderOrder={5} />
            <Model />
            {mod === 1 && (
              <Text
                rotation={[0, 0, 0]}
                index={activeFeature}
                controls={{
                  htmlPosition: [0.1, 58, 51],
                }}
              />
            )}
            {mod === 3 && (
              <Text
                index={activeFeature}
                rotation={[0, Math.PI, 0]}
                controls={{
                  htmlPosition: [0.1, 58, -51],
                }}
              />
            )}
            {mod === 2 && (
              <Text
                index={activeFeature}
                rotation={[0, Math.PI / 2, 0]}
                controls={{
                  htmlPosition: [51, 58, 0.1],
                }}
              />
            )}
            {mod === 0 && (
              <Text
                index={activeFeature}
                rotation={[0, (Math.PI * 3) / 2, 0]}
                controls={{
                  htmlPosition: [-51, 58, 0.1],
                }}
              />
            )}
          </PresentationControls>
        </Center>
        {/* </Stage> */}
      </Suspense>
    </>
  );
}
