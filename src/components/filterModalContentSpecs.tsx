import React from 'react';
import { Checkbox } from './checkbox';
import useCanIUseContext from '../hooks/useCanIUseContext';
import { Badge } from './badge';
import styled from 'styled-components';
import { FiltersType } from '../hooks/useFilters';

export type SpecTypes = keyof FiltersType['statuses'];
type StatusCounts = {
  [K in SpecTypes]: number;
};

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

export const FilterModalContentSpecs = ({
  onClose,
}: {
  onClose?: () => void;
}) => {
  const { filteredByBrowserOnly, statuses, filters, setFilters, filteredData } =
    useCanIUseContext();
  const statusCounts = filteredByBrowserOnly.reduce(
    (acc: { [k: string]: number }, v: { status: 'string' } & any) => {
      acc[v.status] += 1;
      return acc;
    },
    Object.fromEntries(Object.keys(statuses || {}).map((k) => [k, 0]))
  );
  const nonEmptyStatusFilters = Object.fromEntries(
    Object.entries(filters.statuses).filter(([k, _]) => {
      return statusCounts[k as SpecTypes] > 0;
    })
  );
  const len = Object.keys(nonEmptyStatusFilters).length;
  const numChecked = Object.values(nonEmptyStatusFilters).filter(
    (v) => v
  ).length;
  const indeterminate = numChecked !== len && numChecked > 0;
  const allChecked = numChecked === len;
  const checked = allChecked || (numChecked < len / 2 && numChecked > 0);
  // TODO: Make sure we have SOME BROWSERS
  const filteredTotal = filteredData.length;
  return (
    <>
      <h2
        style={{
          fontSize: '.8rem',
          textTransform: 'uppercase',
          fontWeight: 700,
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 5,
        }}
      >
        Specifications
      </h2>
      <div style={{ padding: '15px 0' }}>
        <Checkbox
          switchOrder
          indeterminate={indeterminate}
          onCheckedChange={() => {
            setFilters((prev: any) => {
              return {
                ...prev,
                statuses: Object.fromEntries(
                  Object.keys(prev.statuses).map((k) => [k, !checked])
                ),
              };
            });
          }}
          checked={checked}
        >
          All Specifications
        </Checkbox>
      </div>
      {[
        {
          title: 'W3C',
          description: 'Standards + specs since 1994',
          filterFn: (v: string) => {
            return !v.startsWith('W3C');
          },
          nameFormat: (v: string) => {
            return v
              .replace('W3C ', '')
              .replace('Candidate Recommendation', 'Candidate')
              .replace('Proposed Recommendation', 'Proposed')
              .replace('Working Draft', 'Draft');
          },
        },
        {
          title: 'WHATWG',
          description: 'Evolving standards since 2004',
          filterFn: (v: string) => {
            return !v.startsWith('WHATWG');
          },
          nameFormat: (v: string) => {
            return v.replace('WHATWG ', '');
          },
        },
        {
          filterFn: (v: string) => {
            return v.startsWith('W3C') || v.startsWith('WHATWG');
          },
          nameFormat: (v: string) => {
            return v;
          },
        },
      ].map(({ title, description, filterFn, nameFormat }, i) => {
        return (
          <div
            key={i}
            style={{
              padding: '15px 0',
              borderTop: '1px dotted var(--modalHr)',
            }}
          >
            {title && description && (
              <div
                style={{
                  color: 'var(--titleFg)',
                  width: '100%',
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  alignItems: 'baseline',
                }}
              >
                <div
                  style={{
                    fontSize: '.8rem',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: 5,
                  }}
                >
                  <span>{title}</span>
                  <span
                    style={{
                      opacity: 0.7,
                      textTransform: 'none',
                      textAlign: 'right',
                      fontSize: '.7rem',
                      lineHeight: 1.25,
                      fontWeight: 400,
                    }}
                  >
                    {description}
                  </span>
                </div>
              </div>
            )}
            {Object.entries(statusCounts).map(([k, v], i) => {
              const checked = filters.statuses[k as SpecTypes];
              if (filterFn(statuses?.[k] || '')) return null;
              return (
                <Checkbox
                  switchOrder
                  key={k}
                  checked={checked}
                  indeterminate={false}
                  onCheckedChange={(checked) => {
                    setFilters((prev: any) => {
                      return {
                        ...prev,
                        statuses: {
                          ...prev.statuses,
                          [k]: checked,
                        },
                      };
                    });
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>{nameFormat(statuses?.[k] || '')}</span>
                    <Badge active={checked}>{v}</Badge>
                  </div>
                </Checkbox>
              );
            })}
          </div>
        );
      })}
      <Submit onClick={onClose}>
        Close{' '}
        <span style={{ fontSize: '.8em' }}>
          Matches {filteredTotal} {filteredTotal === 1 ? 'feature' : 'features'}
        </span>
      </Submit>
    </>
  );
};
