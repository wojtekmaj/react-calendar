import React from 'react';
import PropTypes from 'prop-types';

const toPercent = num => `${num}%`;

const Flex = ({
  children,
  className,
  direction,
  count,
  offset,
  style,
  wrap,
  ...otherProps
}) => (
  <div
    className={className}
    style={Object.assign({
      display: 'flex',
      flexDirection: direction,
      flexWrap: wrap ? 'wrap' : 'no-wrap',
    }, style)}
    {...otherProps}
  >
    {React.Children.map(children, (child, index) => (
      React.cloneElement(child, Object.assign({}, child.props, {
        style: Object.assign(
          {
            flexBasis: toPercent(100 / count),
            overflow: 'hidden',
          },
          offset && (index === 0) && {
            marginLeft: toPercent((100 * offset) / count),
          },
        ),
      }))
    ))}
  </div>
);

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

export default Flex;
