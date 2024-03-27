import { useState, useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';

const defaultFilters = {
  browsers: {
    and_chr: true,
    and_ff: false,
    safari: false,
  },
  statuses: {
    cr: true,
    ls: true,
    other: true,
    pr: true,
    rec: true,
    unoff: true,
    wd: true,
  },
};

type BrowserKeys = keyof (typeof defaultFilters)['browsers'];
type StatusKeys = keyof (typeof defaultFilters)['statuses'];

export type FiltersType = {
  browsers: { [k in BrowserKeys]: boolean };
  statuses: { [k in StatusKeys]: boolean };
};

const getInitFilters = () => {
  const params = new URLSearchParams(window.location.search);
  const browsers = params.get('browsers');
  const specsOff = params.get('specsOff');
  let filters = cloneDeep(defaultFilters);
  if (browsers) {
    const browsersOn = browsers.split('_').map((k) => k.replace('and', 'and_'));
    Object.keys(filters.browsers).forEach((k) => {
      filters.browsers[k as BrowserKeys] = browsersOn.includes(k as string);
    });
    // Double check that at least one browser is on
    if (Object.values(filters.browsers).every((v) => !v)) {
      filters.browsers.and_chr = true;
    }
  }
  if (specsOff) {
    const specKeys = Object.keys(filters.statuses);
    specsOff.split('_').forEach((k) => {
      if (specKeys.includes(k)) {
        filters.statuses[k as StatusKeys] = false;
      }
    });
  }
  return filters;
};

export const useFilters = () => {
  const [filters, setFilters] = useState<FiltersType>(() => getInitFilters());

  // Query string updates
  useEffect(() => {
    // We're talking low number key/values here... so no need to over-optimize
    const specsAll = Object.values(filters.statuses).every((v) => v);
    const specsNone = Object.values(filters.statuses).every((v) => !v);
    const browserOnlyChrome = Object.entries(filters.browsers).every(([k, v]) =>
      k === 'and_chr' ? v : !v
    );
    const browsersNone = Object.values(filters.browsers).every((v) => !v);
    let params = new URLSearchParams({
      ...(browserOnlyChrome || browsersNone // if default or a bad state do nothing
        ? {}
        : {
            browsers:
              Object.entries(filters.browsers)
                .filter(([_, on]) => on)
                .map(([k]) => k.replace('_', ''))
                .join('_') || 'none',
          }),
      ...(!specsAll && !specsNone // if default or a bad state do nothing
        ? {
            specsOff: Object.entries(filters.statuses)
              .filter(([_, on]) => !on)
              .map(([k]) => k)
              .join('_'),
          }
        : {}),
    });
    const prevParams = new URLSearchParams(window.location.search);
    if (params.toString() !== prevParams.toString()) {
      const hash = window.location.hash;
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}?${params.toString()}${hash}`
      );
    }
  }, [filters]);

  return [filters, setFilters] as const;
};
