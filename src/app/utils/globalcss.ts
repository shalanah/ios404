import { a } from '@react-spring/three';

const theme = {
  dark: {
    modalShadow: '#000',
    modalBg: 'rgb(41, 41, 41)',
    modalHr: 'rgba(255, 255, 255, 0.2)',
    color: '#d8d8d8',
    bg: 'rgb(26, 26, 26)',
    badgeBg: 'rgb(0, 114, 245)',
    badgeColor: '#fff',
    badgeBorder: 'rgb(56, 144, 245)',
    codeBg: '#000',
    codeColor: '#eee',
    codeBorder: '#222',
    radioBg: '#fff',
    radioColor: 'var(--bg)',
    radioEmptyBg: 'var(--bg)',
    radioOutline: '#fff',
    titleColor: '#fff',
  },
  light: {
    modalBg: '#fff',
    modalHr: '#ccc',
    modalShadow: 'rgba(0, 0, 0, 0.5)',
    color: '#555',
    bg: '#cce9f4',
    badgeBg: 'rgb(0, 114, 245)',
    badgeColor: '#fff',
    badgeBorder: 'rgb(56, 144, 245)',
    codeBg: '#e6e6e6',
    codeColor: '#000',
    codeBorder: 'rgb(0,0,0,0.2)',
    radioBg: '#fff',
    radioColor: 'var(--color)',
    radioEmptyBg: '#eee',
    radioOutline: '#ccc',
    titleColor: '#333',
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
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: transparent;
}

strong {
  font-weight: 700;
}

html,
body {
  background: var(--bg);
  color: var(--color);
  text-align: center;
   font-family: 'Inter Tight', sans-serif;
  line-height: 1.4;
  font-weight: normal;
  width: 100%;
  height: 100%;
  height: 100dvh;
  overflow: hidden;
  position: fixed;
  left: 0px;
  top: 0px;
  /* background: linear-gradient(red, green); */
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
`;
