import { ciuKeys } from './constants';

export type SupportType = 'y' | 'a' | 'n' | 'unknown';
export type BrowsersStatsType = {
  [k in (typeof ciuKeys)[number]]: {
    support: SupportType;
    betterSupport: boolean;
  };
};

export type MissingFeatureType = {
  title: string;
  description: string;
  specUrl?: string;
  specKey: string;
  notes?: (string | undefined)[];
  iOSWebkitStat: SupportType;
  firstSeen: any[]; // TODO: be more specific about order or make keys
  id: string;
  browsers: BrowsersStatsType;
  experimental?: boolean;
  debug?: any;
  source: 'mdn' | 'caniuse';
  sourceUrl?: string; // TODO: Sometimes this doesn't exist or doesn't work
};

export type MissingFeatureIndexType = MissingFeatureType & { index: number };
