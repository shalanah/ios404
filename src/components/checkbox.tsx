import React, { useId } from 'react';
import { CheckIcon, MinusIcon } from '@radix-ui/react-icons';
import styled from 'styled-components';
import * as CB from '@radix-ui/react-checkbox';

const CheckboxRoot = styled(CB.Root)`
  box-sizing: border-box;
  flex-shrink: 0;
  background-color: var(--radioBg);
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  border: 1px solid var(--radioOutline);
  transition: 0.1s;
  &[aria-checked='false'] {
    background-color: var(--radioEmptyBg);
  }
  &:hover {
    transform: scale(1);
    cursor: pointer;
  }
`;

const CheckboxIndicator = styled(CB.Indicator)`
  svg {
    color: var(--radioFg);
    animation: 0.1s slideUpAndFadeMore;
    * {
      stroke: currentColor;
      stroke-width: 0.5px;
    }
  }
`;

const Div = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  label {
    width: 100%;
    padding: 2px 0px;
    font-size: 0.95rem; // TODO: double check this doesn't do the weird zoomy thing in iOS
    line-height: 1.1;
    @media (max-width: 768px) {
      font-size: 1rem;
      padding: 4px 0px;
    }
  }
`;

export const Checkbox = ({
  checked,
  indeterminate = false,
  onCheckedChange,
  children,
  switchOrder,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: React.ReactNode;
  switchOrder?: boolean;
}) => {
  const id = useId();

  return (
    <Div
      style={
        switchOrder
          ? { justifyContent: 'space-between', alignItems: 'center' }
          : {}
      }
    >
      <CheckboxRoot
        style={switchOrder ? { order: 2 } : {}}
        onCheckedChange={onCheckedChange}
        checked={indeterminate ? 'indeterminate' : checked}
        id={id}
      >
        <CheckboxIndicator key={`${indeterminate ? 'ind' : checked}`}>
          {indeterminate ? (
            <MinusIcon width={18} height={18} />
          ) : (
            <CheckIcon width={18} height={18} />
          )}
        </CheckboxIndicator>
      </CheckboxRoot>
      <label htmlFor={id}>{children}</label>
    </Div>
  );
};
