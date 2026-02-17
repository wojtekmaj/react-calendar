import { Children, cloneElement } from 'react';

type FlexProps = React.HTMLAttributes<HTMLUListElement> & {
  // biome-ignore lint/suspicious/noExplicitAny: Too complex to type
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
}: FlexProps): React.ReactElement {
  return (
    <ul
      className={className}
      style={{
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        margin: 0,
        padding: 0,
        ...style,
      }}
      {...otherProps}
    >
      {Children.map(children, (child, index) => {
        const marginInlineStart = offset && index === 0 ? toPercent((100 * offset) / count) : null;

        return (
          <li
            style={{
              display: 'flex',
              flexBasis: toPercent(100 / count),
              flexShrink: 0,
              flexGrow: 0,
              overflow: 'hidden',
              marginLeft: marginInlineStart || undefined,
              marginInlineStart: marginInlineStart || undefined,
              marginInlineEnd: 0,
            }}
          >
            {cloneElement(child, {
              ...child.props,
              style: {
                flex: 1,
              },
            })}
          </li>
        );
      })}
    </ul>
  );
}
