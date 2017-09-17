'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _dates = require('../shared/dates');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WeekNumbers = function (_Component) {
  (0, _inherits3.default)(WeekNumbers, _Component);

  function WeekNumbers() {
    (0, _classCallCheck3.default)(this, WeekNumbers);
    return (0, _possibleConstructorReturn3.default)(this, (WeekNumbers.__proto__ || (0, _getPrototypeOf2.default)(WeekNumbers)).apply(this, arguments));
  }

  (0, _createClass3.default)(WeekNumbers, [{
    key: 'render',
    value: function render() {
      var startWeekNumber = this.startWeekNumber;

      var weekNumbers = [];
      for (var index = 0; index < this.numberOfWeeks; index += 1) {
        var currentNumber = index + startWeekNumber;
        weekNumbers.push(currentNumber > 52 ? currentNumber % 52 : currentNumber);
      }

      return _react2.default.createElement(
        'div',
        {
          className: 'react-calendar__month-view__weekNumbers',
          style: { flexBasis: 'calc(100% * (1 / 8)', flexShrink: 0 }
        },
        weekNumbers.map(function (weekNumber) {
          return _react2.default.createElement(
            'div',
            {
              className: 'react-calendar__tile',
              key: weekNumber
            },
            _react2.default.createElement(
              'span',
              null,
              weekNumber
            )
          );
        })
      );
    }
  }, {
    key: 'numberOfDays',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getDaysInMonth)(activeStartDate);
    }
  }, {
    key: 'startWeekday',
    get: function get() {
      var _props = this.props,
          activeStartDate = _props.activeStartDate,
          calendarType = _props.calendarType;

      return (0, _dates.getDayOfWeek)(activeStartDate, calendarType);
    }
  }, {
    key: 'startWeekNumber',
    get: function get() {
      var _props2 = this.props,
          activeStartDate = _props2.activeStartDate,
          calendarType = _props2.calendarType;

      return (0, _dates.getWeekNumber)(activeStartDate, calendarType);
    }
  }, {
    key: 'numberOfWeeks',
    get: function get() {
      var days = this.numberOfDays - (7 - this.startWeekday);
      var weeks = 1 + Math.ceil(days / 7);

      return weeks;
    }
  }]);
  return WeekNumbers;
}(_react.Component);

exports.default = WeekNumbers;


WeekNumbers.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  calendarType: _propTypes3.isCalendarType.isRequired
};