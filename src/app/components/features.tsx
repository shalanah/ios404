// @ts-nocheck
'use client';

import styles from './features.module.css';
import classNames from 'classnames';
import useCanIUseContext from '../hooks/useCanIUseContext';
import { useEffect } from 'react';
import { buttonClass } from '../hooks/useCanIUseContext';

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
        document.activeElement.getAttribute('data-filteredIndex')
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
        `.${buttonClass}[data-filteredIndex="${nextIndex}"]`
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
    <ul>
      {filteredData.map(({ key, index, ...v }, i) => {
        const active = index === activeIndex;
        return (
          <li key={key}>
            <button
              data-filteredIndex={i}
              data-key={key}
              data-index={index}
              className={classNames(styles.button, buttonClass)}
              onClick={(e) => {
                updateHash(key);
                // Safari doesn't think buttons deserve focus... 🤷‍♀️?
                // - https://stackoverflow.com/questions/42758815/safari-focus-event-doesnt-work-on-button-element
                e.currentTarget.focus();
              }}
            >
              <h2
                className={classNames(styles.h2, { [styles.h2active]: active })}
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
    </ul>
  );
}
