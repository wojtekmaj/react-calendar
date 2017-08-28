import { getLocale } from './locales';

const formatterCache = {};

/**
 * Gets Intl-based date formatter from formatter cache. If it doesn't exist in cache
 * just yet, it will be created on the fly.
 */
const getFormatter = (options, locales = getLocale()) => {
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

export const formatShortWeekday = date => getFormatter(
  { weekday: 'short' },
)(date);
