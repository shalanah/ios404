import React from 'react';
import Features from './features';

export const DrawerContents = () => {
  return (
    <div
      style={{
        outline: '1px solid yellow',
        padding: '20px 30px',
        textAlign: 'left',
      }}
    >
      <Features />
    </div>
  );
};
