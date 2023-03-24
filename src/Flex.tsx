import React from 'react';
import PropTypes from 'prop-types';

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement[];
  className?: string;
  count: number;
  direction?: 'row' | 'column';
  offset?: number;
  wrap?: boolean;
};

function toPercent(num: number): string {
  return `${num}%`;
}

export default function Flex({
  children,
  className,
  count,
  direction,
  offset,
  style,
  wrap,
  ...otherProps
}: FlexProps) {
  return (
    <div
      className={className}
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
}

Flex.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  count: PropTypes.number.isRequired,
  direction: PropTypes.string,
  offset: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  wrap: PropTypes.bool,
};
