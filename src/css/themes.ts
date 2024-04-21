export const themes = {
  dark: {
    modalShadow: '#000',
    modalBg: 'rgb(41, 44, 49)',
    modalHr: 'rgba(255, 255, 255, 0.2)',
    fg: '#d8d8d8',
    bg: '#161616',
    badgeBgNonActive: 'rgb(60, 60, 60)',
    badgeBorderNonActive: 'rgb(60, 60, 60)',
    badgeFgNonActive: '#b7b7b7',
    badgeBg: '#fff',
    badgeFg: 'var(--bg)',
    badgeBorder: '#fff',
    codeBg: '#d7d7d7',
    codeFg: '#000',
    radioBg: '#fff',
    radioFg: 'var(--bg)',
    radioEmptyBg: 'var(--bg)',
    radioOutline: '#fff',
    dotPartial: '#ffd65b',
    dotNo: '#e4014d',
    specPartial: '#ffea49',
    specNo: '#ff5154',
    specY: ' #13df80',
    titleFg: '#fff',
    vignette:
      'radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(30,30,30,.6) 100%)',
    tooltipFg: '#333',
    tooltipBg: '#fff',
    cartonBd: '#545454be',
  },
  light: {
    modalBg: '#fff',
    modalHr: '#afdaeb',
    modalShadow: 'rgba(0, 0, 0, 0.2)',
    fg: '#555',
    bg: '#cce9f4',
    badgeBgNonActive: '#eee',
    badgeFgNonActive: '#777',
    badgeBorderNonActive: '#ccc',
    badgeBg: '#222',
    badgeFg: '#efefef',
    badgeBorder: '#5c5c5c',
    codeBg: '#f9f9f988', // '#f5f5f5',
    codeFg: '#000',
    radioBg: '#fff',
    radioFg: 'var(--fg)',
    radioEmptyBg: '#eee',
    radioOutline: '#ccc',
    titleFg: '#333',
    dotPartial: '#fc7210',
    dotNo: '#d20e53',
    specPartial: '#c65f0b',
    specNo: '#cd0011',
    specY: '#08933d',
    vignette:
      'radial-gradient(ellipse at center, rgba(255, 255, 255, 0) 50%, rgba(242, 216, 216, .5) 100%)',
    tooltipFg: '#333',
    tooltipBg: '#fff',
    cartonBd: '#bdb8b2d0',
  },
};

export const themeDark = Object.entries(themes.dark)
  .map(([key, value]) => `--${key}: ${value};`)
  .join('\n    ');
export const themeLight = Object.entries(themes.light)
  .map(([key, value]) => `--${key}: ${value};`)
  .join('\n    ');
