'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dates = require('../shared/dates');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var className = 'react-calendar__month-view__days__day';

var Day = function Day(_ref) {
  var active = _ref.active,
      currentMonthIndex = _ref.currentMonthIndex,
      date = _ref.date,
      maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      onClick = _ref.onClick,
      renderChildren = _ref.renderChildren;
  return _react2.default.createElement(
    'button',
    {
      className: [className, 'react-calendar__tile', active ? 'react-calendar__tile--active' : '', (0, _dates.isWeekend)(date) ? className + '--weekend' : '', date.getMonth() !== currentMonthIndex ? className + '--neighboringMonth' : ''].join(' '),
      disabled: minDate && (0, _dates.getBeginOfDay)(minDate) > date || maxDate && (0, _dates.getEndOfDay)(maxDate) < date,
      key: date,
      onClick: onClick && function () {
        return onClick(date);
      },
      style: { flexGrow: 1 },
      type: 'button'
    },
    _react2.default.createElement(
      'time',
      { dateTime: date.toISOString() },
      (0, _dates.getDay)(date)
    ),
    renderChildren && renderChildren({ date: date, view: 'month' })
  );
};

Day.propTypes = {
  active: _propTypes2.default.bool.isRequired,
  currentMonthIndex: _propTypes2.default.number.isRequired,
  date: _propTypes2.default.instanceOf(Date).isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onClick: _propTypes2.default.func,
  renderChildren: _propTypes2.default.func
};

exports.default = Day;