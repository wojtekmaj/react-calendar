/* eslint-disable import/prefer-default-export */

import PropTypes from 'prop-types';

export const isValue = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.arrayOf(PropTypes.instanceOf(Date)),
]);
