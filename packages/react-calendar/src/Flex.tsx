import { Children, cloneElement } from 'react';

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: React.ReactElement<any>[];
  className?: string;
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
      className={className}
      style={{
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...style,
      }}
      {...otherProps}
    >
      {Children.map(children, (child, index) => {
        const marginInlineStart = offset && index === 0 ? toPercent((100 * offset) / count) : null;

        return cloneElement(child, {
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
