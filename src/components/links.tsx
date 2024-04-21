import React from 'react';
import {
  InfoCircledIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@radix-ui/react-icons';
import { About } from '../modals/about';
import styled from 'styled-components';
import { verticalViewWidth, scaleOpts } from '../utils/constants';
import { DarkModeSwitch, defaultProperties } from 'react-toggle-dark-mode';
import useDarkMode from '../hooks/useDarkMode';
import useZoomContext from '@/hooks/useZoomContext';

const DMS = styled(DarkModeSwitch)`
  vector-effect: non-scaling-stroke;
  mask * {
    stroke: none;
  }
`;

const Div = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  > div {
    display: flex;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const buttonSize = 40;
const Button = styled.button`
  border-radius: 8px;
  width: ${buttonSize}px;
  height: ${buttonSize}px;
  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

const iconSize = 30;
const iconStyle = { width: iconSize, height: iconSize };

export const Links = () => {
  const { isDarkMode, setColorScheme } = useDarkMode();
  const { scale, increaseScale, decreaseScale } = useZoomContext();
  return (
    <Div>
      <p style={{ marginRight: 2, fontWeight: 400, textAlign: 'left' }}>
        Not affiliated with iOS or Apple
      </p>
      <div className="d-flex align-items-center">
        <Button
          disabled={scale >= scaleOpts.max}
          aria-label="Zoom in"
          onClick={increaseScale}
        >
          <ZoomInIcon style={iconStyle} />
        </Button>
        <Button
          disabled={scale <= scaleOpts.min}
          aria-label="Zoom out"
          onClick={decreaseScale}
        >
          <ZoomOutIcon style={iconStyle} />
        </Button>
        <Button
          aria-label="Toggle dark mode"
          onClick={() => setColorScheme(isDarkMode ? 'light' : 'dark')}
        >
          <DMS
            checked={!isDarkMode}
            size={27}
            moonColor="#000"
            sunColor="#fff"
            onChange={() => {}}
            animationProperties={{
              ...defaultProperties,
              springConfig: { mass: 2, tension: 250, friction: 35 },
            }}
          />
        </Button>
        <About
          button={
            <Button aria-label="Learn more about this site">
              <InfoCircledIcon style={iconStyle} />
            </Button>
          }
        />
      </div>
    </Div>
  );
};
