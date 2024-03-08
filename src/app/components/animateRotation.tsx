import { useEffect } from 'react';
import { a, useSpring } from '@react-spring/three';

export type AnimateRotationProps = {
  rotation?: [number, number, number];
  config?: any;
  children?: React.ReactNode;
};

export default function AnimateRotation({
  children,
  rotation = [0, 0, 0],
  config = { mass: 1, tension: 170, friction: 26 },
}: AnimateRotationProps) {
  const [spring, api] = useSpring(() => ({
    rotation,
    config,
  }));
  useEffect(() => void api.start({ rotation, config }));
  return <a.group {...(spring as any)}>{children}</a.group>;
}
