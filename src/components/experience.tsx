import { Suspense, useEffect, useRef } from 'react';
import { Center } from '@react-three/drei';
import { Model } from './milkcarton';
import { MilkCartonText } from './milkcartontext';
import useCanIUseContext from '../hooks/useCanIUseContext';
import usePrevious from '../hooks/usePrevious';
import { a, useSpring } from '@react-spring/three';
import { useDrag } from '@use-gesture/react';
import { Html } from '@react-three/drei';
import styled from 'styled-components';
import { Arrow } from './arrow';

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  color: var(--color);
  flex-shrink: 0;
  &:focus {
    outline: 2.5px dotted currentColor;
  }
`;

const config = { mass: 0.05, tension: 600, friction: 40 };
export default function Experience() {
  const { activeIndex, iOSMissingFeatures, setNextFeature, filteredData } =
    useCanIUseContext();
  const len = iOSMissingFeatures.length;
  const filteredLen = filteredData.length;
  const turns = useRef(0);
  const prevActiveIndex = usePrevious(activeIndex);
  // @ts-ignore
  const pos = filteredData.findIndex((v) => v.index === activeIndex); // actual position in list --- active index + prev active is out of the WHOLE non-filtered list
  // @ts-ignore
  const prevPos = filteredData.findIndex((v) => v.index === prevActiveIndex);

  if (activeIndex !== -1 && prevActiveIndex !== -1) {
    if (prevPos < pos) {
      const looping = pos === filteredLen - 1 && prevPos === 0;
      turns.current += looping ? -1 : 1;
    } else if (pos < prevPos) {
      const looping = pos === 0 && prevPos === filteredLen - 1;
      turns.current += looping ? 1 : -1;
    }
  }

  let mod = turns.current % 4;
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
  const rot = [0, (turns.current * -Math.PI) / 2 - Math.PI / 10, 0];
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
            rotation: [0, (turns.current * -Math.PI) / 2 - Math.PI / 10, 0],
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
    {
      axis: 'x',
      filterTaps: true,
    }
  );

  if (len === 0 || activeIndex === -1) return null;

  let countText =
    filteredLen && pos !== -1 ? (
      <>
        {pos + 1}&nbsp;&nbsp;/&nbsp;&nbsp;
        {filteredData.length}
      </>
    ) : (
      '' // couldn't find the active on in the filtered list
    );

  return (
    <>
      {/* <Perf position="top-right" /> */}
      <Suspense fallback={null}>
        <Center disableZ disableX>
          <a.group {...(spring as any)} {...bind()}>
            <Model />
            <MilkCartonText
              rotation={rotation}
              index={activeIndex}
              position={position}
              bind={bind}
            />
            <Html
              position={[0, -27, 0]}
              style={{
                width: '100%',
                position: 'absolute',
              }}
              center
            >
              <div
                style={{
                  touchAction: 'none',
                  gap: 20,
                }}
                className="d-flex pos-center align-items-center"
              >
                <Button
                  onClick={() =>
                    setNextFeature({ forwards: false, featureActive: false })
                  }
                  className="d-flex justify-content-center align-items-center justify-content-center"
                >
                  <Arrow left />
                  <span className="sr-only">previous</span>
                </Button>
                <span
                  style={{
                    fontSize: '.75rem',
                    whiteSpace: 'nowrap',
                    width: '6.5ch',
                    textAlign: 'center',
                    fontVariantNumeric: 'tabular-nums',
                    fontWeight: 500,
                  }}
                >
                  {countText}
                </span>
                <Button
                  className="d-flex justify-content-center align-items-center"
                  onClick={() =>
                    setNextFeature({ forwards: true, featureActive: false })
                  }
                >
                  <Arrow right />
                  <span className="sr-only">next</span>
                </Button>
              </div>
            </Html>
          </a.group>
        </Center>
      </Suspense>
    </>
  );
}
