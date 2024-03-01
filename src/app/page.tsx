'use client';

import { Canvas } from '@react-three/fiber';
import styles from './page.module.css';
import Experience from './components/experience';
import Features from './components/features';
import { CanIUseContextProvider } from './hooks/useCanIUseContext';

const bg = '#bad1df'; // TODO: Put onto HTML/Body instead

export default function Home() {
  return (
    <CanIUseContextProvider>
      <div
        className={'pos-full-win'}
        style={{
          // overflowY: 'scroll',
          overflowX: 'hidden',
          background: bg,
          outline: '1px solid black',
        }}
      >
        <Canvas
          className="pos-full-win"
          flat // already did tone mapping in our baked asset
          style={{
            marginLeft: '15vw',
            position: 'fixed',
          }}
          camera={{
            position: [-77, -40.2, 242],
            fov: 60,
            near: 0.1,
            far: 10000,
          }}
        >
          <Experience />
        </Canvas>
        {/* TODO: Might need to put regular html into sceen for pointer events */}

        <div
          style={{
            pointerEvents: 'all',
            padding: '1rem 1.5rem',
            textAlign: 'left',
            position: 'absolute',
            left: '23vw',
            width: '24vw',
            top: '10dvh',
            zIndex: 1,
            outline: '1px solid black',
            // background: 'green',
            // height: '90dvh',
          }}
        >
          <Features />
        </div>
      </div>
    </CanIUseContextProvider>
  );
}
