'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

      setActiveStartDate((0, _dates.getBeginPrevious)(view, date));
    }, _this.onClickNext = function () {
      var _this$props2 = _this.props,
          date = _this$props2.activeStartDate,
          view = _this$props2.view,
          setActiveStartDate = _this$props2.setActiveStartDate;

      setActiveStartDate((0, _dates.getBeginNext)(view, date));
    }, _this.onClickPrevious2 = function () {
      var _this$props3 = _this.props,
          date = _this$props3.activeStartDate,
          view = _this$props3.view,
          setActiveStartDate = _this$props3.setActiveStartDate;

      setActiveStartDate((0, _dates.getBeginPrevious2)(view, date));
    }, _this.onClickNext2 = function () {
      var _this$props4 = _this.props,
          date = _this$props4.activeStartDate,
          view = _this$props4.view,
          setActiveStartDate = _this$props4.setActiveStartDate;

      setActiveStartDate((0, _dates.getBeginNext2)(view, date));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Navigation, [{
    key: 'render',
    value: function render() {
      var label = this.label;
      var _props = this.props,
          drillUp = _props.drillUp,
          view = _props.view;


      return _react2.default.createElement(
        'div',
        { className: 'react-calendar__navigation' },
        view !== 'century' && _react2.default.createElement(
          'button',
          {
            className: 'react-calendar__navigation__arrow',
            disabled: this.prev2ButtonDisabled,
            onClick: this.onClickPrevious2
          },
          this.props.prev2Label
        ),
        _react2.default.createElement(
          'button',
          {
            className: 'react-calendar__navigation__arrow',
            disabled: this.prevButtonDisabled,
            onClick: this.onClickPrevious
          },
          this.props.prevLabel
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
            className: 'react-calendar__navigation__arrow',
            disabled: this.nextButtonDisabled,
            onClick: this.onClickNext
          },
          this.props.nextLabel
        ),
        view !== 'century' && _react2.default.createElement(
          'button',
          {
            className: 'react-calendar__navigation__arrow',
            disabled: this.next2ButtonDisabled,
            onClick: this.onClickNext2
          },
          this.props.next2Label
        )
      );
    }
  }, {
    key: 'drillDownAvailable',
    get: function get() {
      var _props2 = this.props,
          view = _props2.view,
          views = _props2.views;

      return views.indexOf(view) < views.length - 1;
    }
  }, {
    key: 'drillUpAvailable',
    get: function get() {
      var _props3 = this.props,
          view = _props3.view,
          views = _props3.views;

      return views.indexOf(view) > 0;
    }
  }, {
    key: 'prevButtonDisabled',
    get: function get() {
      var _props4 = this.props,
          date = _props4.activeStartDate,
          minDate = _props4.minDate,
          view = _props4.view;

      var previousActiveStartDate = (0, _dates.getBeginPrevious)(view, date);
      if (previousActiveStartDate.getFullYear() < 1000) {
        return true;
      }
      return minDate && minDate >= previousActiveStartDate;
    }
  }, {
    key: 'prev2ButtonDisabled',
    get: function get() {
      var _props5 = this.props,
          date = _props5.activeStartDate,
          minDate = _props5.minDate,
          view = _props5.view;

      var previousActiveStartDate = (0, _dates.getBeginPrevious2)(view, date);
      if (previousActiveStartDate.getFullYear() < 1000) {
        return true;
      }
      return minDate && minDate >= previousActiveStartDate;
    }
  }, {
    key: 'nextButtonDisabled',
    get: function get() {
      var _props6 = this.props,
          date = _props6.activeStartDate,
          maxDate = _props6.maxDate,
          view = _props6.view;

      var nextActiveStartDate = (0, _dates.getBeginNext)(view, date);
      return maxDate && maxDate <= nextActiveStartDate;
    }
  }, {
    key: 'next2ButtonDisabled',
    get: function get() {
      var _props7 = this.props,
          date = _props7.activeStartDate,
          maxDate = _props7.maxDate,
          view = _props7.view;

      var nextActiveStartDate = (0, _dates.getBeginNext2)(view, date);
      return maxDate && maxDate <= nextActiveStartDate;
    }
  }, {
    key: 'label',
    get: function get() {
      var _props8 = this.props,
          date = _props8.activeStartDate,
          view = _props8.view;


      switch (view) {
        case 'century':
          return (0, _dates.getCenturyLabel)(date);
        case 'decade':
          return (0, _dates.getDecadeLabel)(date);
        case 'year':
          return (0, _dates.getYear)(date);
        case 'month':
          return (0, _dates.formatMonthYear)(date);
        default:
          throw new Error('Invalid view: ' + view + '.');
      }
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
  maxDate: _propTypes2.default.instanceOf(Date),
  minDate: _propTypes2.default.instanceOf(Date),
  next2Label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  nextLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  prev2Label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  prevLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  setActiveStartDate: _propTypes2.default.func.isRequired,
  view: viewPropType.isRequired,
  views: _propTypes2.default.arrayOf(viewPropType).isRequired
};