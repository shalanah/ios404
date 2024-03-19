import React, { useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import styled from 'styled-components';
import { DialogClose, DialogContent, DialogOverlay } from './dialogStyles';
import useCanIUseContext from '../hooks/useCanIUseContext';

const Dl = styled.dl`
  a {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  dt {
    color: var(--titleColor);
    line-height: 1.2;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 10px;
  }
  dd {
    line-height: 1.6;
    font-size: 0.9rem;
    margin-bottom: 25px;
  }
  dd:last-child {
    margin-bottom: 0px;
  }
`;

export const ErrorModal = ({ button }: { button: React.ReactNode }) => {
  const { hasError, canIUseData } = useCanIUseContext();
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (hasError && !open) setOpen(true);
  }, [hasError, open]);

  if (!(hasError && canIUseData && open)) return null;
  const date = new Date(canIUseData?.updated).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <Dialog.Root
      onOpenChange={(o) => {
        setOpen(o);
      }}
    >
      <Dialog.Trigger asChild>{button}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <div>
            <h2>Oooops</h2>
            <p>
              Looks like there was an issue grabbing the latest caniuse.com
              data. No worries, we will revert to saved caniuse.com data from
              {date}.
            </p>
          </div>
          <DialogClose>
            <Cross2Icon />
          </DialogClose>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
