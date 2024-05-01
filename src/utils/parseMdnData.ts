import { compareBrowsers } from './constants';
import {
  CompatData,
  CompatStatement,
  Identifier,
  BrowserName,
  SupportStatement,
  Browsers,
} from '@mdn/browser-compat-data';
import { BrowsersStatsType, MissingFeatureType } from './missingFeature';
import { typedEntries, typedValues } from './ts';
import content from './mdn.json';

// Others we'd like to add next... 'api', 'css', 'html',
const categoriesAllowed = [
  'svg',
  'css',
  'html',
  'api',
  'webassembly',
  'webdriver',
  'javascript',
  'http',
];

// TODO: Move into separate file for others to update as well
const skipFeatures = [
  // Missing content on MDN we shouldn't show
  // TODO: Should follow up and let MDN know about this missing data --- or maybe will exist soon?
  // - CSS baseline-source // url MDN doesn't work
  'mdn-css-types-anchor-size',
  'mdn-css-types-anchor',
  'mdn-css-properties-anchor-name',
  'mdn-css-properties-baseline-source',
  'mdn-css-properties-inset-area',
  'mdn-css-properties-position-anchor',
  'mdn-css-at-rules-position-try',
  'mdn-css-properties-position-try',
  'mdn-css-properties-position-try-options',
  'mdn-css-properties-position-try-order',
  'mdn-css-properties-position-visibility',
  'mdn-api-AbortPaymentEvent',
  'mdn-api-CSSPositionTryDescriptors',
  'mdn-api-CSSPositionTryRule',
  'mdn-http-headers-Snapshot-Content-Location',
  'mdn-http-headers-Sec-CH-Save-Data',
  'mdn-api-NavigationActivation',
];

// More TODOs:
// - Add all relevant specs + parse
// - Add some testing around these functions -- especially getSupportForBrowser
// - Would really like some tests around these functions

const getSupportForBrowser = (
  supportStatement: SupportStatement | undefined,
  name?: string
): {
  stat: 'y' | 'a' | 'n' | 'unknown';
  notes: string[];
} => {
  if (!supportStatement) return { stat: 'unknown', notes: [] };
  let compareData = Array.isArray(supportStatement)
    ? [...supportStatement]
    : supportStatement;
  if (Array.isArray(compareData)) {
    if (compareData[0].version_added === 'preview') {
      if (compareData.length > 1) compareData = compareData[1];
      else return { stat: 'n', notes: [] };
    }
  }
  const latest = Array.isArray(compareData) ? compareData?.[0] : compareData;
  const version = latest?.version_added;
  const flags = latest?.flags;
  const partial_implementation = latest?.partial_implementation;
  const prefix = latest?.prefix;
  // if (prefix) console.log(supportStatement, name); // TODO: Add note about prefix... maybe demote the standard of support too?
  let notes = latest?.notes || []; // --- we only care about notes for safari_ios
  if (typeof notes === 'string') notes = [notes];
  const impl_url = Array.isArray(latest?.impl_url)
    ? latest?.impl_url[0]
    : latest?.impl_url;
  if (impl_url && impl_url.startsWith('https://webkit')) {
    notes.push(`See <a href="${impl_url}">bug ${impl_url.split('b/')[1]}</a>`);
  }

  if (flags) {
    const type = flags?.[0]?.type;
    const value_to_set = flags?.[0]?.value_to_set;
    if (
      (type && type === 'runtime_flag') || // TODO: I guess this is KINDA supported. We'll need to add a note that it is behind a flag (so the regular population can't get to it)
      (type === 'preference' &&
        value_to_set &&
        (['true', 'enabled'] as string[]).includes(value_to_set)) // TODO: I guess this is KINDA supported. We'll need to add a note that it is behind a flag (so the regular population can't get to it)
    ) {
      // TODO: what are the other types of flags?
      return { stat: 'n', notes };
    }
  }
  if (version === null) return { stat: 'unknown', notes };
  if (version === false || version === 'preview') return { stat: 'n', notes };
  if (partial_implementation) return { stat: 'a', notes };
  return {
    stat: 'y',
    notes,
  };
};

