'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Months = require('./YearView/Months');

var _Months2 = _interopRequireDefault(_Months);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YearView = function (_Component) {
  _inherits(YearView, _Component);

  function YearView() {
    _classCallCheck(this, YearView);

    return _possibleConstructorReturn(this, (YearView.__proto__ || Object.getPrototypeOf(YearView)).apply(this, arguments));
  }

  _createClass(YearView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var setView = this.props.setView;


      if (setView) setView('year');
    }
  }, {
    key: 'renderMonths',
    value: function renderMonths() {
      var _props = this.props,
          onClickMonth = _props.onClickMonth,
          setActiveRange = _props.setActiveRange,
          year = _props.year;


      return _react2.default.createElement(_Months2.default, {
        year: year,
        onClickMonth: onClickMonth,
        setActiveRange: setActiveRange
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'react-calendar__year-view' },
        this.renderMonths()
      );
    }
  }]);

  return YearView;
}(_react.Component);

exports.default = YearView;


YearView.propTypes = {
  onClickMonth: _propTypes2.default.func,
  setActiveRange: _propTypes2.default.func,
  setView: _propTypes2.default.func,
  year: _propTypes2.default.oneOfType([_propTypes2.default.string, // Only strings that are parseable to integer
  _propTypes2.default.number, _propTypes2.default.instanceOf(Date)]).isRequired
};