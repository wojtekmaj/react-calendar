const formatterCache = {};

/**
 * Gets Intl-based date formatter from formatter cache. If it doesn't exist in cache
 * just yet, it will be created on the fly.
 */
export const getFormatter = (options, locales = 'en-GB') => {
  const stringifiedOptions = JSON.stringify(options);

  if (!formatterCache[locales]) {
    formatterCache[locales] = {};
  }

  if (!formatterCache[locales][stringifiedOptions]) {
    formatterCache[locales][stringifiedOptions] = new Intl.DateTimeFormat(locales, options).format;
  }

  return formatterCache[locales][stringifiedOptions];
};

export const formatDate = date => getFormatter(
  { day: 'numeric', month: 'numeric', year: 'numeric' },
)(date);

export const formatMonthYear = date => getFormatter(
  { month: 'long', year: 'numeric' },
)(date);

export const formatMonth = date => getFormatter(
  { month: 'long' },
)(date);

export const getYear = (date) => {
  if (date instanceof Date) {
    return date.getFullYear();
  }

  if (typeof date === 'number') {
    return date;
  }

  const year = parseInt(date, 10);

  if (typeof date === 'string' && !isNaN(year)) {
    return year;
  }

  throw new Error(`Failed to get year from date: ${date}.`);
};

export const getMonthIndex = date => date.getMonth();

export const getMonth = date => getMonthIndex(date) + 1;

export const getBeginOfCenturyYear = (date) => {
  const year = getYear(date);

  return year - (year % 100);
};

export const getBeginOfCentury = (date) => {
  const beginOfCenturyYear = getBeginOfCenturyYear(date);

  return new Date(beginOfCenturyYear, 0, 1);
};

export const getEndOfCentury = (date) => {
  const beginOfCenturyYear = getBeginOfCenturyYear(date);

  return new Date(beginOfCenturyYear + 100, 0, 0, 0, 0, 0, -1);
};

export const getBeginOfDecadeYear = (date) => {
  const year = getYear(date);

  return year - (year % 10);
};

export const getBeginOfDecade = (date) => {
  const beginOfDecadeYear = getBeginOfDecadeYear(date);

  return new Date(beginOfDecadeYear, 0, 1);
};

export const getEndOfDecade = (date) => {
  const beginOfDecadeYear = getBeginOfDecadeYear(date);

  return new Date(beginOfDecadeYear + 10, 0, 1, 0, 0, 0, -1);
};

export const getBeginOfYear = (date) => {
  const year = getYear(date);

  return new Date(year, 0, 1);
};

export const getEndOfYear = (date) => {
  const year = getYear(date);

  return new Date(year + 1, 0, 1, 0, 0, 0, -1);
};

export const getBeginOfMonth = (date) => {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);

  return new Date(year, monthIndex, 1);
};

export const getEndOfMonth = (date) => {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);

  return new Date(year, monthIndex + 1, 1, 0, 0, 0, -1);
};

export const getDaysInMonth = (date) => {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);

  return new Date(year, monthIndex + 1, 0).getDate();
};
