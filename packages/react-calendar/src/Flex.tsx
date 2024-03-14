import React from 'react';
import clsx from 'clsx';

import type { ClassName } from './shared/types.js';

type FlexProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> & {
  children: React.ReactElement[];
  className?: ClassName;
  count: number;
  direction?: 'row' | 'column';
  offset?: number;
  style?: React.CSSProperties;
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
      className={clsx(className)}
      style={{
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...style,
      }}
      {...otherProps}
    >
      {React.Children.map(children, (child, index) => {
        const marginInlineStart = offset && index === 0 ? toPercent((100 * offset) / count) : null;

        return React.cloneElement(child, {
          ...child.props,
          style: {
            flexBasis: toPercent(100 / count),
            flexShrink: 0,
            flexGrow: 0,
            overflow: 'hidden',
            marginLeft: marginInlineStart,
            marginInlineStart: marginInlineStart,
            marginInlineEnd: 0,
          },
        });
      })}
    </div>
  );
}
