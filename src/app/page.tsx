'use client';

import { Canvas } from '@react-three/fiber';
import Experience from './components/experience';
import Features from './components/features';
import { CanIUseContextProvider } from './hooks/useCanIUseContext';
import { Intro } from './components/intro';
import { useWindowSize } from '@uidotdev/usehooks';
import styled from 'styled-components';
import { Links } from './components/links';
import { Drawer } from './components/drawer';
import { useState } from 'react';
import { Filters } from './components/filters';

const DesktopDiv = styled.div`
  overflow-x: hidden;
  position: fixed;
  overscroll-behavior: none;
  scroll-behavior: smooth;
  scroll-padding-block-start: 43dvh;
`;
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
  outline: 1px solid red;
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
  padding: 5px 15px 0px;
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
  outline: 1px solid red;
  position: sticky;
  overflow: visible;
  pointer-events: none;
  height: 100dvh;
  left: calc(50% - (var(--features-width) * 0.5));
  width: calc(var(--features-width) * 2); // little extra for padding
  top: 0;
`;

const camera = {
  position: [-77, -40.2, 242],
  fov: 60,
  near: 0.1,
  far: 10000, // seems a bit much... TODO: double check
};

export default function Home() {
  const { width, height } = useWindowSize();
  const closedHeight = 40;
  const openHeight = Math.max((height || 0) - 200, (height || 0) * 0.75);

  if (width === null) return null;
  if (width && width < 930) {
    return (
      <CanIUseContextProvider>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: -40, /// making room for features div
            height: '100dvh',
            width: '100vw',
            zIndex: 0,
          }}
        >
          <Canvas
            flat // already did tone mapping in our baked asset
            // @ts-ignore
            camera={camera}
          >
            <Experience />
          </Canvas>
        </div>
        {/* TODO: Pull out links div into own comp */}
        <LinksDiv>
          <Links />
        </LinksDiv>
        <Drawer
          height={[openHeight, closedHeight]}
          content={
            <div style={{ height: 1000, outline: '1px solid yellow' }}>
              <Filters />
              <Features />
            </div>
          }
          clickContent={
            <div style={{ height: closedHeight, outline: '1px solid red' }} />
          }
          footer={<div style={{ height: 20, background: 'green' }} />}
        />
      </CanIUseContextProvider>
    );
  }
  return (
    <CanIUseContextProvider>
      <DesktopDiv className={'pos-full-win'}>
        <DesktopCanvasDiv>
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
              flat // already did tone mapping in our baked asset
              // @ts-ignore
              camera={camera}
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
        </DesktopFeaturesDiv>
      </DesktopDiv>
      <LinksDiv>
        <Links />
      </LinksDiv>
    </CanIUseContextProvider>
  );
}
