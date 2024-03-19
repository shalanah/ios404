import React from 'react';
import { Checkbox } from './checkbox';
import useCanIUseContext from '../hooks/useCanIUseContext';

export const FilterContent = () => {
  const {
    statusCounts,
    statuses,
    filters,
    setFilters,
    iOSLacking,
    filteredData,
  } = useCanIUseContext();
  const nonEmptyStatusFilters = Object.fromEntries(
    Object.entries(filters.statuses).filter(([k, _]) => {
      return statusCounts[k] > 0;
    })
  );
  const len = Object.keys(nonEmptyStatusFilters).length;
  const numChecked = Object.values(nonEmptyStatusFilters).filter(
    (v) => v
  ).length;
  const indeterminate = numChecked !== len && numChecked > 0;
  const allChecked = numChecked === len;
  const checked = allChecked || (numChecked < len / 2 && numChecked > 0);
  return (
    <>
      <h2
        style={{
          fontSize: '.8rem',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}
      >
        Filters
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
          All specifications
        </Checkbox>
      </div>
      {[
        {
          title: 'W3C',
          description: 'Protocols and guidelines since 1994',
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
          description: 'Evolving standards + specs since 2004',
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
                  color: 'var(--titleColor)',
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
                  }}
                >
                  {title}
                </div>
                <p
                  style={{
                    opacity: 0.7,
                    textAlign: 'right',
                    fontSize: '.7rem',
                    lineHeight: 1.25,
                    marginBottom: 5,
                    marginTop: 0,
                  }}
                >
                  {description}
                </p>
              </div>
            )}
            {Object.entries(statusCounts).map(([k, v], i) => {
              if (v === 0) return null;
              const checked = filters.statuses[k];
              if (filterFn(statuses[k])) return null;
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
                    }}
                  >
                    <span>{nameFormat(statuses[k])}</span>
                    <span
                      style={{
                        background: 'var(--badgeBg)',
                        color: 'var(--badgeColor)',
                        border: '1px solid var(--badgeBorder)',
                        height: 20,
                        borderRadius: 20,
                        fontSize: '.7rem',
                        width: '4ch',
                        textAlign: 'center',
                        lineHeight: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontVariantNumeric: 'tabular-nums',
                        fontWeight: 700,
                      }}
                    >
                      {v as string}
                    </span>
                  </div>
                </Checkbox>
              );
            })}
          </div>
        );
      })}
    </>
  );
};
