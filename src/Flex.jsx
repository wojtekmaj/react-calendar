import React from 'react';
import PropTypes from 'prop-types';

const Flex = ({ children, className, count, offset, wrap }) => (
  <div
    className={className}
    style={{
      display: 'flex',
      flexWrap: wrap ? 'wrap' : 'no-wrap',
    }}
  >
    {React.Children.map(children, (child, index) => (
      <div
        style={Object.assign(
          {
            display: 'flex',
            flexBasis: `calc(100% / ${count})`,
          },
          offset && (index === 0) && {
            marginLeft: `calc(100% * ${offset} / ${count})`,
          },
        )}
      >
        {child}
      </div>
    ))}
  </div>
);

Flex.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  count: PropTypes.number.isRequired,
  offset: PropTypes.number,
  wrap: PropTypes.bool,
};

export default Flex;
