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

/**
 * Changes the hour in a Date to ensure right date formatting even if DST is messed up.
 * Workaround for bug in WebKit and Firefox with historical dates.
 * For more details, see:
 * https://bugs.chromium.org/p/chromium/issues/detail?id=750465
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1385643
 *
 * @param {Date} date Date.
 */
const toSafeHour = (date) => {
  const safeDate = new Date(date);
  return new Date(safeDate.setHours(12));
};

export const formatDate = date => getFormatter(
  { day: 'numeric', month: 'numeric', year: 'numeric' },
)(toSafeHour(date));

export const formatMonthYear = date => getFormatter(
  { month: 'long', year: 'numeric' },
)(toSafeHour(date));

export const formatMonth = date => getFormatter(
  { month: 'long' },
)(toSafeHour(date));

export const formatShortWeekday = date => getFormatter(
  { weekday: 'short' },
)(toSafeHour(date));
