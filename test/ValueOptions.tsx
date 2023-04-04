import React from 'react';
import PropTypes from 'prop-types';
import { getISOLocalDateTime } from '@wojtekmaj/date-utils';

import { isValue } from './shared/propTypes';

import type { LooseValue } from './shared/types';

type ValueOptionsProps = {
  selectRange?: boolean;
  setSelectRange: (selectRange: boolean) => void;
  setValue: (value: LooseValue) => void;
  value?: LooseValue;
};

export default function ValueOptions({
  selectRange,
  setSelectRange,
  setValue,
  value,
}: ValueOptionsProps) {
  const [valueFrom, valueTo] = Array.isArray(value) ? value : [value, null];

  function setStartValue(nextValueFrom: string | Date | null) {
    if (!nextValueFrom) {
      setValue(valueTo);
      return;
    }

    if (Array.isArray(value)) {
      setValue([nextValueFrom, valueTo]);
    } else {
      setValue(nextValueFrom);
    }
  }

  function setEndValue(nextValueTo: string | Date | null) {
    if (!nextValueTo) {
      setValue(valueFrom || null);
      return;
    }

    setValue([valueFrom || null, nextValueTo]);
  }

  function onStartChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: nextValue } = event.target;

    setStartValue(nextValue ? new Date(nextValue) : null);
  }

  function onEndChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: nextValue } = event.target;
    setEndValue(nextValue ? new Date(nextValue) : null);
  }

  function onSelectRangeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;

    setSelectRange(checked);
  }

  return (
    <fieldset>
      <legend>Value options</legend>

      <div>
        <label htmlFor="startDate">Start date</label>
        <input
          id="startDate"
          onChange={onStartChange}
          type="datetime-local"
          value={
            valueFrom && valueFrom instanceof Date
              ? getISOLocalDateTime(valueFrom)
              : valueFrom || undefined
          }
        />
        &nbsp;
        <button onClick={() => setStartValue(null)} type="button">
          Clear to null
        </button>
        <button onClick={() => setStartValue('')} type="button">
          Clear to empty string
        </button>
      </div>

      <div>
        <label htmlFor="endDate">End date</label>
        <input
          id="endDate"
          onChange={onEndChange}
          type="datetime-local"
          value={
            valueTo && valueTo instanceof Date ? getISOLocalDateTime(valueTo) : valueTo || undefined
          }
        />
        &nbsp;
        <button onClick={() => setEndValue(null)} type="button">
          Clear to null
        </button>
        <button onClick={() => setEndValue('')} type="button">
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
        <label htmlFor="selectRange">Select range</label>
      </div>
    </fieldset>
  );
}

ValueOptions.propTypes = {
  selectRange: PropTypes.bool,
  setSelectRange: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, isValue]),
};
