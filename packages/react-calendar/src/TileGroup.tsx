import Flex from './Flex.js';

import { getTileClasses } from './shared/utils.js';

import type { RangeType, Value } from './shared/types.js';

type TileGroupProps = {
  className?: string;
  count?: number;
  dateTransform: (point: number) => Date;
  dateType: RangeType;
  end: number;
  hover?: Date | null;
  offset?: number;
  renderTile: (props: { classes: string[]; date: Date }) => React.ReactElement;
  start: number;
  step?: number;
  value?: Value;
  valueType: RangeType;
  now?: Date;
};

export default function TileGroup({
  className,
  count = 3,
  dateTransform,
  dateType,
  end,
  hover,
  offset,
  renderTile,
  start,
  step = 1,
  value,
  valueType,
  now,
}: TileGroupProps): React.ReactElement {
  const tiles = [];
  for (let point = start; point <= end; point += step) {
    const date = dateTransform(point);

    tiles.push(
      renderTile({
        classes: getTileClasses({
          date,
          dateType,
          hover,
          value,
          valueType,
          now,
        }),
        date,
      }),
    );
  }

  return (
    <Flex className={className} count={count} offset={offset} wrap>
      {tiles}
    </Flex>
  );
}
