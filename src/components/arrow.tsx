import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
  opacity: 1;
  transform-origin: center;
  border: 2px solid var(--titleFg);
  border-bottom: none;
  border-right: none;
`;

export const Arrow = ({
  size = 15,
  left = false,
  right = false,
}: {
  size?: number;
  left?: boolean;
  right?: boolean;
}) => {
  let isLeft = left !== undefined ? left : right === false;
  return (
    <Span
      style={{
        width: size,
        height: size,
        transform: `translateX(${isLeft ? 3 : -3}px) rotate(${
          isLeft ? -45 : 135
        }deg) `,
      }}
    />
  );
};
