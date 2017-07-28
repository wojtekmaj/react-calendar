'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Days = require('./MonthView/Days');

var _Days2 = _interopRequireDefault(_Days);

var _Weekdays = require('./MonthView/Weekdays');

var _Weekdays2 = _interopRequireDefault(_Weekdays);

var _propTypes3 = require('./shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var _props = this.props,
          calendarType = _props.calendarType,
          month = _props.month;


      return _react2.default.createElement(_Weekdays2.default, {
        calendarType: calendarType,
        month: month
      });
    }
  }, {
    key: 'renderDays',
    value: function renderDays() {
      var _props2 = this.props,
          calendarType = _props2.calendarType,
          month = _props2.month,
          onClickDay = _props2.onClickDay,
          setActiveRange = _props2.setActiveRange;


      return _react2.default.createElement(_Days2.default, {
        calendarType: calendarType,
        month: month,
        onClickDay: onClickDay,
        setActiveRange: setActiveRange
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'react-calendar__month-view' },
        this.renderWeekdays(),
        this.renderDays()
      );
    }
  }]);

  return MonthView;
}(_react.Component);

exports.default = MonthView;


MonthView.defaultProps = {
  calendarType: 'ISO 8601'
};

MonthView.propTypes = {
  calendarType: _propTypes3.isCalendarType,
  month: _propTypes2.default.oneOfType([_propTypes2.default.string, // Only strings that are parseable to integer
  _propTypes2.default.number, _propTypes2.default.instanceOf(Date)]).isRequired,
  onClickDay: _propTypes2.default.func,
  setActiveRange: _propTypes2.default.func,
  setView: _propTypes2.default.func
};