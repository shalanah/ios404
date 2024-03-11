import { a } from '@react-spring/three';

const theme = {
  dark: {
    modalShadow: '#000',
    modalBg: 'rgb(41, 41, 41)',
    modalHr: 'rgba(255, 255, 255, 0.2)',
    color: '#d8d8d8',
    bg: 'rgb(26, 26, 26)',
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
  },
  light: {
    modalBg: '#fff',
    modalHr: '#ccc',
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
--left-gutter: 26vw; 
  --intro-padding: 40dvh;
  --features-width: 300px;
  --top: #eee9e2;
  --carton-left: calc(var(--left-gutter) * 0.525);
  @media (max-width: 1500px) {
    --left-gutter: 22vw;
  }
  @media (max-width: 1300px) {
    --left-gutter: 20vw;
  }
  @media (max-width: 1200px) {
    --left-gutter: 13vw;
  }
  @media (max-width: 1100px) {
    --left-gutter: 10vw;
  }}


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
