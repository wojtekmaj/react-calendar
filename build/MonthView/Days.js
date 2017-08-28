'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var Days = function (_Component) {
  (0, _inherits3.default)(Days, _Component);

  function Days() {
    (0, _classCallCheck3.default)(this, Days);
    return (0, _possibleConstructorReturn3.default)(this, (Days.__proto__ || (0, _getPrototypeOf2.default)(Days)).apply(this, arguments));
  }

  (0, _createClass3.default)(Days, [{
    key: 'render',
    value: function render() {
      var start = this.start,
          end = this.end,
          year = this.year,
          monthIndex = this.monthIndex;
      var _props = this.props,
          calendarType = _props.calendarType,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          onChange = _props.onChange,
          value = _props.value,
          valueType = _props.valueType;


      var days = [];
      for (var day = start; day <= end; day += 1) {
        var date = new Date(year, monthIndex, day);

        days.push(_react2.default.createElement(_Day2.default, (0, _extends3.default)({}, (0, _utils.getTileActivityFlags)(value, valueType, date, 'day'), {
          calendarType: calendarType,
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

    /**
     * Defines on which day of the month the grid shall start. If we simply show current
     * month, we obviously start on day one, but if showNeighboringMonth is set to
     * true, we need to find the beginning of the week the first day of the month is in.
     */
    get: function get() {
      var showNeighboringMonth = this.props.showNeighboringMonth;

      if (showNeighboringMonth) {
        var _props2 = this.props,
            activeStartDate = _props2.activeStartDate,
            calendarType = _props2.calendarType;

        return -(0, _dates.getDayOfWeek)(activeStartDate, calendarType) + 1;
      }
      return 1;
    }

    /**
     * Defines on which day of the month the grid shall end. If we simply show current
     * month, we need to stop on the last day of the month, but if showNeighboringMonth
     * is set to true, we need to find the end of the week the last day of the month is in.
     */

  }, {
    key: 'end',
    get: function get() {
      var _props3 = this.props,
          activeStartDate = _props3.activeStartDate,
          showNeighboringMonth = _props3.showNeighboringMonth;

      var daysInMonth = (0, _dates.getDaysInMonth)(activeStartDate);
      if (showNeighboringMonth) {
        var year = this.year,
            monthIndex = this.monthIndex;
        var calendarType = this.props.calendarType;

        var activeEndDate = new Date(year, monthIndex, daysInMonth);
        return daysInMonth + (7 - (0, _dates.getDayOfWeek)(activeEndDate, calendarType) - 1);
      }
      return daysInMonth;
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
  showNeighboringMonth: _propTypes2.default.bool,
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};