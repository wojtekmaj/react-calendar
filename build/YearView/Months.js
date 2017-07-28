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

var _Month = require('./Month');

var _Month2 = _interopRequireDefault(_Month);

var _dates = require('../shared/dates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Months = function (_Component) {
  _inherits(Months, _Component);

  function Months() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Months);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Months.__proto__ || Object.getPrototypeOf(Months)).call.apply(_ref, [this].concat(args))), _this), _this.monthsInYear = 12, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Months, [{
    key: 'render',
    value: function render() {
      var monthsInYear = this.monthsInYear,
          year = this.year;
      var onClickMonth = this.props.onClickMonth;


      var months = [];

      for (var monthIndex = 0; monthIndex < monthsInYear; monthIndex += 1) {
        months.push(_react2.default.createElement(_Month2.default, {
          key: monthIndex,
          month: new Date(year, monthIndex, 1),
          onClick: onClickMonth
        }));
      }

      return _react2.default.createElement(
        _Grid2.default,
        {
          className: 'react-calendar__year-view__months',
          grow: true
        },
        months
      );
    }
  }, {
    key: 'year',
    get: function get() {
      var year = this.props.year;


      return (0, _dates.getYear)(year);
    }
  }]);

  return Months;
}(_react.Component);

exports.default = Months;


Months.propTypes = {
  onClickMonth: _propTypes2.default.func,
  year: _propTypes2.default.instanceOf(Date).isRequired
};