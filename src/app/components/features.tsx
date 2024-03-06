// @ts-nocheck
'use client';

import styles from './features.module.css';
import classNames from 'classnames';
import useCanIUseContext from '../hooks/useCanIUseContext';
import { useEffect } from 'react';

const buttonClass = 'feature-list-button';
export default function Features() {
  const { iOSLacking, activeFeature, updateHash } = useCanIUseContext();
  const len = iOSLacking.length;

  // Just on first load
  useEffect(() => {
    if (
      activeFeature !== -1 &&
      document.querySelector(`.${buttonClass}[data-index="${activeFeature}"]`)
    ) {
      document
        .querySelector(`.${buttonClass}[data-index="${activeFeature}"]`)
        .focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFeature !== -1]);

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
      if (!hasFocus) return;
      const index = Number(document.activeElement.getAttribute('data-index'));
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
      e.preventDefault();
      updateHash(iOSLacking[nextIndex].key);
      document.querySelector(`button[data-index="${nextIndex}"]`).focus();
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
      {iOSLacking.map(({ key, ...v }, i) => {
        // console.log(v);
        const active = i === activeFeature;

        return (
          <li key={key}>
            <button
              data-key={key}
              data-index={i}
              className={classNames(styles.button, buttonClass)}
              onClick={() => updateHash(key)}
            >
              <h2
                className={classNames(styles.h2, { [styles.h2active]: active })}
                style={
                  active
                    ? {
                        fontWeight: 700,
                        // textTransform: 'uppercase',
                      }
                    : {
                        fontWeight: 100,
                        letterSpacing: '.025em',
                      }
                }
              >
                {v.title}{' '}
                {/* <a href={`https://caniuse.com/${key}`} target="_blank">
                <ExternalLinkIcon />
              </a> */}
              </h2>{' '}
              {/* {active && (
                <div
                  style={{
                    margin: '10px 0',
                    fontWeight: 200,
                    fontSize: '.85rem',
                    lineHeight: 1.5,
                  }}
                >
                  {v.description}
                </div>
              )} */}
              {/* <div>{v.categories.join(', ')}</div> */}
              {/* {v.notes && <div>{v.notes}</div>}
            {v.keywords && <div>{v.keywords}</div>} */}
              {/* <div>
              Born: {date}{' '}
              {date ? (
                <>
                  ({age} year{age > 1 ? 's' : ''} old)
                </>
              ) : (
                <></>
              )}
            </div> */}
              {/* <div>
              Parents: {v.firstSeen?.[0] || ''} {v.firstSeen?.[2] || ''}
            </div>
            <div>
              Godparents: <a href={v.spec}>{canIUseData.statuses[v.status]}</a>
            </div>
            <ul>
              {Object.entries(v.notes_by_num).map(([num, note]) => {
                if (
                  !v.safariStat
                    .replaceAll(' ', '')
                    .replaceAll(/a|n|y/gi, '')
                    .split('#')
                    .includes(num)
                )
                  return null;
                return <li key={num}>{note}</li>;
              })}
            </ul> */}
              {/* <div>
              {v.links.map(({ url, title }, k) => (
                <span key={k}>
                  {url} {title}
                </span>
              ))}
            </div> */}
              {/* <div>
              {v.safariStat} / {v.chromeStat}
            </div> */}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
