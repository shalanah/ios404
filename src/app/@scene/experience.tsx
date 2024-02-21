// @ts-nocheck

'use client';

import { useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import { Mesh } from 'three';
import {
  OrbitControls,
  Html,
  Center,
  Stage,
  Backdrop,
} from '@react-three/drei';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Model } from '../../assets/Milkcartons2';

export default function Experience() {
  // const ref = useRef<Mesh>(null!);
  // useFrame((state, delta) => {
  //   ref.current.rotation.x = ref.current.rotation.y += delta;
  // });
  const controls = useControls({
    htmlPosition: {
      value: [0.01, 0, 0],
      label: 'HTML Position',
    },
  });

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls
        enableDamping
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.55}
      />
      <color attach="background" args={['skyblue']} />
      <Suspense fallback={null}>
        <Stage
          adjustCamera={1.5}
          shadows={{
            type: 'accumulative',
            color: 'skyblue',
          }}
          intensity={0.2}
          environment="city"
        >
          {/* <Center> */}
          <Model castShadow receiveShadow />
          {/* </Center> */}
        </Stage>
      </Suspense>
      <Html
        center
        wrapperClass="wrapper"
        distanceFactor={10}
        position={controls.htmlPosition}
      >
        Test
      </Html>
    </>
  );
}
