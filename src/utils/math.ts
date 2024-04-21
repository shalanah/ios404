export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export const roundTo = (num: number, places: number) =>
  Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
