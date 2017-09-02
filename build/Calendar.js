'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var _locales = require('./shared/locales');

var _propTypes3 = require('./shared/propTypes');

var _utils = require('./shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = [].concat((0, _toConsumableArray3.default)(allViews.slice(1)), ['day']);

var Calendar = function (_Component) {
  (0, _inherits3.default)(Calendar, _Component);

  function Calendar() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Calendar.__proto__ || (0, _getPrototypeOf2.default)(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      activeStartDate: _this.getActiveStartDate(),
      view: _this.getView()
    }, _this.setView = function (view) {
      _this.setState(function (prevState) {
        var activeRange = (0, _dates.getRange)(view, prevState.activeStartDate);

        var _activeRange = (0, _slicedToArray3.default)(activeRange, 1),
            activeStartDate = _activeRange[0];

        return {
          activeStartDate: activeStartDate,
          view: view
        };
      });
    }, _this.setActiveStartDate = function (activeStartDate) {
      return _this.setState({ activeStartDate: activeStartDate });
    }, _this.drillDown = function (activeStartDate) {
      if (!_this.drillDownAvailable) {
        return;
      }

      var views = _this.getLimitedViews();

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
    }, _this.onChange = function (value) {
      _this.setState({ value: value });

      var onChange = _this.props.onChange;

      var processedValue = _this.getProcessedValue(value);
      if (onChange) onChange(processedValue);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Calendar, [{
    key: 'getValueArray',
    value: function getValueArray(value) {
      if (value instanceof Array) {
        return value;
      }
      return [this.getValueFrom(value), this.getValueTo(value)];
    }
  }, {
    key: 'getValueFrom',
    value: function getValueFrom(value) {
      if (!value) {
        return value;
      }
      var minDate = this.props.minDate;

      var rawValueFrom = value instanceof Array ? value[0] : value;
      var valueFrom = (0, _dates.getBegin)(this.valueType, rawValueFrom);
      return minDate && minDate > valueFrom ? minDate : valueFrom;
    }
  }, {
    key: 'getValueTo',
    value: function getValueTo(value) {
      if (!value) {
        return value;
      }
      var maxDate = this.props.maxDate;

      var rawValueFrom = value instanceof Array ? value[1] : value;
      var valueTo = (0, _dates.getEnd)(this.valueType, rawValueFrom);
      return maxDate && maxDate < valueTo ? maxDate : valueTo;
    }

    /**
     * Returns views array with disallowed values cut off.
     */

  }, {
    key: 'getLimitedViews',
    value: function getLimitedViews() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var minDetail = props.minDetail,
          maxDetail = props.maxDetail;


      return allViews.slice(allViews.indexOf(minDetail), allViews.indexOf(maxDetail) + 1);
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

      return views.indexOf(view) !== -1;
    }

    /**
     * Gets current value in a desired format.
     */

  }, {
    key: 'getProcessedValue',
    value: function getProcessedValue(value) {
      var returnValue = this.props.returnValue;


      switch (returnValue) {
        case 'start':
          return this.getValueFrom(value);
        case 'end':
          return this.getValueTo(value);
        case 'range':
          return this.getValueArray(value);
        default:
          throw new Error('Invalid returnValue.');
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      (0, _locales.setLocale)(this.props.locale);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;


      var allowedViewChanged = nextProps.minDetail !== props.minDetail || nextProps.maxDetail !== props.maxDetail;

      var nextValueFrom = this.getValueFrom(nextProps.value);
      var valueFrom = this.getValueFrom(props.value);
      var valueFromChanged = nextValueFrom && !valueFrom || nextValueFrom && valueFrom && nextValueFrom.getTime() !== valueFrom.getTime();

      var nextValueTo = this.getValueTo(nextProps.value);
      var valueTo = this.getValueTo(props.value);
      var valueToChanged = nextValueTo && !valueTo || nextValueTo && valueTo && nextValueTo.getTime() !== valueTo.getTime();

      var valueChanged = valueFromChanged || valueToChanged;

      var nextState = {};

      if (nextProps.locale !== props.locale) {
        (0, _locales.setLocale)(nextProps.locale);
      }

      if (allowedViewChanged) {
        if (!this.isViewAllowed(nextProps)) {
          nextState.view = this.getView(nextProps);
        }
      }

      if (allowedViewChanged || valueChanged) {
        nextState.activeStartDate = this.getActiveStartDate(nextProps);
      }

      this.setState(nextState);
    }
  }, {
    key: 'getActiveStartDate',
    value: function getActiveStartDate() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var rangeType = this.getView(props);
      var valueFrom = this.getValueFrom(props.value) || new Date();
      return (0, _dates.getBegin)(rangeType, valueFrom);
    }
  }, {
    key: 'getView',
    value: function getView() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var view = props.view;


      if (view && this.getLimitedViews(props).indexOf(view) !== -1) {
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

  }, {
    key: 'renderContent',
    value: function renderContent() {
      var setView = this.setView,
          valueType = this.valueType;
      var _props = this.props,
          calendarType = _props.calendarType,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          value = _props.value;
      var _state = this.state,
          activeStartDate = _state.activeStartDate,
          view = _state.view;


      var commonProps = {
        activeStartDate: activeStartDate,
        maxDate: maxDate,
        minDate: minDate,
        setView: setView,
        value: value,
        valueType: valueType
      };

      var clickAction = this.drillDownAvailable ? this.drillDown : this.onChange;

      switch (view) {
        case 'century':
          return _react2.default.createElement(_CenturyView2.default, (0, _extends3.default)({
            onChange: (0, _utils.mergeFunctions)(clickAction, this.props.onClickDecade)
          }, commonProps));
        case 'decade':
          return _react2.default.createElement(_DecadeView2.default, (0, _extends3.default)({
            onChange: (0, _utils.mergeFunctions)(clickAction, this.props.onClickYear)
          }, commonProps));
        case 'year':
          return _react2.default.createElement(_YearView2.default, (0, _extends3.default)({
            onChange: (0, _utils.mergeFunctions)(clickAction, this.props.onClickMonth)
          }, commonProps));
        case 'month':
          return _react2.default.createElement(_MonthView2.default, (0, _extends3.default)({
            calendarType: calendarType,
            onChange: (0, _utils.mergeFunctions)(clickAction, this.props.onClickDay),
            showNeighboringMonth: this.props.showNeighboringMonth,
            showWeekNumbers: this.props.showWeekNumbers
          }, commonProps));
        default:
          throw new Error('Invalid view: ' + view + '.');
      }
    }
  }, {
    key: 'renderNavigation',
    value: function renderNavigation() {
      return _react2.default.createElement(_Navigation2.default, {
        activeRange: this.state.activeRange,
        activeStartDate: this.state.activeStartDate,
        drillUp: this.drillUp,
        maxDate: this.props.maxDate,
        minDate: this.props.minDate,
        next2Label: this.props.next2Label,
        nextLabel: this.props.nextLabel,
        prev2Label: this.props.prev2Label,
        prevLabel: this.props.prevLabel,
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

    /**
     * Returns value type that can be returned with currently applied settings.
     */

  }, {
    key: 'valueType',
    get: function get() {
      var maxDetail = this.props.maxDetail;

      return allValueTypes[allViews.indexOf(maxDetail)];
    }
  }]);
  return Calendar;
}(_react.Component);

exports.default = Calendar;


Calendar.defaultProps = {
  maxDetail: 'month',
  minDetail: 'century',
  returnValue: 'start',
  showNeighboringMonth: true,
  view: 'month'
};

Calendar.propTypes = {
  calendarType: _propTypes3.isCalendarType,
  locale: _propTypes2.default.string,
  maxDate: _propTypes3.isMaxDate,
  maxDetail: _propTypes2.default.oneOf(allViews),
  minDate: _propTypes3.isMinDate,
  minDetail: _propTypes2.default.oneOf(allViews),
  next2Label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  nextLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  onChange: _propTypes2.default.func,
  onClickDay: _propTypes2.default.func,
  onClickDecade: _propTypes2.default.func,
  onClickMonth: _propTypes2.default.func,
  onClickYear: _propTypes2.default.func,
  prev2Label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  prevLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  returnValue: _propTypes2.default.oneOf(['start', 'end', 'range']).isRequired,
  showNeighboringMonth: _propTypes2.default.bool,
  showWeekNumbers: _propTypes2.default.bool,
  value: _propTypes3.isValue,
  view: _propTypes2.default.oneOf(allViews) // eslint-disable-line react/no-unused-prop-types
};