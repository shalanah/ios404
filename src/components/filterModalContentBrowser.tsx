import React from 'react';
import { Checkbox } from './checkbox';
import useCanIUseContext from '../hooks/useCanIUseContext';
import styled from 'styled-components';
import ChromeIcon from '../svgs/chrome.svg';
import SafariIcon from '../svgs/safari.svg';
import FirefoxIcon from '../svgs/firefox.svg';

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

export const icons = {
  and_chr: ChromeIcon,
  safari: SafariIcon,
  and_ff: FirefoxIcon,
};

export const FilterModalContentBrowser = ({
  onClose,
}: {
  onClose?: () => void;
}) => {
  const { filters, setFilters, filteredData } = useCanIUseContext();
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
        Comparision Browsers
      </h2>
      <p style={{ fontSize: 13, marginTop: 5 }}>
        Selecting multiple browsers acts as an intersect.
      </p>
      <div
        style={{
          margin: '10px 0 15px',
          borderTop: '1px dotted var(--modalHr)',
          paddingTop: 10,
        }}
      >
        {[
          {
            key: 'and_chr',
            title: 'Chrome for Android',
          },
          {
            key: 'and_ff',
            title: 'Firefox for Android',
          },
          {
            key: 'safari',
            title: 'Mac Safari (Desktop)',
          },
        ].map(({ key, title }) => {
          // @ts-ignore
          const Icon = icons[key] || icons.and_chr;
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
