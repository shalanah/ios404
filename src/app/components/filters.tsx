import React, { useId, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { MixerVerticalIcon, Cross2Icon } from '@radix-ui/react-icons';
import useCanIUseContext from '../hooks/useCanIUseContext';
import styled from 'styled-components';
import { Checkbox } from './checkbox';

const Button = styled.button`
  font-family: inherit;
  border-radius: 100%;
  height: 30px;
  width: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  color: var(--color);
  margin-left: -8px;
  &:hover {
    transition: 0.15s;
    background: var(--modalBg);
  }
`;

const PopoverContent = styled(Popover.Content)`
  border-radius: 20px;
  padding: 20px;
  width: 260px;
  background-color: var(--modalBg);
  box-shadow: var(--modalShadow) 0px 10px 38px -10px,
    var(--modalShadow) 0px 10px 20px -15px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  text-align: left;
  &[data-state='open'][data-side='top'] {
    animation-name: slideDownAndFade;
  }
  &[data-state='open'][data-side='right'] {
    animation-name: slideLeftAndFade;
  }
  &[data-state='open'][data-side='bottom'] {
    animation-name: slideUpAndFade;
  }
  &[data-state='open'][data-side='left'] {
    animation-name: slideRightAndFade;
  }
`;

const PopoverArrow = styled(Popover.Arrow)`
  fill: var(--modalBg);
`;

const PopoverClose = styled(Popover.Close)`
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 2;
  &:hover,
  &:focus {
    outline: 1px solid currentColor;
  }
`;

export const Filters = () => {
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
  const [open, setOpen] = useState(false);
  const len = Object.keys(nonEmptyStatusFilters).length;
  const numChecked = Object.values(nonEmptyStatusFilters).filter(
    (v) => v
  ).length;
  const indeterminate = numChecked !== len && numChecked > 0;
  const allChecked = numChecked === len;
  const checked = allChecked || (numChecked < len / 2 && numChecked > 0);

  let count =
    filteredData.length === iOSLacking.length
      ? `${iOSLacking.length} missing features`
      : `${filteredData.length} found of ${iOSLacking.length}`;
  if (filteredData.length === 0) count = 'No matches';

  return (
    <div
      style={{
        height: 35,
        marginTop: 10,
        display: 'flex',
        gap: 5,
        alignItems: 'center',
        marginBottom: 20,
        color: 'var(--alternateTitle)',
      }}
    >
      <Popover.Root
        modal
        onOpenChange={(change) => setOpen(change)}
        open={open}
      >
        <Popover.Trigger asChild>
          <Button className={'IconButton'} aria-label="Update dimensions">
            <MixerVerticalIcon />
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <PopoverContent sideOffset={5}>
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
                        color: 'var(--alternateTitle)',
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
                  {Object.entries(statusCounts).map(([k, v]) => {
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
            <button
              onClick={() => {
                setOpen(false);
              }}
              style={{
                display: 'block',
                padding: '8px 0px',
                textAlign: 'center',
                borderRadius: '8px',
                width: '100%',
                outline: '1px solid currentColor',
                fontSize: '.8rem',
              }}
            >
              Done
            </button>
            <PopoverClose aria-label="Close">
              <Cross2Icon />
            </PopoverClose>
            <PopoverArrow />
          </PopoverContent>
        </Popover.Portal>
      </Popover.Root>
      <div
        style={{
          width: '12ch',
          whiteSpace: 'nowrap',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {count}
      </div>
      {!allChecked && (
        <button
          style={{
            display: 'flex',
            gap: 5,
            alignItems: 'center',
            borderRadius: 20,
            height: 35,
            padding: '0 5px',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setFilters((prev: any) => {
              return {
                ...prev,
                statuses: Object.fromEntries(
                  Object.keys(prev.statuses).map((k) => [k, true])
                ),
              };
            });
          }}
        >
          <span>Clear filters</span>{' '}
          <span style={{ display: 'flex', padding: '0 3px' }}>
            <Cross2Icon style={{ margin: 'auto' }} />
          </span>
        </button>
      )}
    </div>
  );
};
