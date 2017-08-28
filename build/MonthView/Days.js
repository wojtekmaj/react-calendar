'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Day = require('./Day');

var _Day2 = _interopRequireDefault(_Day);

var _dates = require('../shared/dates');

var _propTypes3 = require('../shared/propTypes');

var _utils = require('../shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Days = function (_Component) {
  _inherits(Days, _Component);

  function Days() {
    _classCallCheck(this, Days);

    return _possibleConstructorReturn(this, (Days.__proto__ || Object.getPrototypeOf(Days)).apply(this, arguments));
  }

  _createClass(Days, [{
    key: 'getDayOfWeek',
    value: function getDayOfWeek(date) {
      var calendarType = this.props.calendarType;

      return (0, _dates.getDayOfWeek)(date, calendarType);
    }
  }, {
    key: 'render',
    value: function render() {
      var start = this.start,
          end = this.end,
          year = this.year,
          monthIndex = this.monthIndex;
      var _props = this.props,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          onChange = _props.onChange,
          value = _props.value,
          valueType = _props.valueType;


      var days = [];
      for (var day = start; day <= end; day += 1) {
        var date = new Date(year, monthIndex, day);

        days.push(_react2.default.createElement(_Day2.default, _extends({}, (0, _utils.getTileActivityFlags)(value, valueType, date, 'day'), {
          currentMonthIndex: monthIndex,
          date: date,
          maxDate: maxDate,
          minDate: minDate,
          key: day,
          onChange: onChange
        })));
      }

      return _react2.default.createElement(
        _Grid2.default,
        {
          className: 'react-calendar__month-view__days',
          count: 7,
          grow: true
        },
        days
      );
    }
  }, {
    key: 'start',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return -this.getDayOfWeek(activeStartDate) + 1;
    }
  }, {
    key: 'end',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;
      var year = this.year,
          monthIndex = this.monthIndex;

      var daysInMonth = (0, _dates.getDaysInMonth)(activeStartDate);
      var activeEndDate = new Date(year, monthIndex, daysInMonth);
      return (0, _dates.getDaysInMonth)(activeStartDate) + (7 - this.getDayOfWeek(activeEndDate) - 1);
    }
  }, {
    key: 'year',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getYear)(activeStartDate);
    }
  }, {
    key: 'monthIndex',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getMonthIndex)(activeStartDate);
    }
  }]);

  return Days;
}(_react.Component);

exports.default = Days;


Days.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  calendarType: _propTypes3.isCalendarType.isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onChange: _propTypes2.default.func,
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};