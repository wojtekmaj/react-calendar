import React from 'react';

import Flex from './Flex';

import { getTileClasses } from './shared/utils';

import type { Range, RangeType } from './shared/types';

type TileGroupProps<T extends React.ElementType> = {
  className?: string;
  count?: number;
  dateTransform: (point: number) => Date;
  dateType: RangeType;
  end: number;
  hover?: Date;
  offset?: number;
  start: number;
  step?: number;
  tile: T;
  value?: Date | Range<Date>;
  valueType: RangeType;
} & Omit<React.ComponentProps<T>, 'classes' | 'date'>;

export default function TileGroup<T extends React.ElementType>({
  className,
  count = 3,
  dateTransform,
  dateType,
  end,
  hover,
  offset,
  start,
  step = 1,
  tile: Tile,
  value,
  valueType,
  ...tileProps
}: TileGroupProps<T>) {
  const tiles = [];
  for (let point = start; point <= end; point += step) {
    const date = dateTransform(point);

    const FixedTile = Tile as React.ElementType;

    tiles.push(
      <FixedTile
        key={date.getTime()}
        classes={getTileClasses({
          value,
          valueType,
          date,
          dateType,
          hover,
        })}
        date={date}
        {...tileProps}
      />,
    );
  }

  return (
    <Flex className={className} count={count} offset={offset} wrap>
      {tiles}
    </Flex>
  );
}
