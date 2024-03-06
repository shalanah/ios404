import React from 'react';
import { Filter } from './filter';

export const Intro = ({ bg }: { bg: string }) => {
  return (
    <div
      style={{
        background: `linear-gradient(180deg, ${bg} 89%, rgba(255,255,255,0) 100%)`,
        position: 'sticky',
        top: 0,
        height: '45dvh',
        display: 'flex',
        width: 'calc(100% + 2em)',
        flexDirection: 'column',

        zIndex: 1,
        pointerEvents: 'none',
        margin: '0 -1em',
        padding: '0 1em',
        paddingBottom: '50px',
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
        <Filter />
      </div>
    </div>
  );
};
