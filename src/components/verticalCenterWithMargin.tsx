import { Vector3 } from 'three';
import React, { useEffect, useLayoutEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { cartonHeight, cartonSide } from './milkcarton';
import useCanIUseContext from '@/hooks/useCanIUseContext';
import { a, SpringProps, useSpring } from '@react-spring/three';

type Props = {
  children?: React.ReactNode;
  scale?: number;
};

const getYPosition = (verticalView: boolean) => {
  const centerY = cartonHeight / 2;
  const verticalOffset = verticalView && window.innerHeight < 600 ? 10 : 0; // visual centering top part of milk carton less important + recedes

  return -centerY + verticalOffset;
};

// const config = { mass: 0.05, tension: 600, friction: 40 };
const config = {
  mass: 0.25,
  tension: 800,
  friction: 30,
};

export const VerticalCenterWithMargin = ({ children = null }: Props) => {
  const { setPaginationHeight, paginationHeight, verticalView, scale } =
    useCanIUseContext();
  const { camera, size } = useThree();

  const y = getYPosition(verticalView);
  const position = [0, y, -cartonSide * (scale - 1)];

  const [spring, api] = useSpring(() => ({
    scale,
    position,
    config,
  }));
  useEffect(() => {
    api.start({
      scale,
      position,
      config,
    });
  }, [api, scale, position, config]);

  useLayoutEffect(() => {
    const cartonBottomPos = new Vector3(0, y, cartonSide);
    const mouseCoords = cartonBottomPos.project(camera); // help figure out how much pagination space we have
    const margin = Math.round(((mouseCoords.y + 1) / 2) * size.height);
    if (margin !== paginationHeight) {
      setPaginationHeight(margin);
    }
  }, [y, camera, size, paginationHeight, setPaginationHeight]);

  return (
    <a.group
      {...(spring as SpringProps)}
      // scale={scale}
      // // @ts-ignore
      // position={position}
    >
      {children}
    </a.group>
  );
};
