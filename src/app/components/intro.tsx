import React from 'react';
import { Filters } from './filters';
import styled from 'styled-components';

const Div = styled.div`
  position: sticky;
  top: 0;
  height: 43dvh;
  display: flex;
  width: calc(100% + 2em);
  flex-direction: column;
  z-index: 1;
  gap: 5px;
  pointer-events: all;
  margin: 0 -1em;
  padding: 0 1em;
  padding-bottom: 10px;
`;

export const Intro = () => {
  return (
    <Div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 'calc(100% - 30px)',
          background: 'var(--bg)',
          zIndex: -1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 40,
          background:
            'linear-gradient(180deg, var(--bg) 30%, rgba(255,255,255,0) 100%)',
          zIndex: -1,
        }}
      />
      <h1
        style={{
          lineHeight: 1,
          fontWeight: 100,
          fontSize: '4.7rem',
          margin: 'auto 0 0',
        }}
      >
        iOS
        <span style={{ fontWeight: 700 }}>
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
          fontSize: '.95rem',
          fontWeight: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: '.5em',
          textWrap: 'balance',
        }}
      >
        <p>The missing web features of iOS.</p>
        <Filters />
      </div>
    </Div>
  );
};