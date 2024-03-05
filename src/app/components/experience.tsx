// @ts-nocheck

'use client';

import { Suspense } from 'react';
import { Stage, PresentationControls, Center, Html } from '@react-three/drei';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Model } from './milkcarton';
import { Text } from './text';
import useCanIUseContext from '../hooks/useCanIUseContext';

const bg = '#bad1df';

export default function Experience() {
  const { activeFeature } = useCanIUseContext();
  return (
    <>
      {/* <Perf position="top-left" /> */}

      <color attach="background" args={[bg]} />
      <Suspense fallback={null}>
        <Stage adjustCamera={0.85} shadows={'none'}>
          <PresentationControls
            enabled
            global={false}
            cursor={false}
            snap={false}
            rotation={[0, 0, 0]}
            polar={[0, 0]}
            azimuth={[-Infinity, Infinity]}
            config={{ mass: 0.025, tension: 150, friction: 26 }} // Spring config
          >
            <axesHelper args={[100]} renderOrder={5} />
            <Model />
            <Text
              index={activeFeature}
              controls={{
                htmlPosition: [0.1, 58, 51],
              }}
            />
          </PresentationControls>
        </Stage>
      </Suspense>
    </>
  );
}
