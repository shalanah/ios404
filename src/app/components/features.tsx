// @ts-nocheck
'use client';

import useCanIUseContext from '../hooks/useCanIUseContext';
import { useEffect, useRef } from 'react';
import { buttonClass } from '../hooks/useCanIUseContext';
import styled from 'styled-components';
import usePrevious from '../hooks/usePrevious';

const Div = styled.div`
  &:focus-visible {
    outline: 2px dotted var(--titleColor);
    outline-offset: 2px;
  }

  h2 {
    font-size: 1.15rem;
    line-height: 1.2;
    transition: 0.05s color ease-out;
  }
  h2.active {
    position: relative;
  }
  button {
    display: block;
    width: 100%;
    padding: 0.45em 0.5em;
    margin: 0 -0.5em;
    outline: 2px dotted transparent;
    outline-offset: 2px 4px;
    transition: 0.3s;
    border-radius: 10px;
    margin-bottom: 2px;
  }
  button:focus {
    outline: 2px dotted currentColor;
  }
`;

export default function Features() {
  const { activeIndex, updateHash, filteredData, setNextFeature } =
    useCanIUseContext();

  // Just on first load
  useEffect(() => {
    if (activeIndex !== -1) {
      const el = document.querySelector(`.${buttonClass}[data-active="true"]`);
      if (el && document.activeElement !== el) {
        // scroll to element first
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
        el.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex !== -1]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const el = document.querySelectorAll(`.${buttonClass}`);
      const hasFocus = Array.from(el).some(
        (el) => el === document.activeElement
      );
      if (!hasFocus) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
      }
    };
    const onKeyUp = (e) => {
      // Make sure no other keys are pressed (like tab)....
      // Make sure we aren't in a modal too
      if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key))
        return;

      const hasDialog = document.querySelector('[role="dialog"]');
      if (hasDialog) return;

      setNextFeature({
        e,
        forwards: ['ArrowDown', 'ArrowRight'].includes(e.key),
      });
    };
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [setNextFeature]);

  const firstLoad = useRef(true);
  const prevIndex = usePrevious(activeIndex);
  useEffect(() => {
    if (firstLoad.current && activeIndex !== -1 && prevIndex !== -1) {
      firstLoad.current = false;
    }
  }, [activeIndex, prevIndex]);

  const delay = (index) =>
    firstLoad?.current ? 0 : Math.min(20, index) * 0.05; // only want to delay the first few in view
  const activeInList = filteredData.some((v) => v.index === activeIndex);
  return (
    <Div>
      {filteredData.map(({ key, index, ...v }, i) => {
        const active = index === activeIndex;
        return (
          <button
            tabIndex={active || (!activeInList && i === 0) ? 0 : -1}
            key={key}
            style={{
              animation: `fadeIn 0.1s ${delay(i)}s ease-out both`,
            }}
            data-active={active ? 'true' : 'false'}
            data-index={index} // to focus on load
            className={buttonClass}
            onClick={(e) => {
              updateHash(key);
              // Safari doesn't think buttons deserve focus... 🤷‍♀️?
              // - https://stackoverflow.com/questions/42758815/safari-focus-event-doesnt-work-on-button-element
              e.currentTarget.focus();
            }}
          >
            <h2
              className={active ? 'active' : ''}
              style={{
                color: active ? 'var(--titleColor)' : 'var(--color)',
                fontWeight: active ? 700 : 200,
              }}
            >
              {v.title}{' '}
            </h2>{' '}
            {/* <div>{v.categories.join(', ')}</div> */}
            {/* {v.notes && <div>{v.notes}</div>}
            {v.keywords && <div>{v.keywords}</div>} */}
            {/* <div>
              {v.links.map(({ url, title }, k) => (
                <span key={k}>
                  {url} {title}
                </span>
              ))}
            </div> */}
          </button>
        );
      })}
    </Div>
  );
}
