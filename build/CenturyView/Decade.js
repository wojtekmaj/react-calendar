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

var className = 'react-calendar__century-view__decades__decade';

var Decade = function Decade(_ref) {
  var decade = _ref.decade,
      _onClick = _ref.onClick;
  return _react2.default.createElement(
    'button',
    {
      className: [className, 'react-calendar__tile'].join(' '),
      onClick: function onClick() {
        if (_onClick) _onClick((0, _dates.getDecadeRange)(decade));
      }
    },
    (0, _dates.getDecadeLabel)(decade)
  );
};

Decade.propTypes = {
  decade: _propTypes2.default.number.isRequired,
  onClick: _propTypes2.default.func
};

exports.default = Decade;