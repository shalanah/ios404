import React, { useEffect, useRef, useState } from 'react';
import { MixerVerticalIcon, Cross2Icon } from '@radix-ui/react-icons';
import useCanIUseContext from '../hooks/useCanIUseContext';
import styled from 'styled-components';
import { DialogClose, DialogContent, DialogOverlay } from './dialogStyles';
import * as Dialog from '@radix-ui/react-dialog';
import { FilterContent } from './filterContent';

const Button = styled.button`
  border-radius: 10px;
  height: 36px;
  width: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color);
  margin-left: -8px;
  flex-shrink: 0;
  transition: 0.15s;
  &:hover {
    transition: 0.15s;
    transform: scale(1);
    background: var(--modalBg);
  }
`;

const ClearButton = styled.button`
  transition: 0.15s;
  &:hover {
    transform: scale(1);
    background: var(--modalBg);
  }
`;

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

export const Filter = () => {
  const {
    statusCounts,
    filters,
    setFilters,
    iOSLacking,
    filteredData,
    loading,
  } = useCanIUseContext();
  const nonEmptyStatusFilters = Object.fromEntries(
    Object.entries(filters.statuses).filter(([k, _]) => {
      return statusCounts[k] > 0;
    })
  );
  const ref = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const len = Object.keys(nonEmptyStatusFilters).length;
  const numChecked = Object.values(nonEmptyStatusFilters).filter(
    (v) => v
  ).length;
  const allChecked = numChecked === len;

  let count =
    filteredData.length === iOSLacking.length
      ? `${iOSLacking.length} features`
      : `${filteredData.length} features`;
  if (loading) {
    count = 'Loading...';
  }

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

  const filteredTotal = (
    iOSLacking.filter(
      (
        // @ts-ignore
        v
      ) => {
        return filters.statuses[v?.status];
      }
    ) || []
  ).length;

  return (
    <div
      style={{
        height: 35,
        display: 'flex',
        gap: 5,
        alignItems: 'center',
        color: 'var(--titleColor)',
      }}
    >
      <Dialog.Root open={open}>
        <Dialog.Trigger asChild>
          <Button
            ref={ref}
            aria-label="Filter"
            style={{ marginLeft: 4 }}
            onClick={() => setOpen(!open)}
          >
            <MixerVerticalIcon width={22} height={22} />
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <DialogOverlay />
          <DialogContent
            onEscapeKeyDown={() => setOpen(false)}
            style={{ width: 280 }}
            onPointerDownOutside={(e) => {
              if (
                e.target &&
                (e.target as HTMLElement).closest('button') !== ref.current
              )
                setOpen(false);
            }}
          >
            <FilterContent />
            <Submit
              onClick={() => {
                setOpen(false);
              }}
            >
              Close{' '}
              <span style={{ fontSize: '.8em' }}>
                Matches {filteredTotal}{' '}
                {filteredTotal === 1 ? 'feature' : 'features'}
              </span>
            </Submit>
            <DialogClose onClick={() => setOpen(false)}>
              <Cross2Icon />
            </DialogClose>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
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
            fontSize: '14px',
            opacity: 1,
          }}
        >
          {count}
        </div>
        {!allChecked && (
          <ClearButton
            style={{
              display: 'flex',
              gap: 5,
              height: 36,
              alignItems: 'center',
              borderRadius: 10,
              fontSize: '12px',
              padding: '0 10px 0 15px',
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
          </ClearButton>
        )}
      </div>
    </div>
  );
};
