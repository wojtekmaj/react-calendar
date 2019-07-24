import React from 'react';
import PropTypes from 'prop-types';

import { isValue } from '../src/shared/propTypes';
import { getISOLocalDateTime } from './shared/dates';

export default function ValueOptions({
  selectRange,
  setState,
  value,
}) {
  const startDate = [].concat(value)[0];
  const endDate = [].concat(value)[1];

  function setValue(nextValue) {
    setState({ value: nextValue });
  }

  function setStartValue(startValue) {
    if (!startValue) {
      setValue(value[1] || startValue);
      return;
    }

    if (Array.isArray(value)) {
      setValue([startValue, value[1]]);
    } else {
      setValue(startValue);
    }
  }

  function setEndValue(endValue) {
    if (!endValue) {
      setValue(value[0]);
      return;
    }

    if (Array.isArray(value)) {
      setValue([value[0], endValue]);
    } else {
      setValue([value, endValue]);
    }
  }

  function onStartChange(event) {
    const { value: nextValue } = event.target;
    setStartValue(new Date(nextValue));
  }

  function onEndChange(event) {
    const { value: nextValue } = event.target;
    setEndValue(new Date(nextValue));
  }

  function onSelectRangeChange(event) {
    const { checked } = event.target;

    setState({ selectRange: checked });
  }

  return (
    <fieldset id="valueOptions">
      <legend htmlFor="valueOptions">
        Value options
      </legend>

      <div>
        <label htmlFor="startDate">
          Start date
        </label>
        <input
          id="startDate"
          onChange={onStartChange}
          type="datetime-local"
          value={startDate ? getISOLocalDateTime(startDate) : ''}
        />
        &nbsp;
        <button
          onClick={() => setStartValue(null)}
          type="button"
        >
          Clear to null
        </button>
        <button
          onClick={() => setStartValue('')}
          type="button"
        >
          Clear to empty string
        </button>
      </div>

      <div>
        <label htmlFor="endDate">
          End date
        </label>
        <input
          id="endDate"
          onChange={onEndChange}
          type="datetime-local"
          value={endDate ? getISOLocalDateTime(endDate) : ''}
        />
        &nbsp;
        <button
          onClick={() => setEndValue(null)}
          type="button"
        >
          Clear to null
        </button>
        <button
          onClick={() => setEndValue('')}
          type="button"
        >
          Clear to empty string
        </button>
      </div>

      <div>
        <input
          checked={selectRange}
          id="selectRange"
          onChange={onSelectRangeChange}
          type="checkbox"
        />
        <label htmlFor="selectRange">
          Select range
        </label>
      </div>
    </fieldset>
  );
}

ValueOptions.propTypes = {
  selectRange: PropTypes.bool,
  setState: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    isValue,
  ]),
};
