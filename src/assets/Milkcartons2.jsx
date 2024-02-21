/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 milkcartons2.glb 
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
  const { nodes, materials } = useGLTF('/milkcartons2.glb');
  return (
    <mesh {...props} geometry={nodes['3'].geometry}>
      <meshStandardMaterial />
    </mesh>
  );
}

useGLTF.preload('/milkcartons2.glb');
