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
        <legend htmlFor="viewoptions">Set date externally</legend>

        <div>
          <label htmlFor="minDate">Min date</label>
          <input
            onChange={this.onMinChange}
            type="date"
            value={minDate ? getISOLocalDate(minDate) : ''}
          />&nbsp;
          <button onClick={() => setState({ minDate: null })}>Clear</button>
        </div>
        <div>
          <label htmlFor="maxDate">Max date</label>
          <input
            onChange={this.onMaxChange}
            type="date"
            value={maxDate ? getISOLocalDate(maxDate) : ''}
          />&nbsp;
          <button onClick={() => setState({ maxDate: null })}>Clear</button>
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
