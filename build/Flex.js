'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toPercent = function toPercent(num) {
  return Math.floor(100 * num) / 100 + '%';
};

var Flex = function Flex(_ref) {
  var children = _ref.children,
      className = _ref.className,
      count = _ref.count,
      offset = _ref.offset,
      wrap = _ref.wrap;
  return _react2.default.createElement(
    'div',
    {
      className: className,
      style: {
        display: 'flex',
        flexWrap: wrap ? 'wrap' : 'no-wrap'
      }
    },
    _react2.default.Children.map(children, function (child, index) {
      return _react2.default.createElement(
        'div',
        {
          style: (0, _assign2.default)({
            display: 'flex',
            flexBasis: toPercent(100 / count)
          }, offset && index === 0 && {
            marginLeft: toPercent(100 * offset / count)
          })
        },
        child
      );
    })
  );
};

Flex.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  count: _propTypes2.default.number.isRequired,
  offset: _propTypes2.default.number,
  wrap: _propTypes2.default.bool
};

exports.default = Flex;