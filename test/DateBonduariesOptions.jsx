import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { getISOLocalDateTime } from './shared/dates';

export default class DateBonduariesOptions extends PureComponent {
  onMinChange = (event) => {
    const { setState } = this.props;

    const { value } = event.target;

    setState({ minDate: new Date(value) });
  }

  onMaxChange = (event) => {
    const { setState } = this.props;

    const { value } = event.target;

    setState({ maxDate: new Date(value) });
  }

  render() {
    const { maxDate, minDate, setState } = this.props;

    return (
      <fieldset id="datebonduariesoptions">
        <legend htmlFor="datebonduariesoptions">
          Minimum and maximum date
        </legend>

        <div>
          <label htmlFor="minDatetime">
            Minimum date
          </label>
          <input
            id="minDatetime"
            onChange={this.onMinChange}
            type="datetime-local"
            value={minDate ? getISOLocalDateTime(minDate) : ''}
          />
          &nbsp;
          <button
            onClick={() => setState({ minDate: null })}
            type="button"
          >
            Clear
          </button>
        </div>
        <div>
          <label htmlFor="maxDatetime">
            Maximum date
          </label>
          <input
            id="maxDatetime"
            onChange={this.onMaxChange}
            type="datetime-local"
            value={maxDate ? getISOLocalDateTime(maxDate) : ''}
          />
          &nbsp;
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
