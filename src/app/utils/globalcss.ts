export const globalCss = /* css */ `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100..900&display=swap');


@media (prefers-color-scheme: dark) {
  :root {
    --modalShadow: #000;
    --modalBg: #333;
    --color: #d8d8d8;
    --bg: #000;
  }
}
@media (prefers-color-scheme: light) {
  :root {
    --modalBg: #fff;
    --modalShadow: rgba(0, 0, 0, 0.5);
    --color: #000;
    --bg: #bad1df;
  }
}
.light {
  --modalBg: #fff;
  --modalShadow: rgba(0, 0, 0, 0.5);
  --color: #000;
  --bg: #bad1df;
}
.dark {
  --modalShadow: #000;
  --modalBg: #333;
  --color: #d8d8d8;
  --bg: #000;
}

/* For radix */

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
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: transparent;
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

h1,
h2,
h3,
h4,
h5,
h6,
.header {
  font-weight: 400;
}

a {
  color: inherit;
  text-decoration: none;
}
a,
button {
  cursor: pointer !important;
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