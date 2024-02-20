'use client';

import { Canvas } from '@react-three/fiber';
import Experience from './experience';

export default function Scene() {
  return (
    <Canvas>
      <Experience />
    </Canvas>
  );
}