const getIsBetterSupported = ({
  iOSSupport,
  browserSupport: { stat },
}: {
  iOSSupport: { stat: string; notes: string[] };
  browserSupport: { stat: string; notes: string[] };
}) => {
  return iOSSupport.stat === 'unknown'
    ? null
    : stat === 'unknown'
    ? false
    : (stat === 'y' && ['a', 'n'].includes(iOSSupport.stat)) ||
      (stat === 'a' && iOSSupport.stat === 'n');
};

const getBrowserComparison = ({
  support,
  iOSSupport,
  name,
}: {
  support: Partial<Record<BrowserName, SupportStatement>>;
  iOSSupport: { stat: string; notes: string[] };
  name: string;
}): BrowsersStatsType => {
  return Object.fromEntries(
    compareBrowsers.map(({ ciuKey, mdnKey }) => {
      const browserSupport = getSupportForBrowser(support[mdnKey], name);
      return [
        [ciuKey],
        {
          support: browserSupport.stat,
          betterSupport: getIsBetterSupported({
            iOSSupport,
            browserSupport,
          }),
        },
      ];
    })
  );
};

// TODO: Check this
const getSpecKey = (compat: CompatStatement) => {
  const spec_url = compat?.spec_url || '';
  return 'other'; // TODO: We'll get into the nitty gritty of this later
  if (!spec_url) return 'unoff'; // should this be unoff or unknown???
  if (spec_url.includes('svgwg'))
    return 'svgwg'; // TODO: probably want the level too
  else if (spec_url.includes('drafts.csswg.org'))
    return 'w3cu'; // unknown level of w3c
  else if (spec_url.includes('w3c.github.io'))
    return 'w3cu'; // unknown level of w3c
  else if (spec_url.includes('whatwg.org')) return 'ls';
  else if (spec_url.includes('wicg.github.io/')) return 'wicg';
  return 'other';
};

// or proper case
function formatCamelCase(text: string): string {
  // Insert a space before all caps (if not at the beginning of the string) and before every capital letter followed by lowercase (indicating the start of a new word).
  // Also handle the end of acronyms followed by a new word.
  return text
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // Splits before a lowercase that follows an uppercase sequence
    .replace(/([a-z])([A-Z])/g, '$1 $2'); // Splits a lowercase followed by an uppercase
}

const getFirstSupported = ({
  support,
  browsersData,
  includePartial = false,
}: {
  support: Partial<Record<BrowserName, SupportStatement>>;
  browsersData: Browsers;
  includePartial?: boolean;
}) => {
  let browserDate: number = 0;
  let browserVersion = '';
  let browserName: BrowserName | 'Unknown' = 'Unknown';
  // const supported: Record<string, string> = {};
  typedEntries(support).forEach(([browser, supportStatement]) => {
    if (!supportStatement) return;
    let { version_added, partial_implementation, flags } = Array.isArray(
      supportStatement
    )
      ? supportStatement[0]
      : supportStatement;
    if (!version_added) return;
    if (!includePartial && partial_implementation) return;
    if (flags || (flags || [])?.length > 0) return; // don't include flags

    const findVersion = (
      typedEntries(browsersData[browser].releases) || []
    ).find(([version, { status }]) =>
      version_added === true ? status === 'current' : version === version_added
    );
    if (findVersion) {
      const release_date = findVersion[1]?.release_date;
      if (release_date) {
        //  supported[browser] = release_date; // debugging;
        const versionDate = new Date(release_date);
        const versionDateTimestamp = versionDate.getTime();
        if (!browserDate || versionDateTimestamp < browserDate) {
          browserName = browser;
          browserDate = Math.round(versionDateTimestamp / 1000); // right now just matching CIU data, could change
          browserVersion = (findVersion[0] as string) || '';
        }
      }
    }
  });

  return { browserName, browserDate, browserVersion } as {
    browserName: BrowserName | 'Unknown';
    browserDate: number;
    browserVersion: string;
  };
};

