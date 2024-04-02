import { Vector3 } from 'three';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { cartonHeight, cartonSide } from './milkcarton';
import useCanIUseContext from '@/hooks/useCanIUseContext';
import { a, SpringProps, useSpring } from '@react-spring/three';
import { scaleOpts } from './links';
import usePrevious from '../hooks/usePrevious';

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

const startCameraPos = new Vector3(0, -30, 254);
const endCameraPos = new Vector3(0, 0, 254);

export const VerticalCenterWithMargin = ({ children = null }: Props) => {
  const { setPaginationHeight, paginationHeight, verticalView, scale } =
    useCanIUseContext();
  const { camera, size } = useThree();
  const prevScale = usePrevious(scale);

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

  const animatingCamera = useRef<null | number>(null);
  useFrame(({ clock: { elapsedTime } }) => {
    // TODO: Use useSpring here too somehow... look at lower level options to use same lerping
    if (prevScale !== scale) {
      if (animatingCamera.current === null) {
        animatingCamera.current = elapsedTime;
      }
      const max = 0.3;
      const delta = elapsedTime - animatingCamera.current;
      const animationComplete = delta > max;
      const cameraPos = camera.position;
      const percent =
        ((scale - scaleOpts.min) * 2) / (scaleOpts.max - scaleOpts.min); // let's make it lerp faster 2x
      const newPosition = startCameraPos
        .clone()
        .lerp(endCameraPos, Math.min(percent, 1));
      if (!newPosition.equals(cameraPos)) {
        camera.position.copy(
          cameraPos
            .clone()
            .lerp(newPosition, animationComplete ? 1 : delta / max)
        );
        camera.lookAt(0, 0, 0);
      }
    } else {
      animatingCamera.current = null;
    }
  });

  return <a.group {...(spring as SpringProps)}>{children}</a.group>;
};
