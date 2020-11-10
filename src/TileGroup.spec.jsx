import React from 'react';
import { shallow } from 'enzyme';

import TileGroup from './TileGroup';

describe('<TileGroup /> component', () => {
  const defaultProps = {
    start: -5,
    end: 36,
    value: new Date(),
    valueType: 'day',
    date: new Date(),
    dateType: 'day',
    hover: null,
    tile: () => null,
    dateTransform: () => new Date(),
  };

  it('add style of offset if given', () => {
    const offset = 2;
    const component = shallow(
      <TileGroup {...defaultProps} offset={offset} />,
    );
    const tiles = component.find('div').prop('children');

    expect(tiles[0].props).toHaveProperty('style', { gridColumn: offset + 1 });
  });
});
