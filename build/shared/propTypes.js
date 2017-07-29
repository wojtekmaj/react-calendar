'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValue = exports.isCalendarType = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isCalendarType = exports.isCalendarType = _propTypes2.default.oneOf(['ISO 8601', 'US']);

var isValue = exports.isValue = _propTypes2.default.oneOfType([_propTypes2.default.instanceOf(Date), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(Date))]);