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
      calendarType = _ref.calendarType,
      date = _ref.date,
      onChange = _ref.onChange;
  return _react2.default.createElement(
    'button',
    {
      className: [className, 'react-calendar__tile', active ? 'react-calendar__tile--active' : '', (0, _dates.isWeekend)(date) ? className + '--weekend' : ''].join(' '),
      key: date,
      onClick: onChange && function () {
        return onChange(date);
      },
      style: (0, _dates.getDay)(date) === 1 ? {
        gridColumnStart: (0, _dates.getDayOfWeek)(date, calendarType) + 1
      } : null
    },
    _react2.default.createElement(
      'time',
      { dateTime: date.toISOString() },
      (0, _dates.getDay)(date)
    )
  );
};

Day.propTypes = {
  active: _propTypes2.default.bool.isRequired,
  calendarType: _propTypes3.isCalendarType,
  date: _propTypes2.default.instanceOf(Date).isRequired,
  onChange: _propTypes2.default.func
};

exports.default = Day;