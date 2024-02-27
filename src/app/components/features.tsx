// @ts-nocheck
'use client';

import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

const dataLink =
  'https://raw.githubusercontent.com/Fyrd/caniuse/master/fulldata-json/data-2.0.json';
const android_chrome = 'and_chr';
const ios_safari = 'ios_saf';

// Features that we don't actually care about - deprecated or not relevant to mobile/ipad
const skipFeatures = [
  'asmjs', // deprecated
  'css3-cursors', // cursors are not super relevant to mobile
  'css3-cursors-grab', // cursors are not super relevant to mobile
  'css3-cursors-newer', // cursors are not super relevant to mobile
  'do-not-track', // not adopted
  'filesystem', // might no longer be maintained but still supported in chrome
  'sql-storage', // deprecating maybe drop later?,
];

const getIOSSafariLacking = (canIUseData: any) => {
  if (!canIUseData) return [];
  const { statuses, data, agents } = canIUseData;
  const chromeVersion = agents[android_chrome].version_list.at(-1).version;
  const iosVersion = agents[ios_safari].version_list.at(-1).version;
  const safariDoesNotSupport = Object.entries(data)
    .filter(([k, v]) => {
      if (skipFeatures.includes(k)) return false; // non-relevant features
      return (
        v.stats[ios_safari][iosVersion].startsWith('n') &&
        !v.stats[android_chrome][chromeVersion].startsWith('n')
      );
    })
    .map(([k, v]) => {
      // find first time supported
      const firstSeen = Object.entries(v.stats).reduce(
        (acc, [browserKey, stat]) => {
          const firstY = Object.entries(stat).find(
            ([_, status]) => status.startsWith('y') && _ !== 'TP' // come on we don't count TP
          );
          if (firstY) {
            const date = agents[browserKey].version_list.find(
              (v) => v.version === firstY[0]
            ).release_date;
            // console.log(date, firstY);
            return acc.length === 0 || date < acc[1]
              ? [agents[browserKey].browser, date, firstY[0]]
              : acc;
          }
          return acc;
        },
        []
      );
      return {
        ...v,
        key: k,
        firstSeen,
        safariStat: v.stats[ios_safari][iosVersion],
        chromeStat: v.stats[android_chrome][chromeVersion],
      };
    });
  return safariDoesNotSupport;
};

export default function Features() {
  const [loading, setLoading] = useState(true);
  const [canIUseData, setData] = useState(false);
  const [hasError, setHasError] = useState(false);
  const iOSLacking = getIOSSafariLacking(canIUseData);
  // console.log(canIUseData);
  // console.log(iOSLacking);
  // console.log(canIUseData);

  // If Safari brings up that caniuse data isn't up-to-date...
  // Maybe they should work on that --- who do they really have to blame? That's part of their job, right? Right?
  useEffect(() => {
    fetch(dataLink)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false); // could be useReducer instead
      })
      .catch((err) => {
        setHasError(true);
        setLoading(false);
        console.error(err);
      });
  }, []);
  return (
    <div>
      {iOSLacking.map(({ key, ...v }) => {
        // console.log(v);
        let date = v.firstSeen?.[1] ? new Date(v.firstSeen?.[1] * 1000) : '';
        date = date ? date.getFullYear() : '';
        const age = new Date().getFullYear() - date;
        return (
          <div key={key} style={{ marginTop: 10, padding: 10 }}>
            <h2>
              {v.title}{' '}
              <a href={`https://caniuse.com/${key}`} target="_blank">
                <ExternalLinkIcon />
              </a>
            </h2>
            <div>{v.description}</div>
            {/* <div>{v.categories.join(', ')}</div> */}
            {v.notes && <div>{v.notes}</div>}
            {/* {v.keywords && <div>{v.keywords}</div>} */}
            <div>
              Born: {date} {date ? <>({age} years old)</> : <></>}
            </div>
            <div>
              Parents: {v.firstSeen?.[0] || ''} {v.firstSeen?.[2] || ''}
            </div>
            <div>
              Status: <a href={v.spec}>{canIUseData.statuses[v.status]}</a>
            </div>
            {/* <div>
              {v.links.map(({ url, title }, k) => (
                <span key={k}>
                  {url} {title}
                </span>
              ))}
            </div> */}
            <div>
              {v.safariStat} / {v.chromeStat}
            </div>
          </div>
        );
      })}
    </div>
  );
}
