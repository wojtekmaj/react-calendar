import React from 'react';

import Flex from './Flex.js';

import { getTileClassName, type TileClassNames } from './shared/utils.js';

import type { ClassName, RangeType, Value } from './shared/types.js';

export const slotNames = ['tileGroup', 'tile'] as const;
export type SlotName = (typeof slotNames)[number];

type TileGroupProps = {
  classNames?: {
    tileGroup?: ClassName;
    tile?: TileClassNames;
  };
  count?: number;
  dateTransform: (point: number) => Date;
  dateType: RangeType;
  end: number;
  hover?: Date | null;
  offset?: number;
  renderTile: (props: { className: ClassName; date: Date }) => React.ReactElement;
  start: number;
  step?: number;
  value?: Value;
  valueType: RangeType;
};

export default function TileGroup({
  classNames = {},
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
}: TileGroupProps) {
  const tiles = [];
  for (let point = start; point <= end; point += step) {
    const date = dateTransform(point);

    tiles.push(
      renderTile({
        className: getTileClassName({
          date,
          dateType,
          hover,
          value,
          valueType,
          tileClassNames: classNames.tile,
        }),
        date,
      }),
    );
  }

  return (
    <Flex className={classNames.tileGroup} count={count} offset={offset} wrap>
      {tiles}
    </Flex>
  );
}
