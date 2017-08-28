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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Grid = function (_Component) {
  (0, _inherits3.default)(Grid, _Component);

  function Grid() {
    (0, _classCallCheck3.default)(this, Grid);
    return (0, _possibleConstructorReturn3.default)(this, (Grid.__proto__ || (0, _getPrototypeOf2.default)(Grid)).apply(this, arguments));
  }

  (0, _createClass3.default)(Grid, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          className: this.props.className,
          style: {
            display: 'grid',
            gridTemplateColumns: this.gridTemplateColumns
          }
        },
        this.props.children
      );
    }
  }, {
    key: 'gridTemplateColumns',
    get: function get() {
      var _props = this.props,
          count = _props.count,
          grow = _props.grow,
          width = _props.width;


      var track = void 0;
      if (width) {
        if (grow) {
          track = 'minmax(' + width + 'px, 1fr)';
        } else {
          track = width + 'px';
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (typeof count === 'number') {
          track = '1fr';
        } else {
          // @TODO: Figure out if it's possible to make it smarter (without px)
          track = 'minmax(100px, 1fr)';
        }
      }

      return 'repeat(' + count + ', ' + track + ')';
    }
  }]);
  return Grid;
}(_react.Component);

exports.default = Grid;


Grid.defaultProps = {
  count: 'auto-fill'
};

Grid.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  count: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['auto-fill']), _propTypes2.default.number]),
  grow: _propTypes2.default.bool,
  width: _propTypes2.default.number
};