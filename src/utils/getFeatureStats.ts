export const getMissingDate = (dateSupported: number | string = '0') => {
  const firstSeenDate: number = Number(dateSupported);
  const date = new Date(firstSeenDate * 1000).getFullYear();
  const age = new Date().getFullYear() - date;
  return {
    age: `${age}${age === 1 ? ' year' : ' years'}`,
    year: date,
  };
};
