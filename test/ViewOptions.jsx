import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ViewOptions extends Component {
  onShowWeekNumbersChange = (event) => {
    const { checked } = event.target;

    this.props.setState({ showWeekNumbers: checked });
  }

  onshowNeighboringMonthChange = (event) => {
    const { checked } = event.target;

    this.props.setState({ showNeighboringMonth: checked });
  }

  render() {
    const { showWeekNumbers, showNeighboringMonth } = this.props;

    return (
      <fieldset id="viewoptions">
        <legend htmlFor="viewoptions">View options</legend>

        <div>
          <input
            id="showWeekNumbers"
            type="checkbox"
            checked={showWeekNumbers}
            onChange={this.onShowWeekNumbersChange}
          />
          <label htmlFor="renderTextLayer">Show week numbers</label>
        </div>

        <div>
          <input
            id="showNeighboringMonth"
            type="checkbox"
            checked={showNeighboringMonth}
            onChange={this.onshowNeighboringMonthChange}
          />
          <label htmlFor="renderTextLayer">{'Show neighboring month\'s days'}</label>
        </div>
      </fieldset>
    );
  }
}

ViewOptions.propTypes = {
  setState: PropTypes.func.isRequired,
  showNeighboringMonth: PropTypes.bool.isRequired,
  showWeekNumbers: PropTypes.bool.isRequired,
};
