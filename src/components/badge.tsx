import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
  height: 28px;
  border-radius: 20px;
  font-size: 0.7rem;
  width: 5.25ch;
  text-align: center;
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  transition: 0.2s;
  background: var(--badgeBgNonActive);
  color: var(--badgeFgNonActive);
  border: 1px solid var(--badgeBorderNonActive);
  &.active {
    background: var(--badgeBg);
    color: var(--badgeFg);
    border: 1px solid var(--badgeBorder);
  }
`;

export const Badge = ({
  active = false,
  children,
  style,
}: {
  active?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <Span className={active ? 'active' : ''} style={style || {}}>
      {children}
    </Span>
  );
};
