import canIUseData from './canIUseData.json';

type CIUUsageGlobal = {
  [k: string]: number;
};

type CIUVersionList = {
  version: string;
  global_usage: number;
  release_date: number;
  era: number;
  prefix: string;
};

type CIUBrowser = {
  browser: string;
  long_name: string;
  abbr: string;
  prefix: string;
  type: string;
  usage_global: CIUUsageGlobal;
  version_list: CIUVersionList[];
  current_version: string;
};

type CIUCats = {
  CSS: string[];
  HTML5: string[];
  JS: string[];
  'JS API': string[];
  Other: string[];
  Security: string[];
  SVG: string[];
};

const CIUStatuses = {
  rec: 'W3C Recommendation',
  pr: 'W3C Proposed Recommendation',
  cr: 'W3C Candidate Recommendation',
  wd: 'W3C Working Draft',
  ls: 'WHATWG Living Standard',
  other: 'Other',
  unoff: 'Unofficial / Note',
} as const;

type Link = {
  url: string;
  title: string;
};

type CIUData = {
  [k: string]: {
    title: string;
    description: string;
    spec: string;
    status: keyof typeof CIUStatuses;
    links: Link[];
    categories: string[];
    stats: {
      [k: string]: { [l: string]: string };
    };
    notes: string;
    notes_by_num: {
      [k: string]: string;
    };
    usage_perc_y: number;
    usage_perc_a: number;
    ucprefix: boolean;
    parent: string;
    keywords: string;
    chrome_id: string;
  };
};

export type CIU = {
  agents: {
    [k: string]: CIUBrowser;
  };
  statuses: typeof CIUStatuses;
  cats: CIUCats;
  updated: number;
  data: CIUData;
};
