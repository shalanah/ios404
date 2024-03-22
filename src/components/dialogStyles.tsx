import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';

export const DialogClose = styled(Dialog.Close)`
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: 0.2s;
  outline: 1px solid transparent;
  z-index: 2;
  &:hover {
    outline: 1px solid currentColor;
  }
`;

export const DialogContentClassName = 'dialog-content';
export const DialogContent = styled(Dialog.Content).attrs((p) => ({
  className: DialogContentClassName,
}))`
  text-align: left;
  background-color: var(--modalBg);
  border-radius: 22px;
  box-shadow: var(--modalShadow) 0px 10px 38px -10px,
    var(--modalShadow) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  overflow: auto;
  z-index: 4;
  &:focus {
    outline: 2px dotted var(--color);
    outline-offset: 2px;
  }
`;
export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: var(--black-a9);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;
