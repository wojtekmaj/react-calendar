import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Flex from './Flex';

import { getTileClasses } from './shared/utils';
import { tileGroupProps } from './shared/propTypes';

export default function TileGroup({
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
}) {
  const tiles = [];
  const gridRef = useRef(null);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
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

  const handleGridBlur = useCallback((event) => {
    const focusHasLeftGrid = !gridRef.current.contains(event.relatedTarget);
    if (focusHasLeftGrid) {
      setIsFocusWithin(false);
    }
  }, []);

  const handleGridFocus = useCallback(() => {
    if (!isFocusWithin) {
      setIsFocusWithin(true);

      // set focus to the first focusable tile
      const focusableTile = gridRef.current.querySelector('[tabindex="0"]');
      focusableTile?.focus();
    }
  }, [isFocusWithin]);

  return (
    <Flex
      className={className}
      count={count}
      offset={offset}
      onBlur={handleGridBlur}
      onFocus={handleGridFocus}
      ref={gridRef}
      role="grid"
      tabIndex={isFocusWithin ? -1 : 0}
      wrap
    >
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
