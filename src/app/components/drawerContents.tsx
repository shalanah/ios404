import React from 'react';
import styled from 'styled-components';
import { Filters } from './filters';
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
      <div style={{ margin: '-10px -10px' }}>
        <Filters />
      </div>
      <Features />
    </div>
  );
};
