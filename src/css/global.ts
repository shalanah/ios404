import { createGlobalStyle } from 'styled-components';
import { themeDark, themeLight } from './themes';
import { utilityClasses } from './utilityClasses';
import { radix } from './radix';

const globalCss = /* css */ `
@media (prefers-color-scheme: dark) {
  ${themeDark}
}
@media (prefers-color-scheme: light) {
  ${themeLight}
}
.dark {
  ${themeDark}
}
.light {
  ${themeLight}
}

:root {
  --intro-padding: 40dvh;
  --features-width: 300px;
}

*, *::before, *::after{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: transparent;
  font-family: var(--font-inter);
  -webkit-touch-callout: none; /* disable long press iOS menu for now --- conflicts with use-gesture drag */
  // -webkit-user-select: none;
  // outline: 1px solid red !important; // debugging
}

html,
body {
  background: var(--bg);
  color: var(--fg);
  text-align: center;
  line-height: 1.4;
  font-weight: normal;
  width: 100%;
  height: 100%;
  height: 100dvh;
  overflow: hidden;
  position: fixed;
  left: 0px;
  top: 0px;
}
body {
  overflow-y: auto;
  overscroll-behavior: none;
  scroll-behavior: smooth;
  scroll-padding-block-start: 43dvh;
}
svg {
  color:var(--titleFg)
}
strong {
  font-weight: 700;
}
h1,
h2,
h3,
h4,
h5,
h6,
strong,
.header {
  color: var(--titleFg);
  font-weight: 400;
}
a {
  color: inherit;
  text-decoration: none;
}
ul {
  list-style: none;
}

a,
button {
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  color: currentColor;
}
input, textarea, a, button {
  pointer-events: all !important;
}
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
 display: none;
}
button, input, a, [role="button"] {
  transition: 0.1s;
}
@media (hover: hover) {
  button:hover,  a:hover {
    transform: scale(1.2);
  }
}
button:active,  a:active {
  transform: scale(1);
}
button:focus-visible, input:focus-visible, a:focus-visible {
  outline: 2px dotted var(--titleFg) !important;
  outline-offset: 1px !important;
}
.react-tooltip {
  font-size: .8rem !important;
  font-weight: 400;
  background:  var(--tooltipBg)!important;
  color: var(--tooltipFg) !important;
  box-shadow: 0px 2px 5px var(--modalShadow);
  border-radius: 8px !important;
  padding: 3px 7px !important;
  z-index: 1000 !important;
}

${utilityClasses}
${radix}
`;

export const GlobalCss = createGlobalStyle`${globalCss}`;
