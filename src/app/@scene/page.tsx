'use client';

import { Canvas } from '@react-three/fiber';
import Experience from './experience';

export default function Scene() {
  return (
    <Canvas
      shadows
      camera={{
        position: [-100, 125, 200],
        fov: 60,
        near: 0.1,
        far: 10000,
      }}
    >
      <Experience />
    </Canvas>
  );
}
