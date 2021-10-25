import React from 'react';
import PropTypes from 'prop-types';

function toPercent(num) {
  return `${num}%`;
}

export default function Flex({
  children,
  className,
  direction,
  count,
  offset,
  style,
  wrap,
  ...otherProps
}) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap ? 'wrap' : 'no-wrap',
        ...style,
      }}
      {...otherProps}
    >
      {React.Children.map(children, (child, index) => (
        React.cloneElement(
          child,
          {
            ...child.props,
            style: {
              flexBasis: toPercent(100 / count),
              flexShrink: 0,
              flexGrow: 0,
              overflow: 'hidden',
              marginLeft: offset && (index === 0) ? toPercent((100 * offset) / count) : null,
            },
          },
        )
      ))}
    </div>
  );
}

Flex.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  count: PropTypes.number.isRequired,
  direction: PropTypes.string,
  offset: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  wrap: PropTypes.bool,
};
