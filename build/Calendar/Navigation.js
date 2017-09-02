'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _dates = require('../shared/dates');

var _dateFormatter = require('../shared/dateFormatter');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navigation = function (_Component) {
  (0, _inherits3.default)(Navigation, _Component);

  function Navigation() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Navigation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Navigation.__proto__ || (0, _getPrototypeOf2.default)(Navigation)).call.apply(_ref, [this].concat(args))), _this), _this.onClickPrevious = function () {
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
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Navigation, [{
    key: 'render',
    value: function render() {
      var label = this.label;
      var _props = this.props,
          drillUp = _props.drillUp,
          view = _props.view;


      return _react2.default.createElement(
        'div',
        {
          className: 'react-calendar__navigation',
          style: { display: 'flex' }
        },
        view !== 'century' && _react2.default.createElement(
          'button',
          {
            className: 'react-calendar__navigation__arrow',
            disabled: this.prev2ButtonDisabled,
            onClick: this.onClickPrevious2,
            type: 'button'
          },
          this.props.prev2Label
        ),
        _react2.default.createElement(
          'button',
          {
            className: 'react-calendar__navigation__arrow',
            disabled: this.prevButtonDisabled,
            onClick: this.onClickPrevious,
            type: 'button'
          },
          this.props.prevLabel
        ),
        _react2.default.createElement(
          'button',
          {
            className: 'react-calendar__navigation__label',
            onClick: drillUp,
            disabled: !this.drillUpAvailable,
            style: { flexGrow: 1 },
            type: 'button'
          },
          label
        ),
        _react2.default.createElement(
          'button',
          {
            className: 'react-calendar__navigation__arrow',
            disabled: this.nextButtonDisabled,
            onClick: this.onClickNext,
            type: 'button'
          },
          this.props.nextLabel
        ),
        view !== 'century' && _react2.default.createElement(
          'button',
          {
            className: 'react-calendar__navigation__arrow',
            disabled: this.next2ButtonDisabled,
            onClick: this.onClickNext2,
            type: 'button'
          },
          this.props.next2Label
        )
      );
    }
  }, {
    key: 'drillUpAvailable',
    get: function get() {
      var _props2 = this.props,
          view = _props2.view,
          views = _props2.views;

      return views.indexOf(view) > 0;
    }
  }, {
    key: 'prevButtonDisabled',
    get: function get() {
      var _props3 = this.props,
          date = _props3.activeStartDate,
          minDate = _props3.minDate,
          view = _props3.view;

      var previousActiveStartDate = (0, _dates.getBeginPrevious)(view, date);
      if (previousActiveStartDate.getFullYear() < 1000) {
        return true;
      }
      var previousActiveEndDate = (0, _dates.getEndPrevious)(view, date);
      return minDate && minDate >= previousActiveEndDate;
    }
  }, {
    key: 'prev2ButtonDisabled',
    get: function get() {
      var _props4 = this.props,
          date = _props4.activeStartDate,
          minDate = _props4.minDate,
          view = _props4.view;

      var previousActiveStartDate = (0, _dates.getBeginPrevious2)(view, date);
      if (previousActiveStartDate.getFullYear() < 1000) {
        return true;
      }
      var previousActiveEndDate = (0, _dates.getEndPrevious2)(view, date);
      return minDate && minDate >= previousActiveEndDate;
    }
  }, {
    key: 'nextButtonDisabled',
    get: function get() {
      var _props5 = this.props,
          date = _props5.activeStartDate,
          maxDate = _props5.maxDate,
          view = _props5.view;

      var nextActiveStartDate = (0, _dates.getBeginNext)(view, date);
      return maxDate && maxDate <= nextActiveStartDate;
    }
  }, {
    key: 'next2ButtonDisabled',
    get: function get() {
      var _props6 = this.props,
          date = _props6.activeStartDate,
          maxDate = _props6.maxDate,
          view = _props6.view;

      var nextActiveStartDate = (0, _dates.getBeginNext2)(view, date);
      return maxDate && maxDate <= nextActiveStartDate;
    }
  }, {
    key: 'label',
    get: function get() {
      var _props7 = this.props,
          date = _props7.activeStartDate,
          view = _props7.view;


      switch (view) {
        case 'century':
          return (0, _dates.getCenturyLabel)(date);
        case 'decade':
          return (0, _dates.getDecadeLabel)(date);
        case 'year':
          return (0, _dates.getYear)(date);
        case 'month':
          return (0, _dateFormatter.formatMonthYear)(date);
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
  view: _propTypes3.isView.isRequired,
  views: _propTypes3.isViews.isRequired
};