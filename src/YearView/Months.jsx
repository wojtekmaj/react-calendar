import React, { PureComponent } from 'react';

import Flex from '../Flex';
import Month from './Month';

import { getYear } from '../shared/dates';
import { getTileClasses } from '../shared/utils';
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
      hover,
      value,
      valueType,
      ...monthProps
    } = this.props;

    const months = [];
    for (let monthIndex = start; monthIndex <= end; monthIndex += 1) {
      const date = new Date(year, monthIndex, 1);

      months.push(
        <Month
          classes={getTileClasses({
            value, valueType, date, dateType: 'month', hover,
          })}
          date={date}
          key={monthIndex}
          {...monthProps}
        />,
      );
    }

    return (
      <Flex
        className="react-calendar__year-view__months"
        count={3}
        wrap
      >
        {months}
      </Flex>
    );
  }
}

Months.propTypes = {
  ...tileGroupProps,
};
