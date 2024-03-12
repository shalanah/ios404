import React, { useId } from 'react';
import { CheckIcon, MinusIcon } from '@radix-ui/react-icons';
import styled from 'styled-components';
import * as CB from '@radix-ui/react-checkbox';

const CheckboxRoot = styled(CB.Root)`
  box-sizing: border-box;
  flex-shrink: 0;
  background-color: var(--radioBg);
  width: 20px;
  height: 20px;
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
  &:focus {
    outline: 2px dotted currentColor;
    outline-offset: 2px;
  }
`;

const CheckboxIndicator = styled(CB.Indicator)`
  svg {
    color: var(--radioColor);
    animation: 0.1s slideUpAndFadeMore;
  }
`;

const Div = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  label {
    width: 100%;
    padding: 5px 0px;
    font-size: 0.9rem; // TODO: double check this doesn't do the weird zoomy thing in iOS
    line-height: 1.1;
  }
`;

export const Checkbox = ({
  checked,
  indeterminate,
  onCheckedChange,
  children,
  switchOrder,
}: {
  checked: boolean;
  indeterminate: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: React.ReactNode;
  switchOrder?: boolean;
}) => {
  const id = useId();

  return (
    <Div style={switchOrder ? { justifyContent: 'space-between' } : {}}>
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
