'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCalendarType = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */

var isCalendarType = exports.isCalendarType = _propTypes2.default.oneOf(['ISO 8601', 'US']);