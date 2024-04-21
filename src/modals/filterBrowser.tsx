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

export const FilterBrowser = ({ onClose }: { onClose?: () => void }) => {
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
        Comparison Browsers
      </h2>
      <p style={{ fontSize: 12.5, marginTop: 5, lineHeight: 1.3 }}>
        Choose browser(s) to display iOS features missing in comparison.
      </p>
      <div
        style={{
          margin: '10px 0 15px',
          borderTop: '1px dotted var(--modalHr)',
          paddingTop: 10,
        }}
      >
        {compareBrowsers.map(({ ciuKey: key, title }) => {
          const Icon = browserIcons[key];
          return (
            <div style={{ padding: '0px 0' }} key={key}>
              <Checkbox
                onCheckedChange={() => {
                  setFilters((prev: any) => {
                    return {
                      ...prev,
                      browsers: {
                        ...prev.browsers,
                        [key]: !prev.browsers[key],
                      },
                    };
                  });
                }}
                checked={filters.browsers[key]}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    lineHeight: 0,
                  }}
                >
                  <span>
                    <Icon width={28} style={{ flexShrink: 0 }} />
                  </span>
                  <span>{title}</span>
                </div>
              </Checkbox>
            </div>
          );
        })}
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
