import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isValue } from '../src/shared/propTypes';
import { getISOLocalDate } from './shared/dates';

export default class ValueOptions extends Component {
  get startDate() {
    const { value } = this.props;
    return [].concat(value)[0];
  }

  get endDate() {
    const { value } = this.props;
    return [].concat(value)[1];
  }

  onChange = (event) => {
    const { value } = event.target;

    if (!value) {
      return;
    }

    this.props.setState({ value: new Date(value) });
  }

  render() {
    return (
      <fieldset id="detailoptions">
        <legend htmlFor="viewoptions">Set date externally</legend>

        <div>
          <label htmlFor="minDetailCentury">Start date</label>
          <input
            onChange={this.onChange}
            type="date"
            value={getISOLocalDate(this.startDate)}
          />
        </div>
      </fieldset>
    );
  }
}

ValueOptions.propTypes = {
  setState: PropTypes.func.isRequired,
  value: isValue,
};
