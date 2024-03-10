// @ts-nocheck
'use client';

import useCanIUseContext from '../hooks/useCanIUseContext';
import { useEffect } from 'react';
import { buttonClass } from '../hooks/useCanIUseContext';
import styled from 'styled-components';

const Ul = styled.ul`
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
  const { iOSLacking, activeIndex, updateHash, filteredData } =
    useCanIUseContext();

  // Just on first load
  useEffect(() => {
    if (activeIndex !== -1) {
      const el = document.querySelector(
        `.${buttonClass}[data-index="${activeIndex}"]`
      );
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
      const len = filteredData.length;
      if (len < 1) return;

      let key = filteredData[0].key; // backup - select first
      if (filteredData.some((v) => v.index === activeIndex) && len > 1) {
        const findIndex = filteredData.findIndex(
          (v) => v.index === activeIndex
        );
        if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
          key = filteredData[(findIndex + 1) % len].key;
        } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
          key = filteredData[(findIndex - 1 + len) % len].key;
        }
      }

      e.preventDefault(); // prevent scrolling down
      updateHash(key);
      document.querySelector(`.${buttonClass}[data-key="${key}"]`).focus();
    };
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, filteredData]);
  return (
    <Ul>
      {filteredData.map(({ key, index, ...v }, i) => {
        const active = index === activeIndex;
        return (
          <li key={key}>
            <button
              data-key={key}
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
          </li>
        );
      })}
    </Ul>
  );
}
