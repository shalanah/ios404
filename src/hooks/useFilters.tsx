import { useState, useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { typedEntries, typedKeys, typedValues } from '@/utils/ts';

const defaultFilters = {
  experimental: true,
  sources: {
    caniuse: true,
    mdn: true,
  },
  browsers: {
    and_chr: true,
    and_ff: false,
    safari: false,
  },
  statuses: {
    // TODO: Add more specs
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
type SourceKeys = keyof (typeof defaultFilters)['sources'];

export type FiltersType = {
  sources: { [k in SourceKeys]: boolean };
  browsers: { [k in BrowserKeys]: boolean };
  statuses: { [k in StatusKeys]: boolean };
  experimental: boolean;
};

const getInitFilters = () => {
  const params = new URLSearchParams(window.location.search);
  const browsers = params.get('browsers');
  const specsOff = params.get('specsOff');
  const sourcesOff = params.get('sourcesOff');
  let filters = cloneDeep(defaultFilters);
  if (browsers) {
    const browsersOn = browsers.split('_').map((k) => k.replace('and', 'and_'));
    typedKeys(filters.browsers).forEach((k) => {
      filters.browsers[k as BrowserKeys] = browsersOn.includes(k as string);
    });
    // Double check that at least one browser is on
    if (typedValues(filters.browsers).every((v) => !v)) {
      filters.browsers.and_chr = true;
    }
  }
  if (specsOff) {
    const specKeys = typedKeys(filters.statuses);
    specsOff.split('_').forEach((k) => {
      if ((specKeys as string[]).includes(k)) {
        filters.statuses[k as StatusKeys] = false;
      }
    });
  }
  // TODO: Explicit of what are ONE
  if (sourcesOff) {
    const sourceKeys = typedKeys(filters.sources);
    sourcesOff.split('_').forEach((k) => {
      if ((sourceKeys as string[]).includes(k)) {
        filters.sources[k as SourceKeys] = false;
      }
    });
    // Double check that something is on otherwise fallback to default
    if (typedValues(filters.sources).every((v) => !v)) {
      filters.sources = defaultFilters.sources;
    }
  }
  console.log(filters);
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
    const sourcesOff = typedEntries(filters.sources).filter(([_, v]) => !v);
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
      ...(sourcesOff.length
        ? {
            sourcesOff: sourcesOff.map(([k]) => k).join('_'),
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
