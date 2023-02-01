import React from 'react';
import PropTypes from 'prop-types';

export default function ViewOptions({
  setShowDoubleView,
  setShowFixedNumberOfWeeks,
  setShowNeighboringMonth,
  setShowWeekNumbers,
  showDoubleView,
  showFixedNumberOfWeeks,
  showNeighboringMonth,
  showWeekNumbers,
}) {
  function onShowDoubleViewChange(event) {
    const { checked } = event.target;

    setShowDoubleView(checked);
  }

  function onShowFixedNumberOfWeeksChange(event) {
    const { checked } = event.target;

    setShowFixedNumberOfWeeks(checked);
  }

  function onShowWeekNumbersChange(event) {
    const { checked } = event.target;

    setShowWeekNumbers(checked);
  }

  function onShowNeighboringMonthChange(event) {
    const { checked } = event.target;

    setShowNeighboringMonth(checked);
  }

  return (
    <fieldset>
      <legend>View options</legend>

      <div>
        <input
          checked={showDoubleView}
          id="showDoubleView"
          onChange={onShowDoubleViewChange}
          type="checkbox"
        />
        <label htmlFor="showDoubleView">Show double view</label>
      </div>

      <div>
        <input
          checked={showFixedNumberOfWeeks || showDoubleView}
          disabled={showDoubleView}
          id="showFixedNumberOfWeeks"
          onChange={onShowFixedNumberOfWeeksChange}
          type="checkbox"
        />
        <label htmlFor="showFixedNumberOfWeeks">Show fixed number of weeks</label>
      </div>

      <div>
        <input
          checked={showNeighboringMonth || showFixedNumberOfWeeks}
          disabled={showFixedNumberOfWeeks}
          id="showNeighboringMonth"
          onChange={onShowNeighboringMonthChange}
          type="checkbox"
        />
        <label htmlFor="showNeighboringMonth">{"Show neighboring month's days"}</label>
      </div>

      <div>
        <input
          checked={showWeekNumbers}
          id="showWeekNumbers"
          onChange={onShowWeekNumbersChange}
          type="checkbox"
        />
        <label htmlFor="showWeekNumbers">Show week numbers</label>
      </div>
    </fieldset>
  );
}

ViewOptions.propTypes = {
  setShowDoubleView: PropTypes.func.isRequired,
  setShowFixedNumberOfWeeks: PropTypes.func.isRequired,
  setShowNeighboringMonth: PropTypes.func.isRequired,
  setShowWeekNumbers: PropTypes.func.isRequired,
  showDoubleView: PropTypes.bool.isRequired,
  showFixedNumberOfWeeks: PropTypes.bool.isRequired,
  showNeighboringMonth: PropTypes.bool.isRequired,
  showWeekNumbers: PropTypes.bool.isRequired,
};
