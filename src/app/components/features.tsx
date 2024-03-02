// @ts-nocheck
'use client';

import { ExternalLinkIcon } from '@radix-ui/react-icons';
import styles from './features.module.css';
import classNames from 'classnames';

import useCanIUseContext from '../hooks/useCanIUseContext';
import { act } from 'react-dom/test-utils';

export default function Features() {
  const { iOSLacking, activeFeature, setActiveFeature } = useCanIUseContext();
  return (
    <ul>
      {iOSLacking.map(({ key, ...v }, i) => {
        // console.log(v);
        let date = v.firstSeen?.[1] ? new Date(v.firstSeen?.[1] * 1000) : '';
        date = date ? date.getFullYear() : '';
        const age = new Date().getFullYear() - date;
        const active = i === activeFeature;

        return (
          <li key={key}>
            <button
              onClick={() => setActiveFeature(i)}
              style={{ padding: '.35em 0' }}
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
              {/* <div>{v.description}</div>
            <div>{v.categories.join(', ')}</div> */}
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
