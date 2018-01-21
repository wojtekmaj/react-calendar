import React, { PureComponent } from 'react';

import TileGroup from '../TileGroup';
import Decade from './Decade';

import {
  getBeginOfDecade,
  getBeginOfCenturyYear,
} from '../shared/dates';
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
    const {
      activeStartDate,
      ...otherProps
    } = this.props;

    return (
      <TileGroup
        {...otherProps}
        className="react-calendar__century-view__decades"
        dateTransform={getBeginOfDecade}
        dateType="decade"
        end={this.end}
        start={this.start}
        step={10}
        tile={Decade}
      />
    );
  }
}

Decades.propTypes = {
  ...tileGroupProps,
};
