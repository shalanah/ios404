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
  const len = filteredData.length;

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
      const els = document.querySelectorAll(`.${buttonClass}`);
      const hasFocus = Array.from(els).some(
        (el) => el === document.activeElement
      );
      if (!hasFocus || len <= 1) return;
      const index = Number(
        document.activeElement.getAttribute('data-filteredindex')
      );
      let nextIndex = -1;
      switch (e.key) {
        case 'ArrowDown':
          nextIndex = (index + 1) % len;
          break;
        case 'ArrowUp':
          nextIndex = index - 1;
          if (nextIndex < 0) nextIndex = len - 1;
          break;
        default:
          return;
      }
      if (nextIndex === -1) return;
      const el = document.querySelector(
        `.${buttonClass}[data-filteredindex="${nextIndex}"]`
      );
      if (el && document.activeElement !== el) el.focus();
      const nextActiveIndex = Number(el?.getAttribute('data-index') || -1);
      e.preventDefault();
      updateHash(iOSLacking[nextActiveIndex].key);
    };
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len]);
  return (
    <Ul>
      {filteredData.map(({ key, index, ...v }, i) => {
        const active = index === activeIndex;
        return (
          <li key={key}>
            <button
              data-filteredindex={i}
              data-key={key}
              data-index={index}
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
