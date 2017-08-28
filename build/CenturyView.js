'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Decades = require('./CenturyView/Decades');

var _Decades2 = _interopRequireDefault(_Decades);

var _propTypes3 = require('./shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CenturyView = function (_Component) {
  (0, _inherits3.default)(CenturyView, _Component);

  function CenturyView() {
    (0, _classCallCheck3.default)(this, CenturyView);
    return (0, _possibleConstructorReturn3.default)(this, (CenturyView.__proto__ || (0, _getPrototypeOf2.default)(CenturyView)).apply(this, arguments));
  }

  (0, _createClass3.default)(CenturyView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var setView = this.props.setView;


      if (setView) setView('century');
    }
  }, {
    key: 'renderDecades',
    value: function renderDecades() {
      var _props = this.props,
          setView = _props.setView,
          childProps = (0, _objectWithoutProperties3.default)(_props, ['setView']);


      return _react2.default.createElement(_Decades2.default, childProps);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'react-calendar__century-view' },
        this.renderDecades()
      );
    }
  }]);
  return CenturyView;
}(_react.Component);

exports.default = CenturyView;


CenturyView.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onChange: _propTypes2.default.func,
  setActiveRange: _propTypes2.default.func,
  setView: _propTypes2.default.func,
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};