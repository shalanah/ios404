import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import styled from 'styled-components';
import { DialogClose, DialogContent, DialogOverlay } from './dialogStyles';
import useCanIUseContext from '../hooks/useCanIUseContext';

const Div = styled.div`
  * {
    margin-bottom: 0.5rem;
  }
  *:last-child {
    margin-bottom: 0;
  }
  h2 {
    font-size: 1.1rem;
    font-weight: 600;
  }
  p {
    font-size: 0.9rem;
  }
`;

export const ErrorModal = () => {
  const { hasError, canIUseDataUpdated, setHasError } = useCanIUseContext();

  if (!hasError) return null;

  const date = canIUseDataUpdated
    ? new Date(canIUseDataUpdated * 1000).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'unknown';
  return (
    <Dialog.Root
      open={hasError}
      onOpenChange={(o) => {
        setHasError(false);
      }}
    >
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <Div>
            <h2>Using Fallback Data</h2>
            <p>There was an issue grabbing the latest caniuse.com data.</p>
            {canIUseDataUpdated && (
              <p>
                No worries, reverting to backup caniuse.com data from {date}.
              </p>
            )}
          </Div>
          <DialogClose>
            <Cross2Icon />
          </DialogClose>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
