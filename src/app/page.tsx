'use client';

import { Canvas } from '@react-three/fiber';
import Experience from './components/experience';
import Features from './components/features';
import { CanIUseContextProvider } from './hooks/useCanIUseContext';
import { Intro } from './components/intro';
import { GitHubLogoIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { About } from './components/about';
import { DarkModeToggle } from './components/darkModeToggle';

export default function Home() {
  return (
    <CanIUseContextProvider>
      <div
        className={'pos-full-win'}
        style={{
          overflowX: 'hidden',
          background: 'var(--bg)',
          // outline: '1px solid black',
          position: 'fixed',
          overscrollBehavior: 'none',
          scrollBehavior: 'smooth',
          scrollPaddingBlockStart: '43dvh',
        }}
      >
        <Canvas
          className="pos-full-win"
          flat // already did tone mapping in our baked asset
          style={{
            marginLeft: '15vw',
            position: 'fixed',
            pointerEvents: 'none',
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
            textAlign: 'left',
            position: 'absolute',
            left: '23vw',
            width: '24vw',
            top: '0',
            paddingBottom: 30,
            padding: '0 1em',
            overscrollBehavior: 'contain',
            // paddingTop: '43dvh',
          }}
        >
          {/* Don't allow for covered-up features to be clickable */}
          <div
            style={{
              position: 'sticky',
              height: '43dvh',
              top: 0,
              zIndex: 1,
            }}
          />
          <Features />
        </div>
        <div
          style={{
            textAlign: 'left',
            position: 'fixed',
            left: '23vw',
            width: '24vw',
            top: '0',
            height: '43dvh',
            paddingBottom: 30,
            padding: '0 1em',
            pointerEvents: 'none', // allow for scroll
            zIndex: 1,
          }}
        >
          <Intro />
        </div>
        <div
          style={{
            position: 'fixed',
            top: 5,
            left: 0,
            width: '100%',
            height: 40,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            fontSize: '.8rem',
            justifyContent: 'flex-end',
            paddingRight: 15,
            lineHeight: 1,
            gap: 10,
          }}
        >
          <p style={{ marginRight: 2 }}>No affiliation with Apple or iOS.</p>
          <DarkModeToggle />
          <a href={'https://github.com/shalanah/ios404'} target="_blank">
            <GitHubLogoIcon style={{ width: 23, height: 23 }} />
          </a>
          <About
            button={
              <button>
                <InfoCircledIcon style={{ width: 25, height: 25 }} />
              </button>
            }
          />
        </div>
      </div>
    </CanIUseContextProvider>
  );
}
