import React, { useEffect, useId, useRef, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { MixerVerticalIcon, Cross2Icon } from '@radix-ui/react-icons';
import useCanIUseContext from '../hooks/useCanIUseContext';
import styled from 'styled-components';

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
  .PopoverArrow {
    fill: var(--modalBg);
  }
  .PopoverClose {
    font-family: inherit;
    border-radius: 100%;
    height: 25px;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: orange;
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .PopoverClose:hover {
    background-color: green;
  }
  .PopoverClose:focus {
    box-shadow: 0 0 0 2px yellow;
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
  const toggleAllId = useId();
  const ref = useRef<HTMLInputElement>(null);
  const len = Object.keys(nonEmptyStatusFilters).length;
  const numChecked = Object.values(nonEmptyStatusFilters).filter(
    (v) => v
  ).length;
  const notAllChecked = numChecked !== len && numChecked > 0;
  const allChecked = numChecked === len;
  const checked = allChecked || (numChecked < len / 2 && numChecked > 0);

  let count =
    filteredData.length === iOSLacking.length
      ? `${iOSLacking.length} missing features`
      : `${filteredData.length} found of ${iOSLacking.length}`;
  if (filteredData.length === 0) count = 'No matches';

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = notAllChecked;
  }, [notAllChecked, ref]);

  return (
    <div
      style={{
        height: 35,
        marginTop: 10,
        display: 'flex',
        gap: 5,
        alignItems: 'center',
        marginBottom: 20,
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
            <div>Filter by Spec</div>
            <div>
              <input
                ref={ref}
                id={toggleAllId}
                type="checkbox"
                checked={checked}
                onChange={() => {
                  setFilters((prev: any) => {
                    return {
                      ...prev,
                      statuses: Object.fromEntries(
                        Object.keys(prev.statuses).map((k) => [k, !checked])
                      ),
                    };
                  });
                }}
              />
              <label style={{ marginLeft: 5 }} htmlFor={toggleAllId}>
                {'All specifications'}
              </label>
            </div>
            {Object.entries(statusCounts).map(([k, v]) => {
              if (v === 0) return null;
              const checked = filters.statuses[k];
              return (
                <div key={k}>
                  <input
                    id={k}
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      setFilters((prev: any) => {
                        return {
                          ...prev,
                          statuses: {
                            ...prev.statuses,
                            [k]: e.target.checked,
                          },
                        };
                      });
                    }}
                  />
                  <label style={{ marginLeft: 5 }} htmlFor={k}>
                    {statuses[k]} ({v})
                  </label>
                </div>
              );
            })}
            <Popover.Close className={'PopoverClose'} aria-label="Close">
              <Cross2Icon />
            </Popover.Close>
            <Popover.Arrow className={'PopoverArrow'} />
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
