'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _Days = require('./MonthView/Days');

var _Days2 = _interopRequireDefault(_Days);

var _Weekdays = require('./MonthView/Weekdays');

var _Weekdays2 = _interopRequireDefault(_Weekdays);

var _WeekNumbers = require('./MonthView/WeekNumbers');

var _WeekNumbers2 = _interopRequireDefault(_WeekNumbers);

var _locales = require('./shared/locales');

var _propTypes3 = require('./shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MonthView = function (_Component) {
  (0, _inherits3.default)(MonthView, _Component);

  function MonthView() {
    (0, _classCallCheck3.default)(this, MonthView);
    return (0, _possibleConstructorReturn3.default)(this, (MonthView.__proto__ || (0, _getPrototypeOf2.default)(MonthView)).apply(this, arguments));
  }

  (0, _createClass3.default)(MonthView, [{
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
          childProps = (0, _objectWithoutProperties3.default)(_props, ['setView', 'calendarType']);


      return _react2.default.createElement(_Days2.default, (0, _extends3.default)({
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
        _react2.default.createElement(
          'div',
          { style: { display: 'flex', alignItems: 'flex-end' } },
          this.renderWeekNumbers(),
          _react2.default.createElement(
            'div',
            { style: { flexGrow: 1 } },
            this.renderWeekdays(),
            this.renderDays()
          )
        )
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
  showNeighboringMonth: _propTypes2.default.bool,
  showWeekNumbers: _propTypes2.default.bool,
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};