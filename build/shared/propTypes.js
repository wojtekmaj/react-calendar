'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValue = exports.isMaxDate = exports.isMinDate = exports.isCalendarType = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isCalendarType = exports.isCalendarType = _propTypes2.default.oneOf(['ISO 8601', 'US']);

var isMinDate = exports.isMinDate = function isMinDate(props, propName, componentName) {
  var minDate = props[propName];
  var maxDate = props.maxDate;


  if (minDate) {
    if (!(minDate instanceof Date)) {
      return new Error('Warning: Failed prop type: Invalid prop `' + propName + '` of type `' + (typeof maxDate === 'undefined' ? 'undefined' : (0, _typeof3.default)(maxDate)) + '` supplied to `' + componentName + '`, expected instance of `Date`.');
    }

    if (maxDate && minDate > maxDate) {
      return new Error('Warning: Failed prop type: Invalid prop `' + propName + '` of type `' + (typeof maxDate === 'undefined' ? 'undefined' : (0, _typeof3.default)(maxDate)) + '` supplied to `' + componentName + '`, minDate cannot be larger than maxDate.');
    }
  }

  // Everything is fine
  return null;
};

var isMaxDate = exports.isMaxDate = function isMaxDate(props, propName, componentName) {
  var maxDate = props[propName];
  var minDate = props.minDate;


  if (maxDate) {
    if (!(maxDate instanceof Date)) {
      return new Error('Warning: Failed prop type: Invalid prop `' + propName + '` of type `' + (typeof maxDate === 'undefined' ? 'undefined' : (0, _typeof3.default)(maxDate)) + '` supplied to `' + componentName + '`, expected instance of `Date`.');
    }

    if (minDate && maxDate < minDate) {
      return new Error('Warning: Failed prop type: Invalid prop `' + propName + '` of type `' + (typeof maxDate === 'undefined' ? 'undefined' : (0, _typeof3.default)(maxDate)) + '` supplied to `' + componentName + '`, maxDate cannot be smaller than minDate.');
    }
  }

  // Everything is fine
  return null;
};

var isValue = exports.isValue = _propTypes2.default.oneOfType([_propTypes2.default.instanceOf(Date), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(Date))]);