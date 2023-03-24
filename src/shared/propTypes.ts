import PropTypes from 'prop-types';

import { CALENDAR_TYPES } from './const';

const calendarTypes = Object.values(CALENDAR_TYPES);
const allViews = ['century', 'decade', 'year', 'month'];

export const isCalendarType = PropTypes.oneOf(calendarTypes);

export const isClassName = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string),
]);

export function isMinDate(props: Record<string, unknown>, propName: string, componentName: string) {
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
}

export function isMaxDate(props: Record<string, unknown>, propName: string, componentName: string) {
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
}

export const isRef = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({
    current: PropTypes.any,
  }),
]);

export const isValue = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.arrayOf(PropTypes.instanceOf(Date)),
]);

export const isViews = PropTypes.arrayOf(PropTypes.oneOf(allViews));

export function isView(
  props: Record<string, unknown> & { views?: string[] },
  propName: string,
  componentName: string,
) {
  const { [propName]: view } = props;
  const { views } = props;

  const allowedViews = views || allViews;

  if (view !== undefined && (typeof view !== 'string' || allowedViews.indexOf(view) === -1)) {
    return new Error(
      `Invalid prop \`${propName}\` of value \`${view}\` supplied to \`${componentName}\`, expected one of [${allowedViews
        .map((a) => `"${a}"`)
        .join(', ')}].`,
    );
  }

  // Everything is fine
  return null;
}

isView.isRequired = (props: Record<string, unknown>, propName: string, componentName: string) => {
  const { [propName]: view } = props;

  if (!view) {
    return new Error(
      `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${view}\`.`,
    );
  }

  return isView(props, propName, componentName);
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
  valueType: PropTypes.string,
};

export const tileProps = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  classes: PropTypes.arrayOf(PropTypes.string).isRequired,
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
