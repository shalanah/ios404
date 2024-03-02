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
          position: 'fixed',
          overscrollBehavior: 'none',
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
            outline: '1px solid black',
            overscrollBehavior: 'contain',
            paddingLeft: '1em',
          }}
        >
          <div
            style={{
              background: `linear-gradient(180deg, ${bg} 89%, rgba(255,255,255,0) 100%)`,
              // height: 400,
              position: 'sticky',
              top: 0,
              marginLeft: '-1em',
              paddingLeft: '1em',
              height: '45dvh',
              display: 'flex',
              width: 'calc(100% + 1em)',
              flexDirection: 'column',
              paddingBottom: '50px',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            <h1
              style={{
                fontWeight: 100,
                fontSize: '3.75rem',
                margin: 'auto 0 0',
              }}
            >
              iOS
              <span style={{ fontWeight: 500 }}>
                4
                <span
                // style={{ letterSpacing: '-.02em' }}
                >
                  04
                </span>
              </span>
            </h1>
            <div
              style={{
                lineHeight: 1.35,
                fontSize: '.8rem',
                fontWeight: 200,
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
                // letterSpacing: '.03em',
              }}
            >
              <p>
                A collection of missing iOS web features collated from
                caniuse.com data. (info icon)
              </p>
              <p>
                This site has no affiliation with Apple, iOS, Webkit, Safari, or
                caniuse.
              </p>
            </div>
          </div>
          <Features />
        </div>
      </div>
    </CanIUseContextProvider>
  );
}
