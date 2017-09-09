/**
 * Returns local date in ISO-like format (YYYY-MM-DD).
 */
export const getISOLocalDate = (value) => {
  if (!value) {
    return value;
  }

  if (!(value instanceof Date)) {
    throw new Error(`Invalid date: ${value}`);
  }

  const year = getYear(value);
  const month = `0${getMonthIndex(value) + 1}`.slice(-2);
  const day = `0${getDay(value)}`.slice(-2);

  return `${year}-${month}-${day}`;
};
