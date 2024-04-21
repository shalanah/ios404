export const utilityClasses = /* css */ `
.pointer-all, .pointer-all * {
  pointer-events: all !important;
  user-select: auto !important;
}
.user-select-none, .user-select-none * {
  user-select: none !important;
}
.dragging-css, .dragging-css * {
  cursor: grabbing !important;
  button, a {
    // Halt button interaction while we're at it
    pointer-events: none !important;
  }
}
.no-scroll {
  overflow: hidden;
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
.pos-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
