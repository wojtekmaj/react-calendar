'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Year = require('./Year');

var _Year2 = _interopRequireDefault(_Year);

var _dates = require('../shared/dates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Years = function (_Component) {
  _inherits(Years, _Component);

  function Years() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Years);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Years.__proto__ || Object.getPrototypeOf(Years)).call.apply(_ref, [this].concat(args))), _this), _this.yearsInDecade = 10, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Years, [{
    key: 'render',
    value: function render() {
      var end = this.end,
          start = this.start;
      var onClickYear = this.props.onClickYear;


      var years = [];

      for (var year = start; year < end; year += 1) {
        years.push(_react2.default.createElement(_Year2.default, {
          year: year,
          key: year,
          onClick: onClickYear
        }));
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
      var decade = this.props.decade;


      return (0, _dates.getBeginOfDecadeYear)(decade);
    }
  }, {
    key: 'end',
    get: function get() {
      return this.start + this.yearsInDecade;
    }
  }]);

  return Years;
}(_react.Component);

exports.default = Years;


Years.propTypes = {
  decade: _propTypes2.default.instanceOf(Date).isRequired,
  onClickYear: _propTypes2.default.func
};