import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

function toPercent(num) {
  return `${num}%`;
}

const Flex = forwardRef(
  ({ children, className, count, direction, offset, style, wrap, ...otherProps }, ref) => {
    return (
      <div
        className={className}
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: direction,
          flexWrap: wrap ? 'wrap' : 'nowrap',
          ...style,
        }}
        {...otherProps}
      >
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            ...child.props,
            style: {
              flexBasis: toPercent(100 / count),
              flexShrink: 0,
              flexGrow: 0,
              overflow: 'hidden',
              marginLeft: offset && index === 0 ? toPercent((100 * offset) / count) : null,
            },
          }),
        )}
      </div>
    );
  },
);
Flex.displayName = 'Flex';

Flex.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  count: PropTypes.number.isRequired,
  direction: PropTypes.string,
  offset: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  wrap: PropTypes.bool,
};

export default Flex;
