import React from 'react';
import { MixerVerticalIcon, GlobeIcon } from '@radix-ui/react-icons';
import useCanIUseContext from '../hooks/useCanIUseContext';
import styled, { keyframes } from 'styled-components';
import { FilterModal } from './filterModal';
import { FilterModalContentSpecs } from './filterModalContentSpecs';
import { FilterModalContentBrowser, icons } from './filterModalContentBrowser';

const height = 36;
const radius = 10;
const iconSize = 22;
const fontSize = 13;

const Indicator = styled.span`
  display: inline-block;
  width: 19px;
  height: 14px;
  border-radius: ${radius}px;
  background: var(--modalBg);
  color: var(--color);
  position: absolute;
  top: -2px;
  right: -2px;
  font-size: 10px;
  line-height: 0px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border: 1px solid var(--modalHr);
`;

const Button = styled.button`
  border-radius: ${radius}px;
  height: ${height}px;
  min-width: ${height}px;
  padding: 0 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color);
  flex-shrink: 0;
  transition: 0.15s;
  position: relative;
  &:hover {
    transform: scale(1);
    background: var(--modalBg);
  }
`;

const Div = styled.div`
  display: flex;
  gap: 5px;
  height: ${height}px;
  align-items: center;
  color: var(--titleColor);
  justify-content: space-between;
  width: 100%;
  flex-shrink: 0;
`;
const Count = styled.div`
  min-width: 8ch;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  color: var(--color);
  font-size: ${fontSize}px;
`;
const Span = styled.span`
  opacity: 0;
  transition: 0.2s transform ease-out, 0.1s opacity ease-out;
  position: absolute;
  top: 0;
  pointer-events: none;
  right: 0;
`;

const boxShadowShrinkGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0px #ff000033;
  }
  40% {
    box-shadow: 0 0 0 0px #ff000033;
  }
   50% {
    box-shadow: 0 0 0 4px #ffaaaa55;
  }
  60% {
    box-shadow: 0 0 0 0px #ff000033;
  }
  100% {
    box-shadow: 0 0 0 0px #ff000033;
  }
`;

const Error = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background: red;
  position: absolute;
  top: 3px;
  right: 5px;
  animation: ${boxShadowShrinkGlow} 5s infinite alternate;
`;

export const Filter = () => {
  const { filters, iOSLacking, filteredData, loading } = useCanIUseContext();
  const len = Object.keys(filters.statuses).length;
  const numChecked = Object.values(filters.statuses).filter((v) => v).length;
  const filterCount = len - numChecked;

  let count =
    filteredData.length === iOSLacking.length
      ? `${iOSLacking.length} features`
      : `${filteredData.length} features`;
  if (loading) {
    count = 'Loading...';
  }

  const browserCount = Object.values(filters.browsers).filter((v) => v).length;
  const browserOffset = 16;
  const browserLogoSize = 27;
  const hasBrowsers = browserCount > 0;
  // So order same as in modal Chrome, FF, then safari (it's a list of 3 not to worried about performance here))
  const filterBrowsersReversed = Object.fromEntries(
    Object.entries(filters.browsers).reverse()
  );

  return (
    <Div>
      <div className="d-flex align-items-center" style={{ gap: 5 }}>
        <FilterModal
          button={
            <Button aria-label="Filter" style={{ marginLeft: 4 }}>
              <MixerVerticalIcon width={iconSize} height={iconSize} />
              {filterCount !== 0 && numChecked !== 0 && (
                <Indicator>{numChecked}</Indicator>
              )}
              {numChecked === 0 && <Error />}
            </Button>
          }
        >
          <FilterModalContentSpecs />
        </FilterModal>
        <Count>{count}</Count>
      </div>
      {!loading && (
        <FilterModal
          button={
            <Button
              aria-label="Comparison browsers"
              style={{
                // TODO: same order
                color: 'var(--color)',
                flexShrink: 0,
              }}
            >
              {!hasBrowsers && <Error />}
              <div
                style={{
                  width:
                    browserLogoSize +
                    browserOffset * Math.max(browserCount - 1, 0),
                  height: browserLogoSize,
                  position: 'relative',
                }}
              >
                <Span key={'none'} style={{ opacity: hasBrowsers ? 0 : 1 }}>
                  <GlobeIcon
                    width={browserLogoSize}
                    height={browserLogoSize}
                    // TODO: Look into how to make this accessible... alt? title? etc --- not sure with Radix Icons
                  />
                </Span>
                {/* Reversing so it goes Chrome, FF, then Safari, same order as in modal */}
                {Object.entries(filterBrowsersReversed).map(([k, v], i) => {
                  const before = Object.values(filterBrowsersReversed)
                    .slice(0, i)
                    .filter((on) => on).length;
                  // @ts-ignore
                  const Icon = icons[k];
                  return (
                    <Span
                      key={k}
                      style={{
                        transform: v
                          ? `translateX(${-browserOffset * before}px)`
                          : `translateX(${
                              -browserOffset * Math.max(before - 1, 0)
                            }px)`,
                        opacity: v ? 1 : 0,
                      }}
                    >
                      <Icon
                        width={browserLogoSize}
                        height={browserLogoSize}
                        title={k}
                      />
                    </Span>
                  );
                })}
              </div>
            </Button>
          }
        >
          <FilterModalContentBrowser />
        </FilterModal>
      )}
    </Div>
  );
};
