import React, { PureComponent } from 'react';

import TileGroup from '../TileGroup';
import Year from './Year';

import { getBeginOfDecadeYear } from '../shared/dates';
import { tileGroupProps } from '../shared/propTypes';

export default class Years extends PureComponent {
  get start() {
    const { activeStartDate } = this.props;
    return getBeginOfDecadeYear(activeStartDate);
  }

  get end() {
    return this.start + 9;
  }

  render() {
    const {
      activeStartDate,
      ...otherProps
    } = this.props;

    return (
      <TileGroup
        {...otherProps}
        className="react-calendar__decade-view__years"
        dateTransform={year => new Date(year, 0, 1)}
        dateType="year"
        end={this.end}
        start={this.start}
        tile={Year}
      />
    );
  }
}

Years.propTypes = {
  ...tileGroupProps,
};
