'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isView = exports.isViews = exports.isValue = exports.isMaxDate = exports.isMinDate = exports.isCalendarType = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calendarTypes = ['ISO 8601', 'US'];
var allViews = ['century', 'decade', 'year', 'month'];

var isCalendarType = exports.isCalendarType = _propTypes2.default.oneOf(calendarTypes);

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

var isViews = exports.isViews = _propTypes2.default.arrayOf(_propTypes2.default.oneOf(allViews));

var isView = exports.isView = function isView(props, propName, componentName) {
  var view = props[propName];
  var views = props.views;


  var allowedViews = views || allViews;

  if (allowedViews.indexOf(view) === -1) {
    return new Error('Warning: Failed prop type: Invalid prop `' + propName + '` of value `' + view + '` supplied to `' + componentName + '`, expected one of [' + ['a', 'b', 'c', 'd', 'e'].map(function (a) {
      return '"' + a + '"';
    }).join(', ') + '].');
  }

  // Everything is fine
  return null;
};

isView.isRequired = function (props, propName, componentName) {
  var view = props[propName];
  if (!view) {
    return new Error('Warning: Failed prop type: The prop `' + propName + '` is marked as required in `' + componentName + '`, but its value is `' + view + '`.');
  }
  return isView(props, propName, componentName);
};