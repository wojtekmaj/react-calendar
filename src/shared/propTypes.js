import PropTypes from 'prop-types';

export const isCalendarType = PropTypes.oneOf(['ISO 8601', 'US']);

export const isValue = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.arrayOf(PropTypes.instanceOf(Date)),
]);
