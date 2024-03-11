'use client';

import { Canvas } from '@react-three/fiber';
import Experience from './components/experience';
import Features from './components/features';
import { CanIUseContextProvider } from './hooks/useCanIUseContext';
import { Intro } from './components/intro';
import { GitHubLogoIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { About } from './components/about';
import { DarkModeToggle } from './components/darkModeToggle';

import styled from 'styled-components';

const Div = styled.div`
  overflow-x: hidden;
  position: fixed;
  overscroll-behavior: none;
  scroll-behavior: smooth;
  scroll-padding-block-start: 43dvh;
  --left-gutter: 26vw;
  --intro-padding: 40dvh;
  --features-width: 300px;
  --top: #eee9e2;
  --carton-left: calc(var(--left-gutter) * 0.525);
  @media (max-width: 1500px) {
    --left-gutter: 22vw;
  }
  @media (max-width: 1300px) {
    --left-gutter: 20vw;
  }
  @media (max-width: 1200px) {
    --left-gutter: 13vw;
  }
  @media (max-width: 1100px) {
    --left-gutter: 10vw;
  }
`;
const FeaturesDiv = styled.div`
  text-align: left;
  position: absolute;
  left: var(--left-gutter);
  width: var(--features-width);
  top: 0px;
  padding-bottom: 50px;
  padding: 0 1em;
  overscroll-behavior: contain;
`;
// Covers up top portion of features so they can't be clicked --- but still allows for scroll
const FeaturesStickyTopCover = styled.div`
  position: sticky;
  height: var(--intro-padding);
  top: 0;
  z-index: 1;
`;

const IntroDiv = styled.div`
  text-align: left;
  position: fixed;
  left: var(--left-gutter);
  width: var(--features-width);
  top: 0;
  height: var(--intro-padding);
  padding-bottom: 30px;
  padding: 0 1em;
  pointer-events: none; /* allow for scroll */
  z-index: 1;
`;
const LinksDiv = styled.div`
  position: fixed;
  top: 5px;
  left: 0;
  width: 100%;
  height: 40px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding-right: 15px;
  font-size: 0.8rem;
  line-height: 1;
`;

const CanvasDiv = styled.div`
  position: fixed;
  pointer-events: none;
  height: 100dvh;
  width: 100vw;
  left: var(--carton-left);
  top: 0;
`;

export default function Home() {
  return (
    <CanIUseContextProvider>
      <Div className={'pos-full-win'}>
        <CanvasDiv>
          <Canvas
            flat // already did tone mapping in our baked asset
            camera={{
              position: [-77, -40.2, 242],
              fov: 60,
              near: 0.1,
              far: 10000, // seems a bit much... TODO: double check
            }}
          >
            <Experience />
          </Canvas>
        </CanvasDiv>
        <FeaturesDiv>
          <FeaturesStickyTopCover />
          <Features />
        </FeaturesDiv>
        <IntroDiv>
          <Intro />
        </IntroDiv>
        <LinksDiv>
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
        </LinksDiv>
      </Div>
    </CanIUseContextProvider>
  );
}
