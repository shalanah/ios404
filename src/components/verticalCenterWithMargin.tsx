import { Camera, Vector3 } from 'three';
import React, { useLayoutEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { cartonHeight, cartonSide } from './milkcarton';
import useCanIUseContext from '@/hooks/useCanIUseContext';
import { a, SpringProps, useSpring } from '@react-spring/three';
import { scaleOpts } from './links';

type Props = {
  children?: React.ReactNode;
};

const getYPosition = () =>
  // verticalView: boolean
  {
    const centerY = cartonHeight / 2;
    // visual centering top part of milk carton less important + recedes
    // const verticalOffset = verticalView && window.innerHeight < 600 ? 0 : 0;
    return -centerY + 0;
  };

const config = {
  mass: 0.25,
  tension: 800,
  friction: 30,
};

export const startCameraPosArray = [0, -30, 254] as const; // for around scale 1
const startCameraPos = new Vector3(0, -40, 254); // for scale .9
const endCameraPos = new Vector3(0, 0, 254);

const setCameraPosition = (camera: Camera, scale: number) => {
  const cameraPos = camera.position;
  const percent =
    ((scale - scaleOpts.min) * 1.5) / (scaleOpts.max - scaleOpts.min); // let's make it lerp faster 1.5x
  const newPosition = startCameraPos
    .clone()
    .lerp(endCameraPos, Math.min(percent, 1));
  if (!newPosition.equals(cameraPos)) {
    camera.position.copy(newPosition);
    camera.lookAt(0, 0, 0);
  }
};

export const VerticalCenterWithMargin = ({ children = null }: Props) => {
  const { setPaginationHeight, paginationHeight, verticalView, scale } =
    useCanIUseContext();
  const { camera, size } = useThree();

  const y = getYPosition(verticalView);
  const position = [0, y, -cartonSide * (scale - 1)];

  const [spring] = useSpring(
    () => ({
      scale,
      position,
      config,
      onChange: {
        scale: (v: number) => {
          setCameraPosition(camera, v);
        },
      },
    }),
    [scale, position, config]
  );

  useLayoutEffect(() => {
    // On first load set the camera position especially if we're not at scale 1
    setCameraPosition(camera, scale);
  }, []);

  // Get pagination space - static from scale 1 (will update though with window resize)
  useLayoutEffect(() => {
    const cartonBottomPos = new Vector3(0, y, cartonSide);
    const mouseCoords = cartonBottomPos.project(camera); // help figure out how much pagination space we have
    const margin = Math.round(((mouseCoords.y + 1) / 2) * size.height);
    if (margin !== paginationHeight) {
      setPaginationHeight(margin);
    }
  }, [y, camera, size, paginationHeight, setPaginationHeight]);

  return <a.group {...(spring as SpringProps)}>{children}</a.group>;
};
