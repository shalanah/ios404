// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';

const dataLink =
  'https://raw.githubusercontent.com/Fyrd/caniuse/master/fulldata-json/data-2.0.json';
const android_chrome = 'and_chr';
const ios_safari = 'ios_saf';

const getIOSSafariLacking = (canIUseData: any) => {
  if (!canIUseData) return [];
  const { statuses, data, agents } = canIUseData;
  const chromeVersion = agents[android_chrome].version_list.at(-1).version;
  const iosVersion = agents[ios_safari].version_list.at(-1).version;
  const safariDoesNotSupport = Object.entries(data)
    .filter(([k, v]) => {
      if (['asm.js'].includes(v.title)) return false; // non-relevant features
      return (
        v.stats[ios_safari][iosVersion] === 'n' &&
        v.stats[android_chrome][chromeVersion] !== 'n'
      );
    })
    .map(([k, v]) => {
      return {
        ...v,
        key: k,
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
        return (
          <div key={key} style={{ marginTop: 10, padding: 10 }}>
            <h2>{v.title}</h2>
            <div>{v.description}</div>
            <div>{v.categories.join(', ')}</div>
            {v.notes && <div>{v.notes}</div>}
            {v.keywords && <div>{v.keywords}</div>}
            <div>{canIUseData.statuses[v.status]}</div>
            <div>
              {v.links.map(({ url, title }, k) => (
                <span key={k}>
                  {url} {title}
                </span>
              ))}
            </div>
            <div>{v.safariStat}</div>
            <div>{v.chromeStat}</div>
            <div>{v.spec}</div>
          </div>
        );
      })}
    </div>
  );
}
