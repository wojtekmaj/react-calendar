import React from 'react';
import PropTypes from 'prop-types';

import { getTileClasses } from './shared/utils';
import { tileGroupProps } from './shared/propTypes';

export default function TileGroup({
  className,
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
}) {
  const tiles = [];
  for (let point = start, i = 0; point <= end; point += step, i++) {
    const date = dateTransform(point);
    const style = i === 0 && offset ? { gridColumn: offset + 1 } : null;

    tiles.push(
      <Tile
        key={date.getTime()}
        classes={getTileClasses({
          value, valueType, date, dateType, hover,
        })}
        date={date}
        point={point}
        style={style}
        {...tileProps}
      />,
    );
  }

  return (
    <div
      className={className}
    >
      {tiles}
    </div>
  );
}

TileGroup.propTypes = {
  ...tileGroupProps,
  activeStartDate: PropTypes.instanceOf(Date),
  dateTransform: PropTypes.func.isRequired,
  offset: PropTypes.number,
  step: PropTypes.number,
  tile: PropTypes.func.isRequired,
};
