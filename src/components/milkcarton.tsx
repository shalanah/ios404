/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 milkcartons-noart.glb 
*/

import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import {
  type Object3DEventMap,
  type BufferGeometry,
  type Object3D,
} from 'three';
import useDarkMode from '../hooks/useDarkMode';

const textureUrlLight = '/milkcarton-texture-bake-light5.jpg';
const textureUrlDark = '/milkcarton-texture-bake-dark8.jpg';

export const cartonSide = 50; // distance to edge of carton - from Blender model
export const cartonHeight = 172; // height of carton - from Blender model

type MilkCartonNodes = {
  nodes: {
    carton: Object3D<Object3DEventMap> & { geometry: BufferGeometry };
    ground: Object3D<Object3DEventMap> & { geometry: BufferGeometry };
  };
};

export const Model = () => {
  const { isDarkMode } = useDarkMode();
  const scene = useGLTF('/milkcartons-noart.glb');
  const nodes = scene.nodes as MilkCartonNodes['nodes'];
  // @ts-ignore
  nodes.carton.geometry.attributes.uv = nodes.carton.geometry.attributes.uv1; // overwrite pme iv fpr now
  return (
    <group dispose={null}>
      {isDarkMode ? <ModelDark nodes={nodes} /> : <ModelLight nodes={nodes} />}
    </group>
  );
};

const ModelDark = ({ nodes }: MilkCartonNodes) => {
  const bakedTextureDark = useTexture(textureUrlDark);
  return (
    <>
      <mesh geometry={nodes.carton.geometry}>
        <meshBasicMaterial
          map={bakedTextureDark}
          map-flipY={false}
          transparent={false}
        />
      </mesh>
      <mesh geometry={nodes.ground.geometry}>
        <meshBasicMaterial
          map={bakedTextureDark}
          map-flipY={false}
          transparent={true}
        />
      </mesh>
    </>
  );
};

const ModelLight = ({ nodes }: MilkCartonNodes) => {
  const bakedTextureLight = useTexture(textureUrlLight);
  return (
    <>
      <mesh geometry={nodes.carton.geometry}>
        <meshBasicMaterial
          map={bakedTextureLight}
          map-flipY={false}
          transparent={false}
        />
      </mesh>
      <mesh geometry={nodes.ground.geometry}>
        <meshBasicMaterial
          map={bakedTextureLight}
          map-flipY={false}
          transparent={true}
        />
      </mesh>
    </>
  );
};

useTexture.preload(textureUrlLight);
useTexture.preload(textureUrlDark);
useGLTF.preload('/milkcartons-noart.glb');
