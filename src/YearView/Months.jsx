import React, { PureComponent } from 'react';

import TileGroup from '../TileGroup';
import Month from './Month';

import { getYear } from '../shared/dates';
import { tileGroupProps } from '../shared/propTypes';

export default class Months extends PureComponent {
  start = 0

  end = 11

  get year() {
    const { activeStartDate } = this.props;
    return getYear(activeStartDate);
  }

  render() {
    const { end, start, year } = this;

    const {
      activeStartDate,
      ...otherProps
    } = this.props;

    return (
      <TileGroup
        {...otherProps}
        className="react-calendar__year-view__months"
        dateTransform={monthIndex => new Date(year, monthIndex, 1)}
        dateType="month"
        end={end}
        start={start}
        tile={Month}
      />
    );
  }
}

Months.propTypes = {
  ...tileGroupProps,
};
