import React from 'react';
import { Checkbox } from '../components/checkbox';
import useMainContext from '../hooks/useMainContext';
import styled from 'styled-components';

import { browserIcons, compareBrowsers } from '@/utils/constants';

const Submit = styled.button`
  display: block;
  padding: 8px 15px;
  text-align: center;
  border-radius: 12px;
  width: 100%;
  border: 1px solid currentColor;
  font-size: 0.95rem;
  display: flex;
  gap: 10px;
  align-items: baseline;
  justify-content: space-between;
  font-variant-numeric: tabular-nums;
  &:hover {
    transform: scale(1);
  }
`;

export const FilterExperimental = ({ onClose }: { onClose?: () => void }) => {
  const { filters, setFilters, filteredData } = useMainContext();
  const filteredTotal = filteredData.length;
  return (
    <>
      <h2
        style={{
          fontSize: '.8rem',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}
      >
        Experimental Features
      </h2>
      <p style={{ fontSize: 12.5, marginTop: 5, lineHeight: 1.3 }}>
        MDN tags some features as experimental.
      </p>
      <div
        style={{
          margin: '10px 0 15px',
          borderTop: '1px dotted var(--modalHr)',
          paddingTop: 10,
        }}
      >
        <div style={{ padding: '0px 0' }}>
          <Checkbox
            onCheckedChange={() => {
              setFilters((prev: any) => {
                return {
                  ...prev,
                  experimental: !prev.experimental,
                };
              });
            }}
            checked={filters.experimental}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                lineHeight: 0,
              }}
            >
              <span>Show experimental features</span>
            </div>
          </Checkbox>
        </div>
      </div>
      <Submit onClick={onClose}>
        Close{' '}
        <span style={{ fontSize: '.8em' }}>
          Matches {filteredTotal} {filteredTotal === 1 ? 'feature' : 'features'}
        </span>
      </Submit>
    </>
  );
};
