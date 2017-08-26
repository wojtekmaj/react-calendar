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

var _Days = require('./MonthView/Days');

var _Days2 = _interopRequireDefault(_Days);

var _Weekdays = require('./MonthView/Weekdays');

var _Weekdays2 = _interopRequireDefault(_Weekdays);

var _WeekNumbers = require('./MonthView/WeekNumbers');

var _WeekNumbers2 = _interopRequireDefault(_WeekNumbers);

var _locales = require('./shared/locales');

var _propTypes3 = require('./shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MonthView = function (_Component) {
  _inherits(MonthView, _Component);

  function MonthView() {
    _classCallCheck(this, MonthView);

    return _possibleConstructorReturn(this, (MonthView.__proto__ || Object.getPrototypeOf(MonthView)).apply(this, arguments));
  }

  _createClass(MonthView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var setView = this.props.setView;


      if (setView) setView('month');
    }
  }, {
    key: 'renderWeekdays',
    value: function renderWeekdays() {
      var calendarType = this.calendarType;
      var activeStartDate = this.props.activeStartDate;


      return _react2.default.createElement(_Weekdays2.default, {
        calendarType: calendarType,
        month: activeStartDate
      });
    }
  }, {
    key: 'renderWeekNumbers',
    value: function renderWeekNumbers() {
      var showWeekNumbers = this.props.showWeekNumbers;


      if (!showWeekNumbers) {
        return null;
      }

      var calendarType = this.calendarType;
      var activeStartDate = this.props.activeStartDate;


      return _react2.default.createElement(_WeekNumbers2.default, {
        activeStartDate: activeStartDate,
        calendarType: calendarType
      });
    }
  }, {
    key: 'renderDays',
    value: function renderDays() {
      var _props = this.props,
          setView = _props.setView,
          calendarType = _props.calendarType,
          childProps = _objectWithoutProperties(_props, ['setView', 'calendarType']);

      return _react2.default.createElement(_Days2.default, _extends({
        calendarType: this.calendarType
      }, childProps));
    }
  }, {
    key: 'render',
    value: function render() {
      var showWeekNumbers = this.props.showWeekNumbers;


      var className = 'react-calendar__month-view';

      return _react2.default.createElement(
        'div',
        {
          className: [className, showWeekNumbers ? className + '--weekNumbers' : ''].join(' ')
        },
        this.renderWeekdays(),
        this.renderWeekNumbers(),
        this.renderDays()
      );
    }
  }, {
    key: 'calendarType',
    get: function get() {
      var calendarType = this.props.calendarType;


      if (calendarType) {
        return calendarType;
      }

      switch ((0, _locales.getLocale)()) {
        case 'en-US':
          return 'US';
        default:
          return 'ISO 8601';
      }
    }
  }]);

  return MonthView;
}(_react.Component);

exports.default = MonthView;


MonthView.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  calendarType: _propTypes3.isCalendarType,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onChange: _propTypes2.default.func,
  setActiveRange: _propTypes2.default.func,
  setView: _propTypes2.default.func,
  showWeekNumbers: _propTypes2.default.bool,
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};