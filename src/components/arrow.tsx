import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
  width: 15px;
  height: 15px;
  opacity: 1;
  transform-origin: center;
  border: 2px solid var(--titleColor);
  border-bottom: none;
  border-right: none;
`;

export const Arrow = ({
  left = false,
  right = false,
}: {
  left?: boolean;
  right?: boolean;
}) => {
  let isLeft = left !== undefined ? left : right === false;
  return (
    <Span
      style={{
        transform: `translateX(${isLeft ? 3 : -3}px) rotate(${
          isLeft ? -45 : 135
        }deg) `,
      }}
    />
  );
};
