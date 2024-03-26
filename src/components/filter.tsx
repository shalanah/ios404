import React from 'react';
import { MixerVerticalIcon } from '@radix-ui/react-icons';
import useCanIUseContext from '../hooks/useCanIUseContext';
import styled from 'styled-components';
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
  right: 0;
  transition: 0.2s transform, 0.05s opacity;
`;

export const Filter = () => {
  const { statusCounts, filters, iOSLacking, filteredData, loading } =
    useCanIUseContext();
  const nonEmptyStatusFilters = Object.fromEntries(
    Object.entries(filters.statuses).filter(([k, _]) => {
      return statusCounts[k] > 0;
    })
  );
  const len = Object.keys(nonEmptyStatusFilters).length;
  const numChecked = Object.values(nonEmptyStatusFilters).filter(
    (v) => v
  ).length;
  const filterCount = len - numChecked;

  let count =
    filteredData.length === iOSLacking.length
      ? `${iOSLacking.length} features`
      : `${filteredData.length} features`;
  if (loading) {
    count = 'Loading...';
  }

  const browserCount =
    Object.values(filters.browsers).filter((v) => v).length - 1;
  const browserOffset = 16;
  const browserLogoSize = 27;

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
            </Button>
          }
        >
          <FilterModalContentSpecs />
        </FilterModal>
        <Count>{count}</Count>
      </div>
      <FilterModal
        button={
          <Button
            aria-label="Comparison browsers"
            style={{
              marginLeft: 4,
              display: 'flex',
              gap: 2,
              // TODO: Add padding
              // TODO: same order
              width: browserLogoSize + browserOffset * browserCount,
              color: 'var(--color)',
              flexShrink: 0,
              position: 'relative',
              outline: '2px solid red',
              height: browserLogoSize,
            }}
          >
            {Object.entries(filters.browsers).map(([k, v], i) => {
              const before = Object.values(filters.browsers)
                .slice(0, i)
                .filter((on) => on).length;

              console.log(-browserOffset * Math.max(before, 0), 0, v, before);
              // @ts-ignore
              const Icon = icons[k];
              return (
                <Span
                  key={k}
                  style={{
                    position: 'absolute',
                    top: 0,
                    pointerEvents: 'none',
                    right: 0,
                    transform: `translateX(${
                      v ? -browserOffset * Math.max(before, 0) : 0
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
          </Button>
        }
      >
        <FilterModalContentBrowser />
      </FilterModal>
    </Div>
  );
};
