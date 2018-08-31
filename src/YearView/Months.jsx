import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
    return (
      <TileGroup
        {...this.props}
        className="react-calendar__year-view__months"
        dateTransform={monthIndex => new Date(this.year, monthIndex, 1)}
        dateType="month"
        end={this.end}
        start={this.start}
        tile={Month}
      />
    );
  }
}

Months.propTypes = {
  ...tileGroupProps,
  locale: PropTypes.string,
};
