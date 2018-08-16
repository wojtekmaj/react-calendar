import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ViewOptions extends PureComponent {
  onShowFixedNumberOfWeeksChange = (event) => {
    const { setState } = this.props;

    const { checked } = event.target;

    setState({ showFixedNumberOfWeeks: checked });
  }

  onShowWeekNumbersChange = (event) => {
    const { setState } = this.props;

    const { checked } = event.target;

    setState({ showWeekNumbers: checked });
  }

  onshowNeighboringMonthChange = (event) => {
    const { setState } = this.props;

    const { checked } = event.target;

    setState({ showNeighboringMonth: checked });
  }

  render() {
    const {
      showFixedNumberOfWeeks,
      showNeighboringMonth,
      showWeekNumbers,
    } = this.props;

    return (
      <fieldset id="viewoptions">
        <legend htmlFor="viewoptions">
          View options
        </legend>

        <div>
          <input
            id="showFixedNumberOfWeeks"
            type="checkbox"
            checked={showFixedNumberOfWeeks}
            onChange={this.onShowFixedNumberOfWeeksChange}
          />
          <label htmlFor="showFixedNumberOfWeeks">
            Show fixed number of weeks
          </label>
        </div>

        <div>
          <input
            id="showNeighboringMonth"
            type="checkbox"
            checked={showNeighboringMonth || showFixedNumberOfWeeks}
            disabled={showFixedNumberOfWeeks}
            onChange={this.onshowNeighboringMonthChange}
          />
          <label htmlFor="showNeighboringMonth">
            {'Show neighboring month\'s days'}
          </label>
        </div>

        <div>
          <input
            id="showWeekNumbers"
            type="checkbox"
            checked={showWeekNumbers}
            onChange={this.onShowWeekNumbersChange}
          />
          <label htmlFor="showWeekNumbers">
            Show week numbers
          </label>
        </div>
      </fieldset>
    );
  }
}

ViewOptions.propTypes = {
  setState: PropTypes.func.isRequired,
  showFixedNumberOfWeeks: PropTypes.bool.isRequired,
  showNeighboringMonth: PropTypes.bool.isRequired,
  showWeekNumbers: PropTypes.bool.isRequired,
};
