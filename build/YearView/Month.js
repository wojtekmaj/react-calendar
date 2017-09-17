'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dates = require('../shared/dates');

var _dateFormatter = require('../shared/dateFormatter');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var className = 'react-calendar__year-view__months__month';

var Month = function Month(_ref) {
  var active = _ref.active,
      date = _ref.date,
      hasActive = _ref.hasActive,
      maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      onClick = _ref.onClick,
      renderChildren = _ref.renderChildren;
  return _react2.default.createElement(
    'button',
    {
      className: [className, active ? 'react-calendar__tile--active' : '', hasActive ? 'react-calendar__tile--hasActive' : '', 'react-calendar__tile'].join(' '),
      disabled: minDate && (0, _dates.getBeginOfMonth)(minDate) > date || maxDate && (0, _dates.getEndOfMonth)(maxDate) < date,
      onClick: onClick && function () {
        return onClick(date);
      },
      style: { flexGrow: 1 },
      type: 'button'
    },
    _react2.default.createElement(
      'time',
      { dateTime: date.toISOString() },
      (0, _dateFormatter.formatMonth)(date)
    ),
    renderChildren && renderChildren({ date: date, view: 'year' })
  );
};

Month.propTypes = {
  active: _propTypes2.default.bool.isRequired,
  date: _propTypes2.default.instanceOf(Date).isRequired,
  hasActive: _propTypes2.default.bool.isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onClick: _propTypes2.default.func,
  renderChildren: _propTypes2.default.func
};

exports.default = Month;