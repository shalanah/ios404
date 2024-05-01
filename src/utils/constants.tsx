import ChromeIcon from '../svgs/chrome.svg';
import SafariIcon from '../svgs/safari.svg';
import FirefoxIcon from '../svgs/firefox.svg';

export const buttonClass = 'feature-list-button';
export const grabIgnoreClass = 'grab-ignore';
export const rightHandWidth = 460;
export const tooltipId = 'tt';
export const dataTooltipIdProps = { 'data-tooltip-id': tooltipId };

export const scaleOpts = {
  min: 0.9,
  default: 1,
  max: 1.5,
  step: 0.05,
};

export const verticalViewWidth = 1200;

export const browserIcons = {
  and_chr: ChromeIcon,
  and_ff: FirefoxIcon,
  safari: SafariIcon,
} as const;

export const compareBrowsers = [
  {
    ciuKey: 'and_chr',
    mdnKey: 'chrome_android',
    title: 'Chrome (Android)',
  },
  {
    ciuKey: 'and_ff',
    mdnKey: 'firefox_android',
    title: 'Firefox (Android)',
  },
  {
    ciuKey: 'safari',
    mdnKey: 'safari',
    title: 'Mac Safari (Desktop)',
  },
] as const;

export const ciuKeys = compareBrowsers.map(({ ciuKey }) => ciuKey);

export const sources = {
  mdn: 'MDN',
  caniuse: 'CANIUSE',
} as const;

export const supportColor = {
  n: 'var(--specNo)',
  a: 'var(--specPartial)',
  y: 'var(--specY)',
  unknown: 'var(--fg)',
};
