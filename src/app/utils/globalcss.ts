const theme = {
  dark: {
    modalShadow: '#000',
    modalBg: 'rgb(41, 41, 41)',
    modalHr: 'rgba(255, 255, 255, 0.2)',
    color: '#d8d8d8',
    bg: '#161716', //'#161616', //'#272728', //'rgb(26, 26, 26)',
    badgeBg: '#9500FF',
    badgeColor: '#fff',
    badgeBorder: '#690dac',
    codeBg: '#d7d7d7',
    codeColor: '#000',
    codeBorder: '#222',
    radioBg: '#fff',
    radioColor: 'var(--bg)',
    radioEmptyBg: 'var(--bg)',
    radioOutline: '#fff',
    titleColor: '#fff',
    vignette:
      'radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(30,30,30,.6) 100%)',
    partial: 'yellow',
  },
  light: {
    modalBg: '#fff',
    modalHr: '#afdaeb',
    modalShadow: 'rgba(0, 0, 0, 0.5)',
    color: '#555',
    bg: '#cce9f4',
    badgeBg: '#9500FF',
    badgeColor: '#fff',
    badgeBorder: '#690dac',
    codeBg: '#f9f9f988', // '#f5f5f5',
    codeColor: '#000',
    codeBorder: '#5c5c5c',
    radioBg: '#fff',
    radioColor: 'var(--color)',
    radioEmptyBg: '#eee',
    radioOutline: '#ccc',
    titleColor: '#333',
    vignette:
      'radial-gradient(ellipse at center, rgba(255, 255, 255, 0) 50%, rgba(242, 216, 216, .5) 100%)',
    partial: '#005364',
  },
};

const themeDark = Object.entries(theme.dark)
  .map(([key, value]) => `--${key}: ${value};`)
  .join('\n    ');
const themeLight = Object.entries(theme.light)
  .map(([key, value]) => `--${key}: ${value};`)
  .join('\n    ');

export const globalCss = /* css */ `
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
  --top: #eee9e2;
}


/* For radix --- TODO: put into styled comps */
@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slideUpAndFadeMore {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRightAndFade {
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeftAndFade {
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

a,
button {
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  color: currentColor;
  pointer-events: all !important;
}
input, textarea {
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
  button:hover, input:hover, a:hover, [role="button"]:hover {
    // outline: 2px dotted var(--titleColor) !important;
    // outline-offset: 2px !important;
  }
}

button:active,  a:active {
  transform: scale(1);
}

button:focus-visible, input:focus-visible, a:focus-visible {
  outline: 2px dotted var(--titleColor) !important;
  outline-offset: 1px !important;
}

*, *::before, *::after{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: transparent;
  font-family: var(--font-inter);
}

/* https://www.sarasoueidan.com/blog/accessible-icon-buttons/ */
.sr-only {
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

strong {
  font-weight: 700;
}

html,
body {
  background: var(--bg);
  color: var(--color);
  text-align: center;
  line-height: 1.4;
  font-weight: normal;
  width: 100%;
  height: 100%;
  height: 100dvh;
  overflow-x: hidden;
  position: fixed;
  overflow-y: auto;
  left: 0px;
  top: 0px;
  overscroll-behavior: none;
  scroll-behavior: smooth;
  scroll-padding-block-start: 43dvh;
}

svg {
  color:var(--titleColor)
}

h1,
h2,
h3,
h4,
h5,
h6,
strong,
.header {
  color: var(--titleColor);
  font-weight: 400;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

.pos-full-win {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  height: 100dvh;
}
.pos-top-left {
  position: absolute;
  left: 0;
  top: 0;
}


/* Utility classes */
.pos-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.pos-up-left {
  position: absolute;
  top: 0;
  left: 0;
}
.d-none {
  display: none;
}
.d-block {
  display: block;
}
.d-flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.flex-column {
  flex-direction: column;
}
.justify-content-start {
  justify-content: flex-start;
}
.justify-content-end {
  justify-content: flex-end;
}
.justify-content-center {
  justify-content: center;
}
.justify-content-between {
  justify-content: space-between;
}
.justify-content-around {
  justify-content: space-around;
}
.align-items-start {
  align-items: flex-start;
}
.align-items-end {
  align-items: flex-end;
}
.align-items-center {
  align-items: center;
}
.align-items-baseline {
  align-items: baseline;
}
.align-items-stretch {
  align-items: stretch;
}
`;
