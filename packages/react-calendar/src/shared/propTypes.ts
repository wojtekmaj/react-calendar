import PropTypes from 'prop-types';

import { CALENDAR_TYPES, DEPRECATED_CALENDAR_TYPES } from './const.js';

import type { Requireable, Validator } from 'prop-types';
import type { Range, View } from './types.js';

const calendarTypes = Object.values(CALENDAR_TYPES);
const deprecatedCalendarTypes = Object.values(DEPRECATED_CALENDAR_TYPES);
const allViews = ['century', 'decade', 'year', 'month'];

export const isCalendarType = PropTypes.oneOf([
  ...calendarTypes,
  ...deprecatedCalendarTypes,
] as const);

export const isClassName = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string),
]);

export const isMinDate: Validator<Date | null | undefined> = function isMinDate(
  props,
  propName,
  componentName,
) {
  const { [propName]: minDate } = props;

  if (!minDate) {
    return null;
  }

  if (!(minDate instanceof Date)) {
    return new Error(
      `Invalid prop \`${propName}\` of type \`${typeof minDate}\` supplied to \`${componentName}\`, expected instance of \`Date\`.`,
    );
  }

  const { maxDate } = props;

  if (maxDate && minDate > maxDate) {
    return new Error(
      `Invalid prop \`${propName}\` of type \`${typeof minDate}\` supplied to \`${componentName}\`, minDate cannot be larger than maxDate.`,
    );
  }

  return null;
};

export const isMaxDate: Validator<Date | null | undefined> = function isMaxDate(
  props,
  propName,
  componentName,
) {
  const { [propName]: maxDate } = props;

  if (!maxDate) {
    return null;
  }

  if (!(maxDate instanceof Date)) {
    return new Error(
      `Invalid prop \`${propName}\` of type \`${typeof maxDate}\` supplied to \`${componentName}\`, expected instance of \`Date\`.`,
    );
  }

  const { minDate } = props;

  if (minDate && maxDate < minDate) {
    return new Error(
      `Invalid prop \`${propName}\` of type \`${typeof maxDate}\` supplied to \`${componentName}\`, maxDate cannot be smaller than minDate.`,
    );
  }

  return null;
};

export const isRef = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.exact({
    current: PropTypes.any,
  }),
]);

const isRange = PropTypes.arrayOf(
  PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([null])]).isRequired,
) as Requireable<Range<Date>>;

export const isValue = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.oneOf([null]),
  isRange,
]);

export const isViews = PropTypes.arrayOf(PropTypes.oneOf(allViews));

export const isView: Requireable<View> = function isView(props, propName, componentName) {
  const { [propName]: view } = props;

  if (view !== undefined && (typeof view !== 'string' || allViews.indexOf(view) === -1)) {
    return new Error(
      `Invalid prop \`${propName}\` of value \`${view}\` supplied to \`${componentName}\`, expected one of [${allViews
        .map((a) => `"${a}"`)
        .join(', ')}].`,
    );
  }

  // Everything is fine
  return null;
};

isView.isRequired = function isViewIsRequired(
  props,
  propName,
  componentName,
  location,
  propFullName,
) {
  const { [propName]: view } = props;

  if (!view) {
    return new Error(
      `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${view}\`.`,
    );
  }

  return isView(props, propName, componentName, location, propFullName);
};

export const rangeOf = <T>(type: Requireable<T>): Requireable<Range<T>> => {
  return PropTypes.arrayOf(type) as Requireable<Range<T>>;
};

export const tileGroupProps = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  hover: PropTypes.instanceOf(Date),
  locale: PropTypes.string,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  tileClassName: PropTypes.oneOfType([PropTypes.func, isClassName]),
  tileContent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  value: isValue,
  valueType: PropTypes.oneOf(['century', 'decade', 'year', 'month', 'day'] as const).isRequired,
};

export const tileProps = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  classes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  locale: PropTypes.string,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  tileClassName: PropTypes.oneOfType([PropTypes.func, isClassName]),
  tileContent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  tileDisabled: PropTypes.func,
};
