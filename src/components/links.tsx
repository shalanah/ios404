import React from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { About } from './about';
import styled from 'styled-components';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import useCanIUseContext from '../hooks/useCanIUseContext';
import { verticalViewWidth } from '../utils/constants';

const Div = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  > div {
    display: flex;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: ${verticalViewWidth}px) {
    justify-content: space-between;
  }
`;

export const Links = () => {
  const { isDarkMode, setColorScheme } = useCanIUseContext();
  return (
    <Div>
      <p style={{ marginRight: 2, fontWeight: 400 }}>
        No affiliation with Apple or iOS
      </p>
      <div>
        <button
          aria-label="Toggle dark mode"
          onClick={() => setColorScheme(isDarkMode ? 'light' : 'dark')}
          style={{ width: 40, height: 40, borderRadius: 8 }}
        >
          {isDarkMode ? (
            <SunIcon style={{ width: 26, height: 26 }} />
          ) : (
            <MoonIcon style={{ width: 28, height: 28 }} />
          )}
        </button>
        <About
          button={
            <button
              aria-label="Learn more about this site"
              style={{ borderRadius: 8, width: 40, height: 40 }}
              onPointerUp={(e) => e.stopPropagation()}
            >
              <InfoCircledIcon style={{ width: 30, height: 30 }} />
            </button>
          }
        />
      </div>
    </Div>
  );
};
