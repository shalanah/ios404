import { Box3, Vector3, Group } from 'three';
import React from 'react';
import { useThree } from '@react-three/fiber';
import { cartonSide } from './milkcarton';
import useCanIUseContext from '@/hooks/useCanIUseContext';

// This is a modified version of the Center component from @react-three/drei

type Props = {
  /** See https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject */
  precise?: boolean;
  /** Optional cacheKey to keep the component from recalculating on every render */
  cacheKey?: any;
  minMargin?: number;
  children?: React.ReactNode;
};

export const VerticalCenterWithMargin = ({
  precise = true,
  cacheKey = 0,
  children = null,
}: Props) => {
  const { setPaginationHeight, paginationHeight, verticalView } =
    useCanIUseContext();
  const outer = React.useRef<Group>(null!);
  const inner = React.useRef<Group>(null!);
  const { camera, size } = useThree();
  React.useLayoutEffect(() => {
    outer.current.matrixWorld.identity();
    const box3 = new Box3().setFromObject(inner.current, precise);
    const center = new Vector3();
    box3.getCenter(center);
    const verticalOffset = verticalView ? 10 : 3; // visual centering top part of milk carton less important + recedes

    // pixel position of bottom of carton
    const cartonBottomPos = new Vector3(
      0,
      -center.y + verticalOffset,
      cartonSide
    );
    const mouseCoords = cartonBottomPos.project(camera);
    const margin = Math.round(((mouseCoords.y + 1) / 2) * size.height);
    if (margin !== paginationHeight) {
      setPaginationHeight(margin);
    }

    outer.current.position.set(0, -center.y + verticalOffset, 0);
  }, [
    cacheKey,
    precise,
    camera,
    size,
    paginationHeight,
    setPaginationHeight,
    verticalView,
  ]);

  return (
    <group ref={outer}>
      <group ref={inner}>{children}</group>
    </group>
  );
};
