import React, { useRef, useState } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DialogClose, DialogContent, DialogOverlay } from './dialogStyles';
import * as Dialog from '@radix-ui/react-dialog';
// import { FilterModalContent } from './filterModalContent';

export const FilterModal = ({
  button,
  children,
}: {
  button: React.ReactNode;
  children: React.ReactElement;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild ref={ref} onClick={() => setOpen(!open)}>
        {button}
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent
          style={{ width: 280 }}
          onEscapeKeyDown={() => setOpen(false)}
          onPointerDownOutside={(e) => {
            if (
              e.target &&
              (e.target as HTMLElement).closest('button') !== ref.current
            )
              setOpen(false);
          }}
        >
          {React.cloneElement(children, { onClose: () => setOpen(false) })}
          {/* <FilterModalContent onClose={() => setOpen(false)} /> */}
          <DialogClose onClick={() => setOpen(false)}>
            <Cross2Icon />
          </DialogClose>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
