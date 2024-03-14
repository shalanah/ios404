'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Center } from '@react-three/drei';
// import { Perf } from 'r3f-perf';
import { Model } from './milkcarton';
import { Text } from './text';
import useCanIUseContext from '../hooks/useCanIUseContext';
import usePrevious from '../hooks/usePrevious';
import { Perf } from 'r3f-perf';
import { a, useSpring } from '@react-spring/three';
import { useDrag } from '@use-gesture/react';
import { Html } from '@react-three/drei';
import styled from 'styled-components';

const HTML = styled(Html)`
  touch-action: none;
  pointer-events: none;
  * {
    touch-action: none;
  }
`;

const config = { mass: 0.05, tension: 600, friction: 40 };
export default function Experience() {
  const { activeIndex, iOSLacking, setNextFeature, filteredData } =
    useCanIUseContext();
  const len = iOSLacking.length;
  const quarterTurns = useRef(0);
  const prevActiveIndex = usePrevious(activeIndex);

  if (prevActiveIndex < activeIndex) {
    if (activeIndex === len - 1 && prevActiveIndex === 0) {
      quarterTurns.current -= 1;
    } else {
      quarterTurns.current += 1;
    }
  } else if (prevActiveIndex > activeIndex) {
    if (activeIndex === 0 && prevActiveIndex === len - 1) {
      quarterTurns.current += 1;
    } else {
      quarterTurns.current -= 1;
    }
  }

  let mod = quarterTurns.current % 4;
  if (mod < 0) mod += 4;

  let position = [0.1, 58, 51];
  let rotation = [0, 0, 0];
  switch (mod) {
    case 0:
      position = [0.1, 58, 51];
      rotation = [0, 0, 0];
      break;
    case 1:
      position = [51, 58, 0.1];
      rotation = [0, Math.PI / 2, 0];
      break;
    case 2:
      position = [0.1, 58, -51];
      rotation = [0, Math.PI, 0];
      break;
    case 3:
      position = [-51, 58, 0.1];
      rotation = [0, (Math.PI * 3) / 2, 0];
      break;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rot = [0, (quarterTurns.current * -Math.PI) / 2 - Math.PI / 10, 0];
  const [spring, api] = useSpring(() => ({
    rotation: rot,
    config,
  }));

  useEffect(() => {
    api.start({
      rotation: rot,
      config,
    });
  }, [api, rot]);

  const bind = useDrag(
    ({ movement: [mx], last }) => {
      const value = Math.min(Math.abs(mx), 44.5); // clamping...
      const sign = Math.sign(mx);
      if (last) {
        if (value > 35 && filteredData.length > 1) {
          setNextFeature({ forwards: sign === -1 });
          return;
        } else {
          api.start({
            rotation: [
              0,
              (quarterTurns.current * -Math.PI) / 2 - Math.PI / 10,
              0,
            ],
            config,
          });
          return;
        }
      }
      api.start({
        rotation: [
          rot[0],
          rot[1] + (Math.PI / (360 * 2)) * value * sign,
          rot[2],
        ],
        config,
      });
    },
    { axis: 'x' }
  );

  if (len === 0 || activeIndex === -1) return null;

  return (
    <>
      {/* <Perf position="top-right" /> */}
      <Suspense fallback={null}>
        <Center disableZ disableX>
          <a.group {...(spring as any)} {...bind()}>
            <Model></Model>
            <Text rotation={rotation} index={activeIndex} position={position} />
            <HTML position={[0, -20, 0]}>
              <div style={{ touchAction: 'none' }}>
                <button>previous</button>
                <button>next</button>
              </div>
            </HTML>
          </a.group>
        </Center>
      </Suspense>
    </>
  );
}
