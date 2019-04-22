import getUserLocale from 'get-user-locale';

const getFormatter = options => (locale, date) => (
  date.toLocaleString(locale || getUserLocale(), options)
);

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

const getSafeFormatter = options => (locale, date) => (
  getFormatter(options)(locale, toSafeHour(date))
);

const formatDateOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
const formatLongDateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
const formatMonthYearOptions = { month: 'long', year: 'numeric' };
const formatMonthOptions = { month: 'long' };
const formatWeekdayOptions = { weekday: 'long' };
const formatShortWeekdayOptions = { weekday: 'short' };

export const formatDate = getSafeFormatter(formatDateOptions);
export const formatLongDate = getSafeFormatter(formatLongDateOptions);
export const formatMonthYear = getSafeFormatter(formatMonthYearOptions);
export const formatMonth = getSafeFormatter(formatMonthOptions);
export const formatWeekday = getSafeFormatter(formatWeekdayOptions);
export const formatShortWeekday = getSafeFormatter(formatShortWeekdayOptions);
