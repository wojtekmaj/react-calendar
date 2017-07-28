import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ValueOptions extends Component {
  /**
   * Returns local date in ISO-like format (YYYY-MM-DD).
   */
  get ISOLocalDate() {
    const { value } = this.props;

    return `${
      value.getFullYear()
    }-${
      `0${value.getMonth() + 1}`.slice(-2)
    }-${
      `0${value.getDate()}`.slice(-2)
    }`;
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
            value={this.ISOLocalDate}
          />
        </div>
      </fieldset>
    );
  }
}

ValueOptions.propTypes = {
  setState: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
};
