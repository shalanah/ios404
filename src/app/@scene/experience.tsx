import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Mesh } from 'three';
import { OrbitControls, Html } from '@react-three/drei';
import { useControls } from 'leva';

export default function Experience() {
  const ref = useRef<Mesh>(null!);
  // useFrame((state, delta) => {
  //   ref.current.rotation.x = ref.current.rotation.y += delta;
  // });
  const controls = useControls({
    htmlPosition: {
      value: [0.01, 0, 0],
      label: 'HTML Position',
    },
  });

  return (
    <>
      <OrbitControls enableDamping />
      <mesh ref={ref}>
        <torusKnotGeometry />
        <meshNormalMaterial />
      </mesh>
      <Html
        center
        wrapperClass="wrapper"
        distanceFactor={10}
        position={controls.htmlPosition}
      >
        Test
      </Html>
    </>
  );
}
