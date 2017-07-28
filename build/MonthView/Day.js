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
  var calendarType = _ref.calendarType,
      day = _ref.day,
      _onClick = _ref.onClick;
  return _react2.default.createElement(
    'button',
    {
      className: [className, 'react-calendar__tile', (0, _dates.isWeekend)(day) ? ' ' + className + '--weekend' : ''].join(' '),
      key: day,
      onClick: function onClick() {
        if (_onClick) _onClick((0, _dates.getDayRange)(day));
      },
      style: (0, _dates.getDay)(day) === 1 ? {
        gridColumnStart: (0, _dates.getDayOfWeek)(day, calendarType) + 1
      } : null
    },
    (0, _dates.getDay)(day)
  );
};

Day.propTypes = {
  calendarType: _propTypes3.isCalendarType,
  day: _propTypes2.default.instanceOf(Date).isRequired,
  onClick: _propTypes2.default.func
};

exports.default = Day;