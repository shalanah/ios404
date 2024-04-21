import { Suspense, useCallback, useEffect, useMemo, useRef } from 'react';
import { cartonSide, Model } from './milkcarton';
import { Text } from './text';
import useMainContext from '../hooks/useMainContext';
import { a, useSpring } from '@react-spring/three';
import { VerticalCenterWithMargin } from './verticalCenterWithMargin';
import { Plane } from '@react-three/drei';
import { clamp } from 'three/src/math/MathUtils.js';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { grabIgnoreClass } from '@/utils/constants';

const getTextRotationAndPosition = (
  turns: number
): {
  position: [number, number, number];
  rotation: [number, number, number];
} => {
  let mod = turns % 4;
  if (mod < 0) mod += 4;
  switch (mod) {
    case 0:
      return {
        position: [0.1, 58, 51],
        rotation: [0, 0, 0],
      };
    case 1:
      return {
        position: [51, 58, 0.1],
        rotation: [0, Math.PI / 2, 0],
      };

    case 2:
      return {
        position: [0.1, 58, -51],
        rotation: [0, Math.PI, 0],
      };
    default:
    case 3:
      return {
        position: [-51, 58, 0.1],
        rotation: [0, (Math.PI * 3) / 2, 0],
      };
  }
};

const maxPercent = 0.28;
const minPercent = -0.28;

