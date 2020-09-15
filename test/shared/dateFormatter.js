/* eslint-disable import/prefer-default-export */

import getUserLocale from 'get-user-locale';

function getFormatter(options) {
  return (locale, date) => date.toLocaleString(locale || getUserLocale(), options);
}

/**
 * Changes the hour in a Date to ensure right date formatting even if DST is messed up.
 * Workaround for bug in WebKit and Firefox with historical dates.
 * For more details, see:
 * https://bugs.chromium.org/p/chromium/issues/detail?id=750465
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1385643
 *
 * @param {Date} date Date.
 */
function toSafeHour(date) {
  const safeDate = new Date(date);
  return new Date(safeDate.setHours(12));
}

function getSafeFormatter(options) {
  return (locale, date) => getFormatter(options)(locale, toSafeHour(date));
}

const formatDateOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };

export const formatDate = getSafeFormatter(formatDateOptions);
