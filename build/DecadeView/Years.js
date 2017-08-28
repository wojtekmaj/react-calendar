'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Year = require('./Year');

var _Year2 = _interopRequireDefault(_Year);

var _dates = require('../shared/dates');

var _utils = require('../shared/utils');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Years = function (_Component) {
  (0, _inherits3.default)(Years, _Component);

  function Years() {
    (0, _classCallCheck3.default)(this, Years);
    return (0, _possibleConstructorReturn3.default)(this, (Years.__proto__ || (0, _getPrototypeOf2.default)(Years)).apply(this, arguments));
  }

  (0, _createClass3.default)(Years, [{
    key: 'render',
    value: function render() {
      var end = this.end,
          start = this.start;
      var _props = this.props,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          onChange = _props.onChange,
          value = _props.value,
          valueType = _props.valueType;


      var years = [];
      for (var year = start; year <= end; year += 1) {
        var date = new Date(year, 0, 1);

        years.push(_react2.default.createElement(_Year2.default, (0, _extends3.default)({}, (0, _utils.getTileActivityFlags)(value, valueType, date, 'year'), {
          date: date,
          key: year,
          maxDate: maxDate,
          minDate: minDate,
          onChange: onChange,
          year: year
        })));
      }

      return _react2.default.createElement(
        _Grid2.default,
        {
          className: 'react-calendar__decade-view__years',
          grow: true
        },
        years
      );
    }
  }, {
    key: 'start',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getBeginOfDecadeYear)(activeStartDate);
    }
  }, {
    key: 'end',
    get: function get() {
      return this.start + 9;
    }
  }]);
  return Years;
}(_react.Component);

exports.default = Years;


Years.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onChange: _propTypes2.default.func,
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};