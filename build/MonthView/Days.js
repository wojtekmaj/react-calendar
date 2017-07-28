'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    key: 'render',
    value: function render() {
      var year = this.year,
          monthIndex = this.monthIndex;
      var _props = this.props,
          calendarType = _props.calendarType,
          month = _props.month,
          onClickDay = _props.onClickDay;


      var days = [];
      for (var day = 1; day <= (0, _dates.getDaysInMonth)(month); day += 1) {
        days.push(_react2.default.createElement(_Day2.default, {
          calendarType: calendarType,
          day: new Date(year, monthIndex, day),
          key: day,
          onClick: onClickDay
        }));
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
    key: 'year',
    get: function get() {
      var month = this.props.month;


      return (0, _dates.getYear)(month);
    }
  }, {
    key: 'monthIndex',
    get: function get() {
      var month = this.props.month;


      return (0, _dates.getMonthIndex)(month);
    }
  }]);

  return Days;
}(_react.Component);

exports.default = Days;


Days.propTypes = {
  calendarType: _propTypes3.isCalendarType,
  month: _propTypes2.default.oneOfType([_propTypes2.default.string, // Only strings that are parseable to integer
  _propTypes2.default.number, _propTypes2.default.instanceOf(Date)]).isRequired,
  onClickDay: _propTypes2.default.func
};