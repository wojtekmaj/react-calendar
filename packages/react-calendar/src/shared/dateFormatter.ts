import getUserLocale from 'get-user-locale';

const formatterCache = new Map();

function getFormatter(
  options: Intl.DateTimeFormatOptions,
): (locale: string | undefined, date: Date) => string {
  return function formatter(locale: string | undefined, date: Date): string {
    const localeWithDefault = locale || getUserLocale();

    if (!formatterCache.has(localeWithDefault)) {
      formatterCache.set(localeWithDefault, new Map());
    }

    const formatterCacheLocale = formatterCache.get(localeWithDefault);

    if (!formatterCacheLocale.has(options)) {
      formatterCacheLocale.set(
        options,
        new Intl.DateTimeFormat(localeWithDefault || undefined, options).format,
      );
    }

    return formatterCacheLocale.get(options)(date);
  };
}

/**
 * Changes the hour in a Date to ensure right date formatting even if DST is messed up.
 * Workaround for bug in WebKit and Firefox with historical dates.
 * For more details, see:
 * https://bugs.chromium.org/p/chromium/issues/detail?id=750465
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1385643
 *
 * @param {Date} date Date.
 * @returns {Date} Date with hour set to 12.
 */
function toSafeHour(date: Date): Date {
  const safeDate = new Date(date);
  return new Date(safeDate.setHours(12));
}

function getSafeFormatter(
  options: Intl.DateTimeFormatOptions,
): (locale: string | undefined, date: Date) => string {
  return (locale, date) => getFormatter(options)(locale, toSafeHour(date));
}

const formatDateOptions = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
} satisfies Intl.DateTimeFormatOptions;
const formatDayOptions = { day: 'numeric' } satisfies Intl.DateTimeFormatOptions;
const formatLongDateOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
} satisfies Intl.DateTimeFormatOptions;
const formatMonthOptions = { month: 'long' } satisfies Intl.DateTimeFormatOptions;
const formatMonthYearOptions = {
  month: 'long',
  year: 'numeric',
} satisfies Intl.DateTimeFormatOptions;
const formatShortWeekdayOptions = { weekday: 'short' } satisfies Intl.DateTimeFormatOptions;
const formatWeekdayOptions = { weekday: 'long' } satisfies Intl.DateTimeFormatOptions;
const formatYearOptions = { year: 'numeric' } satisfies Intl.DateTimeFormatOptions;

export const formatDate: (locale: string | undefined, date: Date) => string =
  getSafeFormatter(formatDateOptions);
export const formatDay: (locale: string | undefined, date: Date) => string =
  getSafeFormatter(formatDayOptions);
export const formatLongDate: (locale: string | undefined, date: Date) => string =
  getSafeFormatter(formatLongDateOptions);
export const formatMonth: (locale: string | undefined, date: Date) => string =
  getSafeFormatter(formatMonthOptions);
export const formatMonthYear: (locale: string | undefined, date: Date) => string =
  getSafeFormatter(formatMonthYearOptions);
export const formatShortWeekday: (locale: string | undefined, date: Date) => string =
  getSafeFormatter(formatShortWeekdayOptions);
export const formatWeekday: (locale: string | undefined, date: Date) => string =
  getSafeFormatter(formatWeekdayOptions);
export const formatYear: (locale: string | undefined, date: Date) => string =
  getSafeFormatter(formatYearOptions);
