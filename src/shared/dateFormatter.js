import getUserLocale from 'get-user-locale';

const formatterCache = {};

/**
 * Gets Intl-based date formatter from formatter cache. If it doesn't exist in cache
 * just yet, it will be created on the fly.
 */
const getFormatter = (options, locale) => {
  if (!locale) {
    // Default parameter is not enough as it does not protect us from null values
    // eslint-disable-next-line no-param-reassign
    locale = getUserLocale();
  }

  const stringifiedOptions = JSON.stringify(options);

  if (!formatterCache[locale]) {
    formatterCache[locale] = {};
  }

  if (!formatterCache[locale][stringifiedOptions]) {
    formatterCache[locale][stringifiedOptions] = new Intl.DateTimeFormat(locale, options).format;
  }

  return formatterCache[locale][stringifiedOptions];
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

export const formatDate = (date, locale) => getFormatter(
  { day: 'numeric', month: 'numeric', year: 'numeric' },
  locale,
)(toSafeHour(date));

export const formatMonthYear = (date, locale) => getFormatter(
  { month: 'long', year: 'numeric' },
  locale,
)(toSafeHour(date));

export const formatMonth = (date, locale) => getFormatter(
  { month: 'long' },
  locale,
)(toSafeHour(date));

export const formatShortWeekday = (date, locale) => getFormatter(
  { weekday: 'short' },
  locale,
)(toSafeHour(date));
