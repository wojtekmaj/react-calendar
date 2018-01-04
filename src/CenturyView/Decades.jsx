import React, { PureComponent } from 'react';

import Flex from '../Flex';
import Decade from './Decade';

import {
  getBeginOfDecade,
  getBeginOfCenturyYear,
} from '../shared/dates';
import { getTileClasses } from '../shared/utils';
import { tileGroupProps } from '../shared/propTypes';

export default class Decades extends PureComponent {
  get start() {
    const { activeStartDate } = this.props;
    return getBeginOfCenturyYear(activeStartDate);
  }

  get end() {
    return this.start + 99;
  }

  render() {
    const { end, start } = this;

    const {
      activeStartDate,
      hover,
      value,
      valueType,
      ...decadeProps
    } = this.props;

    const decades = [];
    for (let decade = start; decade <= end; decade += 10) {
      const date = getBeginOfDecade(decade);

      decades.push(
        <Decade
          classes={getTileClasses({
            value, valueType, date, dateType: 'decade', hover,
          })}
          date={date}
          decade={decade}
          key={decade}
          {...decadeProps}
        />,
      );
    }

    return (
      <Flex
        className="react-calendar__century-view__decades"
        count={3}
        wrap
      >
        {decades}
      </Flex>
    );
  }
}

Decades.propTypes = {
  ...tileGroupProps,
};
