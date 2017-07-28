'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dates = require('../shared/dates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var allViews = ['century', 'decade', 'year', 'month'];

var Navigation = function (_Component) {
  _inherits(Navigation, _Component);

  function Navigation() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Navigation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call.apply(_ref, [this].concat(args))), _this), _this.onClickPrevious = function () {
      var _this$props = _this.props,
          date = _this$props.activeStartDate,
          view = _this$props.view,
          setActiveStartDate = _this$props.setActiveStartDate;

      setActiveStartDate((0, _dates.getPreviousRange)(view, date)[0]);
    }, _this.onClickNext = function () {
      var _this$props2 = _this.props,
          date = _this$props2.activeStartDate,
          view = _this$props2.view,
          setActiveStartDate = _this$props2.setActiveStartDate;

      setActiveStartDate((0, _dates.getNextRange)(view, date)[0]);
    }, _this.onClickPrevious2 = function () {
      var _this$props3 = _this.props,
          date = _this$props3.activeStartDate,
          view = _this$props3.view,
          setActiveStartDate = _this$props3.setActiveStartDate;

      setActiveStartDate((0, _dates.getPreviousRange2)(view, date)[0]);
    }, _this.onClickNext2 = function () {
      var _this$props4 = _this.props,
          date = _this$props4.activeStartDate,
          view = _this$props4.view,
          setActiveStartDate = _this$props4.setActiveStartDate;

      setActiveStartDate((0, _dates.getNextRange2)(view, date)[0]);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Navigation, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          date = _props.activeStartDate,
          drillUp = _props.drillUp,
          view = _props.view;


      var label = void 0;
      switch (view) {
        case 'century':
          label = (0, _dates.getCenturyLabel)(date);
          break;
        case 'decade':
          label = (0, _dates.getDecadeLabel)(date);
          break;
        case 'year':
          label = (0, _dates.getYear)(date);
          break;
        case 'month':
          label = (0, _dates.formatMonthYear)(date);
          break;
        default:
          throw new Error('Invalid view: ' + view + '.');
      }

      var _props2 = this.props,
          prevLabel = _props2.prevLabel,
          prev2Label = _props2.prev2Label,
          nextLabel = _props2.nextLabel,
          next2Label = _props2.next2Label;


      return _react2.default.createElement(
        'div',
        { className: 'react-calendar__navigation' },
        view !== 'century' && _react2.default.createElement(
          'button',
          {
            disabled: this.prev2ButtonDisabled,
            onClick: this.onClickPrevious2
          },
          prev2Label
        ),
        _react2.default.createElement(
          'button',
          {
            disabled: this.prevButtonDisabled,
            onClick: this.onClickPrevious
          },
          prevLabel
        ),
        _react2.default.createElement(
          'button',
          {
            className: 'react-calendar__navigation__label',
            onClick: drillUp,
            disabled: !this.drillUpAvailable
          },
          label
        ),
        _react2.default.createElement(
          'button',
          {
            onClick: this.onClickNext
          },
          nextLabel
        ),
        view !== 'century' && _react2.default.createElement(
          'button',
          {
            onClick: this.onClickNext2
          },
          next2Label
        )
      );
    }
  }, {
    key: 'drillDownAvailable',
    get: function get() {
      var _props3 = this.props,
          view = _props3.view,
          views = _props3.views;

      return views.indexOf(view) < views.length - 1;
    }
  }, {
    key: 'drillUpAvailable',
    get: function get() {
      var _props4 = this.props,
          view = _props4.view,
          views = _props4.views;

      return views.indexOf(view) > 0;
    }
  }, {
    key: 'prevButtonDisabled',
    get: function get() {
      var _props5 = this.props,
          date = _props5.activeStartDate,
          view = _props5.view;

      var _getPreviousRange = (0, _dates.getPreviousRange)(view, date),
          _getPreviousRange2 = _slicedToArray(_getPreviousRange, 1),
          nextActiveStartDate = _getPreviousRange2[0];

      return nextActiveStartDate.getFullYear() < 1000;
    }
  }, {
    key: 'prev2ButtonDisabled',
    get: function get() {
      var _props6 = this.props,
          date = _props6.activeStartDate,
          view = _props6.view;

      var _getPreviousRange3 = (0, _dates.getPreviousRange2)(view, date),
          _getPreviousRange4 = _slicedToArray(_getPreviousRange3, 1),
          nextActiveStartDate = _getPreviousRange4[0];

      return nextActiveStartDate.getFullYear() < 1000;
    }
  }]);

  return Navigation;
}(_react.Component);

exports.default = Navigation;


Navigation.defaultProps = {
  next2Label: '»',
  nextLabel: '›',
  prev2Label: '«',
  prevLabel: '‹'
};

var viewPropType = _propTypes2.default.oneOf(allViews);

Navigation.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  drillUp: _propTypes2.default.func.isRequired,
  next2Label: _propTypes2.default.string,
  nextLabel: _propTypes2.default.string,
  prev2Label: _propTypes2.default.string,
  prevLabel: _propTypes2.default.string,
  setActiveStartDate: _propTypes2.default.func.isRequired,
  view: viewPropType.isRequired,
  views: _propTypes2.default.arrayOf(viewPropType).isRequired
};