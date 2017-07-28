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

require('./Calendar.less');

var _Navigation = require('./Calendar/Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

var _CenturyView = require('./CenturyView');

var _CenturyView2 = _interopRequireDefault(_CenturyView);

var _DecadeView = require('./DecadeView');

var _DecadeView2 = _interopRequireDefault(_DecadeView);

var _YearView = require('./YearView');

var _YearView2 = _interopRequireDefault(_YearView);

var _MonthView = require('./MonthView');

var _MonthView2 = _interopRequireDefault(_MonthView);

var _dates = require('./shared/dates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = [].concat(_toConsumableArray(allViews.slice(1)), ['day']);

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      activeStartDate: _this.getActiveStartDate(),
      value: _this.getValue(),
      view: _this.getView()
    }, _this.setView = function (view) {
      _this.setState(function (prevState) {
        var activeRange = (0, _dates.getRange)(view, prevState.activeStartDate);

        var _activeRange = _slicedToArray(activeRange, 1),
            activeStartDate = _activeRange[0];

        return {
          activeStartDate: activeStartDate,
          view: view
        };
      });
    }, _this.setActiveRange = function (activeRange) {
      var _activeRange2 = _slicedToArray(activeRange, 1),
          activeStartDate = _activeRange2[0];

      _this.setState({
        activeStartDate: activeStartDate
      });
    }, _this.setActiveStartDate = function (activeStartDate) {
      return _this.setState({ activeStartDate: activeStartDate });
    }, _this.drillDown = function (activeRange) {
      if (!_this.drillDownAvailable) {
        return;
      }

      var views = _this.getLimitedViews();

      var _activeRange3 = _slicedToArray(activeRange, 1),
          activeStartDate = _activeRange3[0];

      _this.setState(function (prevState) {
        return {
          activeStartDate: activeStartDate,
          view: views[views.indexOf(prevState.view) + 1]
        };
      });
    }, _this.drillUp = function () {
      if (!_this.drillUpAvailable) {
        return;
      }

      var views = _this.getLimitedViews();

      _this.setState(function (prevState) {
        return {
          view: views[views.indexOf(prevState.view) - 1]
        };
      });
    }, _this.onChange = function (valueRange) {
      var onChange = _this.props.onChange;


      var value = _this.getValueFromRange(valueRange);

      _this.setState({ value: value });

      if (onChange) onChange(value);
    }, _this.onDrillDown = function (callback) {
      return function (range) {
        if (callback) callback();

        if (_this.drillDownAvailable) {
          _this.drillDown(range);
        } else {
          _this.onChange(range);
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Calendar, [{
    key: 'getLimitedViews',


    /**
     * Returns views array with disallowed values cut off.
     */
    value: function getLimitedViews() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var minDetail = props.minDetail,
          maxDetail = props.maxDetail;


      return allViews.slice(allViews.indexOf(minDetail), allViews.indexOf(maxDetail) + 1);
    }

    /**
     * Returns value type that can be returned with currently applied settings.
     */

  }, {
    key: 'getValueType',
    value: function getValueType() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var maxDetail = props.maxDetail;

      return allValueTypes[allViews.indexOf(maxDetail)];
    }

    /**
     * Determines whether a given view is allowed with currently applied settings.
     */

  }, {
    key: 'isViewAllowed',
    value: function isViewAllowed() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var view = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.view;

      var views = this.getLimitedViews(props);

      return views.includes(view);
    }

    /**
     * Gets current value in a desired format.
     */

  }, {
    key: 'getValueFromRange',
    value: function getValueFromRange() {
      var valueRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.value;
      var returnValue = this.props.returnValue;


      switch (returnValue) {
        case 'start':
          return valueRange[0];
        case 'end':
          return valueRange[1];
        case 'range':
          return valueRange;
        default:
          throw new Error('Invalid returnValue.');
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;


      var allowedViewChanged = nextProps.minDetail !== props.minDetail || nextProps.maxDetail !== props.maxDetail;

      var valueChanged = nextProps.value && !props.value || nextProps.value && props.value && nextProps.value.getTime() !== props.value.getTime();

      var nextState = {};

      if (allowedViewChanged) {
        if (!this.isViewAllowed(nextProps)) {
          nextState.view = this.getView(nextProps);
        }
      }

      if (allowedViewChanged || valueChanged) {
        nextState.value = this.getValue(nextProps);
        nextState.activeStartDate = this.getActiveStartDate(nextProps);
      }

      this.setState(nextState);
    }
  }, {
    key: 'getActiveStartDate',
    value: function getActiveStartDate() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var rangeType = this.getView(props);
      return (0, _dates.getRange)(rangeType, props.value)[0];
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var rangeType = this.getValueType(props);
      return (0, _dates.getRange)(rangeType, props.value);
    }
  }, {
    key: 'getView',
    value: function getView() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var view = props.view;


      if (this.getLimitedViews(props).includes(view)) {
        return view;
      }

      return this.getLimitedViews(props).pop();
    }

    /**
     * Called when the user opens a new view.
     */


    /**
     * Called when the user uses navigation buttons.
     */


    /**
     * Called when the user uses navigation buttons.
     */


    /**
     * Called when the user clicks an item on any view.
     * If they "hit the bottom" and they can't drill further down, onChange will be called.
     * Otherwise, drillDown will be called.
     */

  }, {
    key: 'renderContent',
    value: function renderContent() {
      var _state = this.state,
          activeStartDate = _state.activeStartDate,
          view = _state.view;
      var _props = this.props,
          onClickDay = _props.onClickDay,
          onClickMonth = _props.onClickMonth,
          onClickYear = _props.onClickYear,
          onClickDecade = _props.onClickDecade;


      switch (view) {
        case 'century':
          return _react2.default.createElement(_CenturyView2.default, {
            century: activeStartDate,
            onClickDecade: this.onDrillDown(onClickDecade),
            setView: this.setView
          });
        case 'decade':
          return _react2.default.createElement(_DecadeView2.default, {
            decade: activeStartDate,
            onClickYear: this.onDrillDown(onClickYear),
            setView: this.setView
          });
        case 'year':
          return _react2.default.createElement(_YearView2.default, {
            year: activeStartDate,
            onClickMonth: this.onDrillDown(onClickMonth),
            setView: this.setView
          });
        case 'month':
          return _react2.default.createElement(_MonthView2.default, {
            month: activeStartDate,
            onClickDay: this.onDrillDown(onClickDay),
            setView: this.setView
          });
        default:
          throw new Error('Invalid view: ' + view + '.');
      }
    }
  }, {
    key: 'renderNavigation',
    value: function renderNavigation() {
      var _props2 = this.props,
          prevLabel = _props2.prevLabel,
          prev2Label = _props2.prev2Label,
          nextLabel = _props2.nextLabel,
          next2Label = _props2.next2Label;


      return _react2.default.createElement(_Navigation2.default, {
        activeRange: this.state.activeRange,
        activeStartDate: this.state.activeStartDate,
        drillUp: this.drillUp,
        nextLabel: nextLabel,
        next2Label: next2Label,
        prevLabel: prevLabel,
        prev2Label: prev2Label,
        setActiveRange: this.setActiveRange,
        setActiveStartDate: this.setActiveStartDate,
        view: this.state.view,
        views: this.getLimitedViews()
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'react-calendar' },
        this.renderNavigation(),
        this.renderContent()
      );
    }
  }, {
    key: 'drillDownAvailable',
    get: function get() {
      var views = this.getLimitedViews();
      var view = this.state.view;


      return views.indexOf(view) < views.length - 1;
    }
  }, {
    key: 'drillUpAvailable',
    get: function get() {
      var views = this.getLimitedViews();
      var view = this.state.view;


      return views.indexOf(view) > 0;
    }
  }]);

  return Calendar;
}(_react.Component);

exports.default = Calendar;


Calendar.defaultProps = {
  maxDetail: 'month',
  minDetail: 'century',
  returnValue: 'start',
  view: 'month'
};

Calendar.propTypes = {
  maxDetail: _propTypes2.default.oneOf(allViews),
  minDetail: _propTypes2.default.oneOf(allViews),
  next2Label: _propTypes2.default.string,
  nextLabel: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onClickDay: _propTypes2.default.func,
  onClickDecade: _propTypes2.default.func,
  onClickMonth: _propTypes2.default.func,
  onClickYear: _propTypes2.default.func,
  prev2Label: _propTypes2.default.string,
  prevLabel: _propTypes2.default.string,
  returnValue: _propTypes2.default.oneOf(['start', 'end', 'range']).isRequired,
  value: _propTypes2.default.instanceOf(Date),
  view: _propTypes2.default.oneOf(allViews)
};