import React, { use, useEffect, useId, useRef, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { MixerVerticalIcon, Cross2Icon } from '@radix-ui/react-icons';
import styles from './filters.module.css';
import useCanIUseContext from '../hooks/useCanIUseContext';

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

  console.log({ notAllChecked, allChecked, nonEmptyStatusFilters });

  let count =
    filteredData.length === iOSLacking.length
      ? `${iOSLacking.length} features total`
      : `${filteredData.length} found of ${iOSLacking.length}`;
  if (filteredData.length === 0) count = 'No matches';

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = notAllChecked;
  }, [notAllChecked, ref]);

  return (
    <div
      style={{
        marginTop: 30,
        display: 'flex',
        gap: 5,
        alignItems: 'center',
      }}
    >
      <Popover.Root
        modal
        onOpenChange={(change) => setOpen(change)}
        open={open}
      >
        <Popover.Trigger asChild>
          <button className={styles.IconButton} aria-label="Update dimensions">
            <MixerVerticalIcon />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className={styles.PopoverContent} sideOffset={5}>
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
            <Popover.Close className={styles.PopoverClose} aria-label="Close">
              <Cross2Icon />
            </Popover.Close>
            <Popover.Arrow className={styles.PopoverArrow} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <div
        style={{
          width: '12ch',
          marginLeft: 5,
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
