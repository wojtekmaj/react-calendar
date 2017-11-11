import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getISOLocalDate } from './shared/dates';

export default class DateBonduariesOptions extends Component {
  onMinChange = (event) => {
    const { value } = event.target;

    this.props.setState({ minDate: new Date(value) });
  }

  onMaxChange = (event) => {
    const { value } = event.target;

    this.props.setState({ maxDate: new Date(value) });
  }

  render() {
    const { maxDate, minDate, setState } = this.props;

    return (
      <fieldset id="datebonduariesoptions">
        <legend htmlFor="datebonduariesoptions">Minimum and maximum date</legend>

        <div>
          <label htmlFor="minDate">Minimum date</label>
          <input
            id="minDate"
            onChange={this.onMinChange}
            type="date"
            value={minDate ? getISOLocalDate(minDate) : ''}
          />&nbsp;
          <button
            onClick={() => setState({ minDate: null })}
            type="button"
          >
            Clear
          </button>
        </div>
        <div>
          <label htmlFor="maxDate">Maximum date</label>
          <input
            id="maxDate"
            onChange={this.onMaxChange}
            type="date"
            value={maxDate ? getISOLocalDate(maxDate) : ''}
          />&nbsp;
          <button
            onClick={() => setState({ maxDate: null })}
            type="button"
          >
            Clear
          </button>
        </div>
      </fieldset>
    );
  }
}

DateBonduariesOptions.propTypes = {
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  setState: PropTypes.func.isRequired,
};
