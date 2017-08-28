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

  return `${
    value.getFullYear()
  }-${
    `0${value.getMonth() + 1}`.slice(-2)
  }-${
    `0${value.getDate()}`.slice(-2)
  }`;
};