const parseMissingFeature = ({
  browsers: browsersData,
  feature,
  cat,
  keys,
}: {
  browsers: Browsers;
  feature: Identifier;
  cat: string;
  keys: string[];
}) => {
  if (
    !feature.__compat ||
    feature?.__compat.status?.deprecated ||
    !feature?.__compat.mdn_url // should have info about this feature to surface to the peeps
  )
    return;

  const id = `mdn-${cat}-${keys.join('-')}`;
  if (skipFeatures.includes(id)) return;
  if (id.includes('-moz')) return; // skip moz stuff for now (too niche/non-standard???)

  const {
    __compat: {
      spec_url,
      mdn_url,
      support: { safari_ios },
      support,
      status: { experimental } = {
        experimental: false,
      },
    },
  } = feature;

  const lastKey = (keys.at(-1) || '')?.replace(/_/g, ' ');
  const iOSSupport = getSupportForBrowser(safari_ios, lastKey);
  if (iOSSupport.stat === 'y') return;

  const browsers = getBrowserComparison({
    support,
    iOSSupport,
    name: lastKey,
  });

  // iOS is missing data and other browsers have data
  if (
    iOSSupport.stat === 'unknown' &&
    typedValues(browsers).some(({ support }) => ['y', 'a'].includes(support))
  ) {
    console.warn(
      `skipping: safari_ios data is missing, has data for at least one comparison browser. ${mdn_url}`
    );
    return;
  }

  // If all no comparison browser has better support... skip!
  if (typedValues(browsers).every(({ betterSupport }) => !betterSupport))
    return;

  const { browserName, browserDate, browserVersion } = getFirstSupported({
    support,
    browsersData,
    includePartial: typedValues(browsers).every(
      ({ support }) => support !== 'y'
    ),
  });

  // Keys to match mdn content data (mdn.json data)
  let contentKey = '';
  if (cat === 'css') contentKey = `css/${keys.at(-1)}`;
  else contentKey = `${cat}/${keys.join('/')}`;

  // Title tweaks
  let title = '';

  if (keys.includes('manifest')) title = `Manifest ${lastKey}`;
  else if (cat === 'api') title = `${formatCamelCase(lastKey)}`;
  else title = `${cat.toUpperCase()} ${lastKey}`;

  const missingFeature: MissingFeatureType = {
    title,
    description:
      // @ts-ignore
      content?.[contentKey.toLowerCase()] ||
      'See MDN source link in the table to the right',
    experimental,
    iOSWebkitStat: iOSSupport.stat,
    notes: iOSSupport.notes,
    browsers,
    sourceUrl: mdn_url,
    id,
    specKey: getSpecKey(feature.__compat),
    specUrl: Array.isArray(spec_url) ? spec_url[0] : spec_url, // TODO: Is this ever really an array? - double check
    firstSeen: [
      browserName ? browsersData?.[browserName]?.name : 'Unknown',
      browserDate,
      browserVersion,
    ],
    source: 'mdn',
    // debug: { compat: subFeature.__compat },
  };
  return missingFeature;
};

export const parseMdnData = (data: CompatData) => {
  const browsers = data.browsers;

  let missingFeatures = [];
  for (const [cat, features] of typedEntries(data)) {
    if (!categoriesAllowed.includes(cat)) continue;

    // Probably need recursion here but just 2 levels deep for now
    for (const [key, feature] of typedEntries(features as Identifier)) {
      if (feature.__compat && feature.__compat.mdn_url) {
        const missingFeature = parseMissingFeature({
          browsers,
          feature: feature,
          cat,
          keys: [key as string], // these should be strings... don't know when numbers
        });

        if (missingFeature) missingFeatures.push(missingFeature);
      } else {
        for (const [sub, subFeature] of typedEntries(feature)) {
          const missingFeature = parseMissingFeature({
            browsers,
            feature: subFeature,
            cat,
            keys: [key as string, sub as string], // these should be strings... don't know when numbers
          });

          if (missingFeature) missingFeatures.push(missingFeature);
        }
      }
    }
  }

  return missingFeatures;
};
