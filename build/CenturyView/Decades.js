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

var _Flex = require('../Flex');

var _Flex2 = _interopRequireDefault(_Flex);

var _Decade = require('./Decade');

var _Decade2 = _interopRequireDefault(_Decade);

var _dates = require('../shared/dates');

var _utils = require('../shared/utils');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Decades = function (_Component) {
  (0, _inherits3.default)(Decades, _Component);

  function Decades() {
    (0, _classCallCheck3.default)(this, Decades);
    return (0, _possibleConstructorReturn3.default)(this, (Decades.__proto__ || (0, _getPrototypeOf2.default)(Decades)).apply(this, arguments));
  }

  (0, _createClass3.default)(Decades, [{
    key: 'render',
    value: function render() {
      var end = this.end,
          start = this.start;
      var _props = this.props,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          onClick = _props.onClick,
          renderChildren = _props.renderChildren,
          value = _props.value,
          valueType = _props.valueType;


      var decadeProps = {
        maxDate: maxDate,
        minDate: minDate,
        onClick: onClick,
        renderChildren: renderChildren
      };

      var decades = [];
      for (var decade = start; decade <= end; decade += 10) {
        var date = (0, _dates.getBeginOfDecade)(decade);

        decades.push(_react2.default.createElement(_Decade2.default, (0, _extends3.default)({}, (0, _utils.getTileActivityFlags)(value, valueType, date, 'decade'), {
          date: date,
          decade: decade,
          key: decade
        }, decadeProps)));
      }

      return _react2.default.createElement(
        _Flex2.default,
        {
          className: 'react-calendar__century-view__decades',
          count: 3,
          wrap: true
        },
        decades
      );
    }
  }, {
    key: 'start',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getBeginOfCenturyYear)(activeStartDate);
    }
  }, {
    key: 'end',
    get: function get() {
      return this.start + 99;
    }
  }]);
  return Decades;
}(_react.Component);

exports.default = Decades;


Decades.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onClick: _propTypes2.default.func,
  renderChildren: _propTypes2.default.func,
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};