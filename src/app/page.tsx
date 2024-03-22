'use client';

import { Canvas } from '@react-three/fiber';
import Experience from '../components/experience';
import { CanIUseContextProvider } from '../hooks/useCanIUseContext';
import { Intro } from '../components/intro';
import { useWindowSize } from '@uidotdev/usehooks';
import styled from 'styled-components';
import { Links } from '../components/links';
import { Drawer } from '../components/drawer';
import { useEffect, useState } from 'react';
import Bowser from 'bowser';
import { verticalViewWidth } from '../utils/constants';
import { Search } from '../components/search';
import Features from '../components/features';
import { ErrorModal } from '../components/errorModal';
import { Filter } from '../components/filter';

const DesktopFeaturesDiv = styled.div`
  text-align: left;
  position: absolute;
  left: calc(50% - (var(--features-width) * 1.5));
  width: var(--features-width);
  margin-left: 15px;
  top: 0px;
  padding-bottom: 50px;
  padding: 0 1em;
  overscroll-behavior: contain;
  z-index: 2;
  /* outline: 1px solid red; */
`;
// Covers up top portion of features so they can't be clicked --- but still allows for scroll
const DesktopFeaturesStickyTopCover = styled.div`
  position: sticky;
  height: var(--intro-padding);
  top: 0;
  z-index: 2;
`;

const DesktopIntroDiv = styled.div`
  text-align: left;
  position: fixed;
  left: 50%;
  margin-left: 15px;
  transform: translateX(calc(var(--features-width) * -1.5));
  width: var(--features-width);
  top: 0;
  height: var(--intro-padding);
  padding-bottom: 30px;
  padding: 0 1em;
  pointer-events: none; /* allow for scroll */
  z-index: 3;
`;
const LinksDiv = styled.div`
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  padding: 15px 15px 0px;
  width: 100%;
  height: 40px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  font-size: 0.8rem;
  line-height: 1;
`;

const DesktopCanvasDiv = styled.div`
  /* outline: 1px solid red; */
  position: sticky;
  overflow: visible;
  /* pointer-events: none; */
  height: 100%;
  left: calc(50% - (var(--features-width) * 0.5));
  width: calc(var(--features-width) * 2); // little extra for padding
  top: 0;
  z-index: 0;
  touch-action: none;
`;

const MobileCanvasDiv = styled.div`
  position: absolute;
  left: 0;
  top: -40px; /// making room for features div
  height: 100dvh;
  width: 100vw;
  z-index: 0;
  touch-action: none;
`;

const cameraDesktop = {
  // position: [-77, -40.2, 242],
  position: [-77, -30, 242],
  fov: 56,
  near: 0.1,
  far: 10000, // seems a bit much... TODO: double check
} as const;

const cameraMobile = {
  // position: [-77, -40.2, 242],
  position: [-77, -30, 242],
  fov: 60,
  near: 0.1,
  far: 10000, // seems a bit much... TODO: double check
} as const;

export default function Home() {
  const { width, height } = useWindowSize();
  const closedHeight = 55;
  const openHeight = Math.max((height || 0) - 400, (height || 0) * 0.6);
  const [isFirefox, setIsFirefox] = useState(false);

  useEffect(() => {
    const browser = Bowser.getParser(window?.navigator?.userAgent);
    setIsFirefox(browser.isBrowser('Firefox'));
  }, []);

  if (width === null) return null;

  // Vertical View
  if (width && width < verticalViewWidth) {
    return (
      <CanIUseContextProvider>
        <ErrorModal />
        <MobileCanvasDiv>
          <Canvas flat camera={cameraMobile} style={{ touchAction: 'none' }}>
            <Experience />
          </Canvas>
        </MobileCanvasDiv>
        <LinksDiv>
          <Links />
        </LinksDiv>
        <Drawer
          height={[openHeight, closedHeight]}
          content={
            <div
              style={{
                padding: '2px 30px 20px',
                textAlign: 'left',
              }}
            >
              <Features />
            </div>
          }
          footer={
            <div
              style={{
                padding: '13px 25px 20px',
                borderTop: '1px solid var(--modalHr)',
              }}
            >
              <Filter />
              <div style={{ height: 8 }} />
              <Search />
            </div>
          }
        />
      </CanIUseContextProvider>
    );
  }

  // Horizontal View
  return (
    <CanIUseContextProvider>
      <ErrorModal />
      <DesktopCanvasDiv style={{ position: isFirefox ? 'fixed' : 'sticky' }}>
        <div
          style={{
            width: '100vw',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(calc(-50% + 4vw))',
            top: 0,
            height: '100dvh',
          }}
        >
          <Canvas
            style={{
              touchAction: 'none',
            }}
            flat
            camera={cameraDesktop}
          >
            <Experience />
          </Canvas>
        </div>
      </DesktopCanvasDiv>
      <DesktopIntroDiv>
        <Intro />
      </DesktopIntroDiv>
      <DesktopFeaturesDiv>
        <DesktopFeaturesStickyTopCover />
        <Features />
        {/* Gap at bottom of feature list (acts like padding) */}
        <div style={{ height: 30 }} />
      </DesktopFeaturesDiv>
      <LinksDiv>
        <Links />
      </LinksDiv>
    </CanIUseContextProvider>
  );
}
