// @ts-nocheck

'use client';

import { Suspense } from 'react';
import { Stage, PresentationControls } from '@react-three/drei';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Model } from './milkcarton';
import { Text } from './text';

const bg = '#bad1df';

export default function Experience() {
  const controls = useControls({
    htmlPosition: {
      value: [0.1, 58, 51],
      label: 'HTML Position',
    },
  });

  return (
    <>
      <Perf position="top-left" />
      <axesHelper args={[200]} renderOrder={10} />
      <color attach="background" args={[bg]} />
      <Suspense fallback={null}>
        <Stage adjustCamera={1} shadows={'none'}>
          <PresentationControls
            enabled
            global={false}
            cursor={true}
            snap={false}
            zoom={1}
            rotation={[0, 0, 0]}
            polar={[0, 0]}
            azimuth={[-Infinity, Infinity]}
            config={{ mass: 0.025, tension: 150, friction: 26 }} // Spring config
          >
            <Model />
            <Text controls={controls} />
          </PresentationControls>
        </Stage>
      </Suspense>
    </>
  );
}
