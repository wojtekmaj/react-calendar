'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dates = require('../shared/dates');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WeekNumbers = function (_Component) {
  _inherits(WeekNumbers, _Component);

  function WeekNumbers() {
    _classCallCheck(this, WeekNumbers);

    return _possibleConstructorReturn(this, (WeekNumbers.__proto__ || Object.getPrototypeOf(WeekNumbers)).apply(this, arguments));
  }

  _createClass(WeekNumbers, [{
    key: 'render',
    value: function render() {
      var startWeekNumber = this.startWeekNumber;

      var weekNumbers = Array(this.numberOfWeeks).fill(null).map(function (item, index) {
        return index + startWeekNumber;
      }).map(function (item) {
        return item > 52 ? item % 52 : item;
      });

      return _react2.default.createElement(
        'div',
        { className: 'react-calendar__month-view__weekNumbers' },
        weekNumbers.map(function (weekNumber) {
          return _react2.default.createElement(
            'div',
            {
              className: 'react-calendar__tile',
              key: weekNumber
            },
            weekNumber
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