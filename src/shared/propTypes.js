import PropTypes from 'prop-types';

export const isCalendarType = PropTypes.oneOf(['ISO 8601', 'US']);

export const isMinDate = (props, propName, componentName) => {
  const minDate = props[propName];
  const { maxDate } = props;

  if (minDate) {
    if (!(minDate instanceof Date)) {
      return new Error(`Warning: Failed prop type: Invalid prop \`${propName}\` of type \`${typeof maxDate}\` supplied to \`${componentName}\`, expected instance of \`Date\`.`);
    }

    if (maxDate && minDate > maxDate) {
      return new Error(`Warning: Failed prop type: Invalid prop \`${propName}\` of type \`${typeof maxDate}\` supplied to \`${componentName}\`, minDate cannot be larger than maxDate.`);
    }
  }

  // Everything is fine
  return null;
};

export const isMaxDate = (props, propName, componentName) => {
  const maxDate = props[propName];
  const { minDate } = props;

  if (maxDate) {
    if (!(maxDate instanceof Date)) {
      return new Error(`Warning: Failed prop type: Invalid prop \`${propName}\` of type \`${typeof maxDate}\` supplied to \`${componentName}\`, expected instance of \`Date\`.`);
    }

    if (minDate && maxDate < minDate) {
      return new Error(`Warning: Failed prop type: Invalid prop \`${propName}\` of type \`${typeof maxDate}\` supplied to \`${componentName}\`, maxDate cannot be smaller than minDate.`);
    }
  }

  // Everything is fine
  return null;
};

export const isValue = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.arrayOf(PropTypes.instanceOf(Date)),
]);
