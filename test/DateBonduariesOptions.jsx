import React from 'react';
import PropTypes from 'prop-types';
import { getISOLocalDateTime } from '@wojtekmaj/date-utils';

export default function DateBonduariesOptions({ maxDate, minDate, setMaxDate, setMinDate }) {
  function onMinChange(event) {
    const { value } = event.target;

    setMinDate(new Date(value));
  }

  function onMaxChange(event) {
    const { value } = event.target;

    setMaxDate(new Date(value));
  }

  return (
    <fieldset>
      <legend>Minimum and maximum date</legend>

      <div>
        <label htmlFor="minDatetime">Minimum date</label>
        <input
          id="minDatetime"
          onChange={onMinChange}
          type="datetime-local"
          value={minDate ? getISOLocalDateTime(minDate) : ''}
        />
        &nbsp;
        <button onClick={() => setMinDate(undefined)} type="button">
          Clear
        </button>
      </div>
      <div>
        <label htmlFor="maxDatetime">Maximum date</label>
        <input
          id="maxDatetime"
          onChange={onMaxChange}
          type="datetime-local"
          value={maxDate ? getISOLocalDateTime(maxDate) : ''}
        />
        &nbsp;
        <button onClick={() => setMaxDate(undefined)} type="button">
          Clear
        </button>
      </div>
    </fieldset>
  );
}

DateBonduariesOptions.propTypes = {
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  setMaxDate: PropTypes.func.isRequired,
  setMinDate: PropTypes.func.isRequired,
};
