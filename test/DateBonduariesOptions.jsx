import React from 'react';
import PropTypes from 'prop-types';

import { getISOLocalDateTime } from './shared/dates';

export default function DateBonduariesOptions({
  maxDate,
  minDate,
  setState,
}) {
  function onMinChange(event) {
    const { value } = event.target;

    setState({ minDate: new Date(value) });
  }

  function onMaxChange(event) {
    const { value } = event.target;

    setState({ maxDate: new Date(value) });
  }

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
          onChange={onMinChange}
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
          onChange={onMaxChange}
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

DateBonduariesOptions.propTypes = {
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  setState: PropTypes.func.isRequired,
};
