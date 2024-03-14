// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import styled from 'styled-components';
import { useSpring } from '@react-spring/web';
import { useOnClickOutside } from 'usehooks-ts';

const Container = styled(animated.div)`
  position: fixed;
  width: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  bottom: 0px;
  left: 10px;
  background: var(--modalBg);
  border-radius: 10px 10px 0px 0px;
  overflow: hidden;
  border: 1px solid var(--modalHr);
  border-bottom: none;
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

type Props = {
  content: React.ReactNode;
  clickContent: React.ReactNode;
  height: [number, number];
  footer?: React.ReactNode;
  style?: React.CSSProperties;
};

export const Drawer = ({
  content,
  clickContent,
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

  const offset = 80;
  const bind = useDrag(
    ({ movement: [_, my], last, tap, event }) => {
      if (tap && clickRef?.current?.contains(event.target)) {
        setOpen((o) => !o);
        return;
      }
      if (open && my >= 0) api.start({ y: my, immediate: false });
      else if (!open && my <= 0)
        api.start({ y: openHeight - closedHeight + my, immediate: false });
      if (last) {
        if (open && my >= offset) {
          setOpen(false);
        } else if (!open && my <= -offset) {
          setOpen(true);
        } else if (open) {
          api.start({ y: 0, immediate: false });
        } else {
          api.start({ y: openHeight - closedHeight, immediate: false });
        }
      }
    },
    { filterTaps: true, axis: 'y' }
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
      <div
        style={{
          overflowY: open ? 'scroll' : 'hidden', // don't want to scroll when closed
          flex: 1,
        }}
      >
        <div
          ref={clickRef}
          style={{ position: 'relative', touchAction: 'none' }}
        >
          <div
            style={{
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
        </div>
        <div
          style={{ display: open ? '' : 'none', touchAction: 'none' }}
          key={open}
        >
          {content}
        </div>
      </div>
      {footer && <div>{footer}</div>}
    </Container>
  );
};
