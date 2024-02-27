'use client';

import { Canvas } from '@react-three/fiber';
import styles from './page.module.css';
import Experience from './components/experience';
import Features from './components/features';

const bg = '#bad1df';

export default function Home() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100dvh',
          background: bg,
        }}
      >
        <div
          style={{
            zIndex: 1,
            padding: '1rem 1.5rem',
            textAlign: 'left',
            position: 'absolute',
            overflowY: 'auto',
            overflowX: 'hidden',
            left: '23vw',
            width: '24vw',
            top: '10dvh',
            // background: 'green',
            height: '90dvh',
          }}
        >
          <Features />
        </div>
        <Canvas
          flat // already did tone mapping in our baked asset
          style={{ marginLeft: '12vw' }}
          camera={{
            position: [-77, -40.2, 242],
            fov: 60,
            near: 0.1,
            far: 10000,
          }}
        >
          <Experience />
        </Canvas>
      </div>
    </>
  );
}
