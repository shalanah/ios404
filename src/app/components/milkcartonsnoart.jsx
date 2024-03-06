/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 milkcartons-noart.glb 
*/

import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';

// const textureUrl = '/milkcarton-texture-bake-light2.png';
const textureUrl = '/milkcarton-texture-bake-dark.png';

export const Model = (props) => {
  const { nodes } = useGLTF('/milkcartons-noart.glb');
  const bakedTexture = useTexture(textureUrl);
  nodes.carton.geometry.attributes.uv = nodes.carton.geometry.attributes.uv1; // overwrite pme iv fpr now
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.carton.geometry}>
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>
      <mesh geometry={nodes.ground.geometry}>
        <meshBasicMaterial
          map={bakedTexture}
          map-flipY={false}
          transparent={true}
        />
      </mesh>
    </group>
  );
};

useTexture.preload(textureUrl);
useGLTF.preload('/milkcartons-noart.glb');
