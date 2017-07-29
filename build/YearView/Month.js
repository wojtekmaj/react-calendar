'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dates = require('../shared/dates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var className = 'react-calendar__year-view__months__month';

var Month = function Month(_ref) {
  var active = _ref.active,
      date = _ref.date,
      hasActive = _ref.hasActive,
      onChange = _ref.onChange;
  return _react2.default.createElement(
    'button',
    {
      className: [className, active ? 'react-calendar__tile--active' : '', hasActive ? 'react-calendar__tile--hasActive' : '', 'react-calendar__tile'].join(' '),
      onClick: onChange && function () {
        return onChange(date);
      }
    },
    _react2.default.createElement(
      'time',
      { dateTime: date.toISOString() },
      (0, _dates.formatMonth)(date)
    )
  );
};

Month.propTypes = {
  active: _propTypes2.default.bool.isRequired,
  date: _propTypes2.default.instanceOf(Date).isRequired,
  hasActive: _propTypes2.default.bool.isRequired,
  onChange: _propTypes2.default.func
};

exports.default = Month;