const config = { mass: 0.05, tension: 600, friction: 40 };
export default function Experience() {
  const {
    setNextFeature,
    turns,
    missingFeatures,
    activeIndex,
    cartonInteractionMode,
    setCartonInteractionMode,
  } = useMainContext();
  const rot = useMemo(() => [0, (turns * -Math.PI) / 2, 0], [turns]);
  const len = missingFeatures.length;
  const [spring, api] = useSpring(
    () => ({
      rotation: rot,
      config,
    }),
    [rot]
  );

  const { camera, raycaster } = useThree();
  const ref = useRef<THREE.Mesh>();
  const mouseVector = useMemo(() => new THREE.Vector2(), []);

  // TODO: Do without a physical mesh next time
  const getLocalPoint = useCallback(
    (
      e: PointerEvent,
      rect: { left: number; top: number; width: number; height: number }
    ) => {
      if (!ref.current) return { x: 0, y: 0 };

      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseVector.set(x, y);
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(
        [ref.current as THREE.Mesh],
        true
      );
      if (intersects[0]) {
        const { object, point } = intersects[0];
        return object.worldToLocal(point.clone());
      }
      return { x: 0, y: 0 };
    },
    [mouseVector, raycaster, camera]
  );

  // Dragging the carton
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const getRect = () => {
      let { left, top, width, height } = canvas.getBoundingClientRect();
      return {
        left,
        top,
        width,
        height,
      };
    };
    let rect = getRect(); // get as needed + size changes
    const getRectSize = () => {
      rect = getRect();
    };

    let pt = { x: 0, y: 0 };
    let pointerDown = false;
    let isDragging = false;
    let clickedOnDragSection = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button === 2) return; // right click
      // If canvas click or our weird text on top of the canvas
      if (!e.target) return;
      if (
        (e.target as HTMLElement).closest('canvas') ||
        (e.target as HTMLElement).closest(`.${grabIgnoreClass}`)
      ) {
        pointerDown = true;
        pt = getLocalPoint(e, rect);
        isDragging = false;
      }
      const textSection =
        (
          (e.target as HTMLElement)!.closest('.selectable-text')?.textContent ||
          ''
        ).length > 0 && (e.target as HTMLElement)!.className !== 'sr-only';
      if (!textSection) {
        clickedOnDragSection = true;
      }
    };
    const onPointerUp = (e: PointerEvent) => {
      if (pointerDown && isDragging) {
        const localPoint = getLocalPoint(e, rect);
        const deltaX = localPoint.x - pt.x;
        const percent = clamp(deltaX / cartonSide, minPercent, maxPercent);
        if (percent > maxPercent * 0.85 || percent < minPercent * 0.85) {
          setNextFeature({
            forwards: percent < 0,
            action: 'swipe',
          });
        } else {
          api.start({ rotation: rot }); // back to the start
        }
      }
    };
    // prevent clicking on buttons and anchors if we have moved
    const onClick = (e: Event) => {
      if (isDragging && pointerDown) {
        e.preventDefault();
        e.stopPropagation();
        setCartonInteractionMode('grab'); // if it isn't already
        document.body.classList.remove('dragging-css');
      }
      // reset
      pt = { x: 0, y: 0 };
      pointerDown = false;
      isDragging = false;
      clickedOnDragSection = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (
        pointerDown &&
        (cartonInteractionMode !== 'text' ||
          (e.pointerType === 'touch' && document.getSelection()?.isCollapsed) ||
          (clickedOnDragSection && document.getSelection()?.isCollapsed)) // long press is the only way to select text
      ) {
        const localPoint = getLocalPoint(e, rect);
        const deltaX = localPoint.x - pt.x;
        const percent = clamp(deltaX / cartonSide, minPercent, maxPercent);
        const deltaRotation = percent * (Math.PI / 4);
        if (!isDragging && Math.abs(deltaRotation) > 0.01) {
          // clear selection
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
          }
          isDragging = true;
          document.body.classList.add('dragging-css');
        }
        api.start({
          rotation: [rot[0], rot[1] + deltaRotation, rot[2]],
        });
      }
    };
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('resize', getRectSize);
    document.addEventListener('pointercancel', onClick);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('resize', getRectSize);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointercancel', onClick);
      document.removeEventListener('click', onClick);
      document.body.classList.remove('dragging-css');
    };
  }, [
    getLocalPoint,
    api,
    cartonInteractionMode,
    rot,
    setNextFeature,
    setCartonInteractionMode,
  ]);

  // Allow double click to select text
  // Allow long press to select text
  useEffect(() => {
    if (cartonInteractionMode === 'text') return;
    let timer: number | null = null;
    let point = { x: 0, y: 0 };
    const onLongPress = (e: PointerEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);

      // If this element is a button or within a button -> let's exit
      if (el && (el as HTMLElement).closest('button')) return;

      const cartonTextEl = document.querySelector('.carton-text');
      if (cartonTextEl && el && cartonTextEl.contains(el)) {
        setCartonInteractionMode('text');
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
        }
        // select the text in the element
        const range = document.createRange();
        range.selectNodeContents(el);
        selection?.addRange(range);
      }
    };
    const onMover = (e: PointerEvent) => {
      if (Math.hypot(e.clientX - point.x, e.clientY - point.y) > 10) {
        cancelTimer();
      }
    };
    const cancelTimer = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      point = { x: e.clientX, y: e.clientY };
      cancelTimer();
      if (e.pointerType === 'mouse') return;
      timer = window.setTimeout(() => {
        onLongPress(e);
      }, 500);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointerup', cancelTimer);
    document.addEventListener('pointermove', onMover);

    const onDoubleClick = (e: MouseEvent) => {
      // get element at x y position of event
      const el = document.elementFromPoint(e.clientX, e.clientY);

      // If this element is a button or within a button -> let's exit
      if (el && (el as HTMLElement).closest('button')) return;

      const cartonTextEl = document.querySelector('.carton-text');
      if (cartonTextEl && el && cartonTextEl.contains(el)) {
        setCartonInteractionMode('text');
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
        }
        // select the text in the element
        const range = document.createRange();
        range.selectNodeContents(el);
        selection?.addRange(range);
      }
    };
    document.addEventListener('dblclick', onDoubleClick);
    return () => {
      document.removeEventListener('dblclick', onDoubleClick);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerup', cancelTimer);
      document.removeEventListener('pointermove', onMover);
    };
  }, [cartonInteractionMode, setCartonInteractionMode]);

  // Stop scrolling when selecting text
  useEffect(() => {
    if (cartonInteractionMode === 'text') {
      let pointDown = false;
      let cartonTextEl = document.querySelector('.carton-text');
      const onPointerDown = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        if (e.target && (e.target as HTMLElement).closest('.carton-text')) {
          pointDown = true;
        }
      };
      const onPointerMove = (e: PointerEvent) => {
        if (!pointDown) return;
        if (document.getSelection()?.isCollapsed) return;
        const selection = window.getSelection();
        // get start element and end element
        const startEl = selection?.anchorNode?.parentElement;
        const endEl = selection?.focusNode?.parentElement;
        if (!startEl || !endEl) return;

        if (!cartonTextEl) return;
        if (cartonTextEl.contains(startEl) && cartonTextEl.contains(endEl)) {
          e.preventDefault();
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
        }
      };

      const onPointerUp = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        pointDown = false;
        document.body.classList.remove('no-scroll');
      };
      document.addEventListener('pointerdown', onPointerDown);
      document.addEventListener('pointerup', onPointerUp);
      document.addEventListener('pointermove', onPointerMove);
      return () => {
        document.removeEventListener('pointerdown', onPointerDown);
        document.removeEventListener('pointerup', onPointerUp);
        document.removeEventListener('pointermove', onPointerMove);
        document.body.classList.remove('no-scroll');
        cartonTextEl = null;
      };
    }
  }, [cartonInteractionMode]);

  if (len === 0 || activeIndex === -1) return null;

  return (
    <>
      <Suspense fallback={null}>
        <VerticalCenterWithMargin>
          <a.group
            {...(spring as any)}
            onDoubleClick={(e) => {
              console.log(e.currentTarget, e.target);
              console.log('double click');
            }}
          >
            <Model />
            <Text {...getTextRotationAndPosition(turns)} />
          </a.group>
          <Plane
            // @ts-ignore
            ref={ref}
            name="interactionPlane"
            args={[200, 500]}
            position={[0, 0, 50]}
          >
            <meshBasicMaterial
              attach="material"
              color="white"
              opacity={0}
              transparent
            />
          </Plane>
        </VerticalCenterWithMargin>
      </Suspense>
    </>
  );
}
