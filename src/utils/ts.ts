// Utilities to make TypeScript better to deal with
export const typedEntries = <T>(obj: T) => {
  return Object.entries(obj!) as [keyof T, T[keyof T]][];
};
export const typedValues = <T>(obj: T) => {
  return Object.values(obj!) as T[keyof T][];
};
export const typedKeys = <T>(obj: T) => {
  return Object.keys(obj!) as (keyof T)[];
};
