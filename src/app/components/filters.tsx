import React, { useEffect, useId, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import {
  MixerVerticalIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
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
  color: var(--color);
  margin-left: -8px;
  flex-shrink: 0;
  &:hover {
    transition: 0.15s;
    background: var(--modalBg);
  }
`;

const PopoverContent = styled(Popover.Content)`
  border-radius: 20px;
  padding: 20px;
  width: 260px;
  z-index: 4;
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
  &:focus-visible {
    outline: 1px solid var(--modalHr);
  }
`;

const PopoverArrow = styled(Popover.Arrow)`
  fill: none;
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
  &:hover {
    outline: 1px solid currentColor;
  }
`;

const Submit = styled.button`
  display: block;
  padding: 8px 0px;
  text-align: center;
  border-radius: 8px;
  width: 100%;
  border: 1px solid currentColor;
  font-size: 0.8rem;
`;

const Input = styled.input`
  padding: 8px 10px 8px 35px;
  height: 33px;
  border-radius: 12px;
  border: 1px solid currentColor;
  font-size: 0.8rem;
  width: 100%;
  background: var(--bg);
  color: var(--color);
  &::placeholder {
    color: var(--color);
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
    search,
    setSearch,
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
      ? `${iOSLacking.length} / ${iOSLacking.length}`
      : `${filteredData.length} / ${iOSLacking.length}`;

  useEffect(() => {
    // Make sure there is focus on the container element
    const onKeyUp = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      const tagName = el.tagName.toLowerCase();
      if (['button', 'label', 'svg', 'input'].includes(tagName)) return;
      if (e.key === 'Enter' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [open]);

  return (
    <div
      style={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
        gap: 7,
      }}
    >
      <div style={{ position: 'relative' }}>
        <Input
          type="search"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <span
          aria-label="Search"
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            left: 12,
            top: 8,
          }}
        >
          <MagnifyingGlassIcon width={18} height={18} />
        </span>
        {search && (
          <button
            style={{
              position: 'absolute',
              right: 10,
              top: 8,
              borderRadius: '50%',
              width: 18,
              height: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setSearch('')}
          >
            <Cross2Icon />
          </button>
        )}
      </div>
      <div
        style={{
          height: 35,
          display: 'flex',
          gap: 5,
          alignItems: 'center',
          color: 'var(--titleColor)',
        }}
      >
        <Popover.Root
          onOpenChange={() => {
            setOpen(!open);
          }}
          open={open}
        >
          <Popover.Trigger asChild>
            <Button aria-label="Filter" style={{ marginLeft: 3 }}>
              <MixerVerticalIcon width={18} height={18} />
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
              <Submit
                onClick={() => {
                  setOpen(false);
                }}
              >
                Done
              </Submit>
              <PopoverClose aria-label="Close">
                <Cross2Icon />
              </PopoverClose>
              <PopoverArrow />
            </PopoverContent>
          </Popover.Portal>
        </Popover.Root>
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              minWidth: '6.5ch',
              whiteSpace: 'nowrap',
              fontVariantNumeric: 'tabular-nums',
              color: 'var(--color)',
              fontSize: '12px',
              opacity: 1,
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
                fontSize: '12px',
                height: 30,
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
              <span style={{ display: 'flex', padding: '0px 3px' }}>
                <Cross2Icon style={{ margin: 'auto' }} />
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
