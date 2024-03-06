'use client';

import { Canvas } from '@react-three/fiber';
import styles from './page.module.css';
import Experience from './components/experience';
import Features from './components/features';
import { CanIUseContextProvider } from './hooks/useCanIUseContext';
import { Intro } from './components/intro';
import { GitHubLogoIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { About } from './components/about';

const bg = '#bad1df'; // TODO: Put onto HTML/Body instead

export default function Home() {
  return (
    <CanIUseContextProvider>
      <div
        className={'pos-full-win'}
        style={{
          // overflowY: 'scroll',
          overflowX: 'hidden',
          background: 'var(--bg)',
          outline: '1px solid black',
          position: 'fixed',
          overscrollBehavior: 'none',
          scrollBehavior: 'smooth',
          scrollPaddingBlockStart: '45dvh',
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
            textAlign: 'left',
            position: 'absolute',
            left: '23vw',
            width: '24vw',
            top: '0',
            paddingBottom: 30,
            padding: '0 1em',
            outline: '1px solid black',
            overscrollBehavior: 'contain',
          }}
        >
          <Intro bg={bg} />
          <Features />
        </div>
        <div
          style={{
            position: 'fixed',
            top: 5,
            left: 0,
            width: '100%',
            height: 40,
            pointerEvents: 'none',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            fontSize: '.8rem',
            justifyContent: 'flex-end',
            paddingRight: 15,
            lineHeight: 1,
            gap: 5,
          }}
        >
          <p style={{ marginRight: 2 }}>No affiliation with Apple or iOS.</p>
          <About
            button={
              <button style={{ pointerEvents: 'all' }}>
                <InfoCircledIcon style={{ width: 25, height: 25 }} />
              </button>
            }
          />
          <a
            href={'https://github.com/shalanah/ios404'}
            style={{ pointerEvents: 'all' }}
            target="_blank"
          >
            <GitHubLogoIcon style={{ width: 23, height: 23 }} />
          </a>
        </div>
      </div>
    </CanIUseContextProvider>
  );
}
