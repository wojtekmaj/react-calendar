import React, { PureComponent } from 'react';

import Flex from '../Flex';
import Year from './Year';

import { getBeginOfDecadeYear } from '../shared/dates';
import { getTileClasses } from '../shared/utils';
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
    const { end, start } = this;

    const {
      activeStartDate,
      hover,
      value,
      valueType,
      ...yearProps
    } = this.props;

    const years = [];
    for (let year = start; year <= end; year += 1) {
      const date = new Date(year, 0, 1);

      years.push(
        <Year
          classes={getTileClasses({
            value, valueType, date, dateType: 'year', hover,
          })}
          date={date}
          key={year}
          year={year}
          {...yearProps}
        />,
      );
    }

    return (
      <Flex
        className="react-calendar__decade-view__years"
        count={3}
        wrap
      >
        {years}
      </Flex>
    );
  }
}

Years.propTypes = {
  ...tileGroupProps,
};
