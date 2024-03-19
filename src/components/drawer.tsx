// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import styled from 'styled-components';
import { useSpring } from '@react-spring/web';
import { useOnClickOutside } from 'usehooks-ts';

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const Container = styled(animated.div)`
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: column;
  bottom: 0px;
  left: 0px;
  background: var(--modalBg);
  border-radius: 30px 30px 0px 0px;
  overflow: hidden;
  border-top: 1px solid var(--modalHr);
`;
const config = {
  mass: 1,
  tension: 400,
  clamp: true,
  friction: 35 /* since we are mostly clamping, want to close pretty quickly */,
};
const Handle = styled.div`
  width: 26px;
  height: 3px;
  background: #ccc;
  border-radius: 3px;
`;
const ClickArea = styled.div`
  cursor: pointer;
  width: 100%;
  position: relative;
  touch-action: none;
  border: 2px dotted transparent;
  border-radius: 30px 30px 0px 0px;
  &:focus-visible {
    border: 2px dotted var(--titleColor);
    outline: none;
  }
`;

type Props = {
  content: React.ReactNode;
  clickContent?: React.ReactNode;
  height: [number, number];
  footer?: React.ReactNode;
  style?: React.CSSProperties;
};

export const Drawer = ({
  content,
  clickContent = null,
  height: [openHeight, closedHeight],
  footer,
  style = {},
  ...rest
}: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const clickRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    if (open) setOpen(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const [props, api] = useSpring(() => ({
    y: openHeight - closedHeight,
    immediate: true, // no animation, just following finger
    config,
  }));

  useEffect(() => {
    api.start({ y: open ? 0 : openHeight - closedHeight });
  }, [open, api, openHeight, closedHeight]);

  const offset = 30;

  const bind = useDrag(
    ({ movement: [_, my], last, tap, event, ...props }) => {
      if (tap && clickRef?.current?.contains(event.target)) {
        return;
      }
      if (!last)
        api.start({
          y: clamp(
            !open ? openHeight - closedHeight + my : my,
            0,
            openHeight - closedHeight
          ),
          immediate: true,
        });
      // }
      if (last) {
        if (open && my >= offset) {
          setOpen(false);
        } else if (!open && my <= -offset) {
          setOpen(true);
        } else {
          api.start({
            y: open ? 0 : openHeight - closedHeight,
            immediate: false,
          });
        }
      }
      // api.start({
      //   y: open ? my : openHeight - closedHeight + oy,
      //   immediate: true,
      // });
    },
    { filterTaps: true }
  );

  return (
    <Container
      ref={ref}
      style={{
        touchAction: 'none',
        height: openHeight,
        ...props,
        ...style,
      }}
      {...bind()}
      {...rest}
    >
      <ClickArea
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (['Enter', ' '].includes(e.key)) {
            setOpen((o) => !o);
          }
        }}
        ref={clickRef}
        onClick={() => setOpen((o) => !o)}
        style={{
          touchAction: 'none',
          background: 'red',
          height: closedHeight,
        }}
      >
        <div
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            display: 'flex',
            width: '100%',
            top: 0,
            left: 0,
          }}
        >
          <Handle style={{ margin: '5px auto' }} />
        </div>
        {clickContent}
      </ClickArea>
      <div
        style={{
          overflowY: 'auto', // don't want to scroll when closed
          flex: 1,
        }}
      >
        {content}
      </div>
      {footer && <div>{footer}</div>}
    </Container>
  );
};
