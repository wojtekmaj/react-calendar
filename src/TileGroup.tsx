import React from 'react';
import PropTypes from 'prop-types';

import Flex from './Flex';

import { getTileClasses } from './shared/utils';
import { tileGroupProps } from './shared/propTypes';

import type { RangeType } from './shared/types';

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
  value?: Date;
  valueType: RangeType;
} & React.ComponentProps<T>;

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

    tiles.push(
      <Tile
        key={date.getTime()}
        classes={getTileClasses({
          value,
          valueType,
          date,
          dateType,
          hover,
        })}
        date={date}
        point={point}
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

TileGroup.propTypes = {
  ...tileGroupProps,
  className: PropTypes.string,
  count: PropTypes.number,
  dateTransform: PropTypes.func.isRequired,
  dateType: PropTypes.string,
  end: PropTypes.number.isRequired,
  offset: PropTypes.number,
  step: PropTypes.number,
  start: PropTypes.number.isRequired,
  tile: PropTypes.func.isRequired,
};
