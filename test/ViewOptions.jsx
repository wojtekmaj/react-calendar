import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isValue } from '../src/shared/propTypes';
import {
  getISOLocalDate,
  getBeginOfDay,
} from './shared/dates';

export default class ViewOptions extends Component {
  onActiveStartDateChange = (event) => {
    const { value } = event.target;
    this.props.setState({ activeStartDate: getBeginOfDay(new Date(value)) });
  }

  onShowWeekNumbersChange = (event) => {
    const { checked } = event.target;

    this.props.setState({ showWeekNumbers: checked });
  }

  onshowNeighboringMonthChange = (event) => {
    const { checked } = event.target;

    this.props.setState({ showNeighboringMonth: checked });
  }

  render() {
    const { activeStartDate, showWeekNumbers, showNeighboringMonth } = this.props;

    return (
      <fieldset id="viewoptions">
        <legend htmlFor="viewoptions">View options</legend>

        <div>
          <label htmlFor="activeStartDate">Active start date</label>
          <input
            id="activeStartDate"
            onChange={this.onActiveStartDateChange}
            type="date"
            value={activeStartDate ? getISOLocalDate(activeStartDate) : ''}
          />&nbsp;
          <button onClick={() => this.setStartValue(null)}>Clear to null</button>
          <button onClick={() => this.setStartValue('')}>Clear to empty string</button>
        </div>

        <div>
          <input
            id="showWeekNumbers"
            type="checkbox"
            checked={showWeekNumbers}
            onChange={this.onShowWeekNumbersChange}
          />
          <label htmlFor="showWeekNumbers">Show week numbers</label>
        </div>

        <div>
          <input
            id="showNeighboringMonth"
            type="checkbox"
            checked={showNeighboringMonth}
            onChange={this.onshowNeighboringMonthChange}
          />
          <label htmlFor="showNeighboringMonth">{'Show neighboring month\'s days'}</label>
        </div>
      </fieldset>
    );
  }
}

ViewOptions.propTypes = {
  activeStartDate: isValue,
  setState: PropTypes.func.isRequired,
  showNeighboringMonth: PropTypes.bool.isRequired,
  showWeekNumbers: PropTypes.bool.isRequired,
};
