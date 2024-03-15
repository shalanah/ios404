import React from 'react';
import { DarkModeToggle } from './darkModeToggle';
import { GitHubLogoIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { About } from './about';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  > div {
    display: flex;
    gap: 10px;
  }
  @media (max-width: 930px) {
    justify-content: space-between;
  }
`;

export const Links = () => {
  return (
    <Div>
      <p style={{ marginRight: 2, fontWeight: 'bold' }}>
        No affiliation with Apple or iOS.
      </p>
      <div>
        <DarkModeToggle />
        <About
          button={
            <button style={{ borderRadius: '50%' }}>
              <InfoCircledIcon style={{ width: 25, height: 25 }} />
            </button>
          }
        />
      </div>
    </Div>
  );
};
