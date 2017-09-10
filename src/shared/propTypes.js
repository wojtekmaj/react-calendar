import PropTypes from 'prop-types';

const calendarTypes = ['ISO 8601', 'US'];
const allViews = ['century', 'decade', 'year', 'month'];

export const isCalendarType = PropTypes.oneOf(calendarTypes);

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

export const isViews = PropTypes.arrayOf(PropTypes.oneOf(allViews));

export const isView = (props, propName, componentName) => {
  const view = props[propName];
  const { views } = props;

  const allowedViews = views || allViews;

  if (allowedViews.indexOf(view) === -1) {
    return new Error(`Warning: Failed prop type: Invalid prop \`${propName}\` of value \`${view}\` supplied to \`${componentName}\`, expected one of [${['a', 'b', 'c', 'd', 'e'].map(a => `"${a}"`).join(', ')}].`);
  }

  // Everything is fine
  return null;
};

isView.isRequired = (props, propName, componentName) => {
  const view = props[propName];
  if (!view) {
    return new Error(`Warning: Failed prop type: The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${view}\`.`);
  }
  return isView(props, propName, componentName);
};
