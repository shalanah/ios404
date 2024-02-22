// @ts-nocheck

'use client';

import { useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import { Mesh } from 'three';
import * as THREE from 'three';
import {
  OrbitControls,
  Html,
  Center,
  Stage,
  Backdrop,
} from '@react-three/drei';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Model } from '../../assets/Milkcartons4';

const bg = '#f4eee0'; //'#f4f0e0'; //'#f4f2e0'; //'#fffef4';

export default function Experience() {
  const ref = useRef<Mesh>(null!);
  // useFrame((state, delta) => {
  //   ref.current.rotation.x = ref.current.rotation.y += delta;
  // });
  const controls = useControls({
    htmlPosition: {
      value: [0.01, 58, 50.01],
      label: 'HTML Position',
    },
  });

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls
        enableDamping
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.55}
      />
      <axesHelper args={[200]} renderOrder={10} />
      <color attach="background" args={[bg]} />
      <Suspense fallback={null}>
        <Stage
          adjustCamera={1.5}
          // shadows={{
          //   type: 'accumulative',
          //   color: bg,
          //   frames: 1000,
          //   opacity: 0.7,
          // }}
          intensity={0.51}
          environment="city"
        >
          <Model castShadow receiveShadow>
            <meshStandardMaterial color={'#f7e7c0'} />
          </Model>
          <Html
            transform
            wrapperClass="wrapper"
            distanceFactor={10}
            position={controls.htmlPosition}
            occlude={'raycast'}
            // side={THREE.FrontSide} // Required
          >
            <div
              style={{
                pointerEvents: 'none',
                width: 1000,
                height: 1150,
                scale: 4,
                position: 'relative',
              }}
            >
              <svg viewBox="0 0 4000 4600">
                <rect
                  x="200"
                  y="200"
                  width="3600"
                  height="4200"
                  fill={'transparent'}
                  strokeWidth={80}
                  stroke={'#000'}
                />
              </svg>

              <div
                style={{
                  position: 'absolute',
                  top: 70,
                  fontSize: 38,
                  lineHeight: '40px',
                  width: '80%',
                  left: '10%',
                  fontWeight: 'bold',
                  textAlign: 'left',
                  textTransform: 'uppercase',
                }}
              >
                <div
                  style={{
                    fontSize: 150,
                    textTransform: 'uppercase',
                    lineHeight: 1,
                    marginBottom: 20,
                    textAlign: 'center',
                  }}
                >
                  Missing
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: 20,
                    alignItems: 'flex-start',
                    marginBottom: 30,
                  }}
                >
                  <div
                    style={{
                      flex: '430px',
                      flexShrink: 0,
                      background: '#000',
                      aspectRatio: '1/1',
                    }}
                  />

                  <div>
                    <div style={{ fontSize: 50, marginBottom: 15 }}>
                      Vibration API
                    </div>
                    <div>
                      Born: 2015 Chrome 125
                      <br />
                      Group: WGA sdfkjlskdfj
                      <br /> Last seen: Chrome Android, Native iOS Apps
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'left', textTransform: 'none' }}>
                  Vibration API knew how to make you feel loved. It was a simple
                  API to provide gamers and users haptic feedback. Last seen on
                  Android Chrome and in native apps. We never saw them again
                  after they chatted with iOS Webkit. We are all very worried.
                  Game controllers have reached out to express their distress
                  and dismay at the disappearance of their close friend.
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 100,
                  fontSize: 32,
                  lineHeight: '40px',
                  width: '80%',
                  left: '10%',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                If you have any information regarding this feature, please
                contact caniuse.com.
              </div>
            </div>
          </Html>
        </Stage>
      </Suspense>
    </>
  );
}
