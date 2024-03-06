import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { MixerVerticalIcon, Cross2Icon } from '@radix-ui/react-icons';
import styles from './filters.module.css';
import useCanIUseContext from '../hooks/useCanIUseContext';

export const Filters = () => {
  const { statusCounts, statuses, filters, setFilters } = useCanIUseContext();
  return (
    <Popover.Root>
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
              id={'all'}
              type="checkbox"
              checked={true}
              onChange={(e) => {
                // setFilters((prev: any) => {
                //   return {
                //     ...prev,
                //     statuses: { ...prev.statuses, [k]: e.target.checked },
                //   };
                // });
              }}
            />
            <label style={{ marginLeft: 5 }} htmlFor={'all'}>
              Hide all
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
                        statuses: { ...prev.statuses, [k]: e.target.checked },
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
  );
};
