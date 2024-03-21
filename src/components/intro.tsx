import React from 'react';
import styled from 'styled-components';
import { Search } from './search';
import { Filter } from './filter';

const Div = styled.div`
  display: flex;
  position: relative;
  width: calc(100% + 2em);
  height: 100%;
  flex-direction: column;
  z-index: 1;
  gap: 5px;
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
          fontSize: '76px',
          margin: 'auto 0 0',
        }}
      >
        <a href="/">
          iOS
          <span style={{ fontWeight: 700 }}>
            4<span>04</span>
          </span>
        </a>
      </h1>
      <div
        style={{
          marginLeft: -8,
          marginRight: -8,
          color: 'var(--titleColor)',
          lineHeight: 1.35,
          fontSize: '.95rem',
          fontWeight: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: '.5em',
          textWrap: 'balance',
        }}
      >
        <div
          style={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 20,
            gap: 7,
          }}
        >
          <Search />
          <Filter />
        </div>
      </div>
    </Div>
  );
};