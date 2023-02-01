import React from 'react';
import PropTypes from 'prop-types';

const allViews = ['century', 'decade', 'year', 'month'];

function upperCaseFirstLetter(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export default function MinDetailOptions({ maxDetail, minDetail, setMinDetail }) {
  function onChange(event) {
    const { value } = event.target;

    setMinDetail(value);
  }

  const maxDetailIndex = allViews.indexOf(maxDetail);

  return (
    <fieldset>
      <legend>Minimum detail</legend>

      {allViews.map((view, index) => (
        <div key={view}>
          <input
            checked={minDetail === view}
            disabled={maxDetailIndex < index}
            id={`min-${view}`}
            name="minDetail"
            onChange={onChange}
            type="radio"
            value={view}
          />
          <label htmlFor={`min-${view}`}>{upperCaseFirstLetter(view)}</label>
        </div>
      ))}
    </fieldset>
  );
}

MinDetailOptions.propTypes = {
  maxDetail: PropTypes.oneOf(allViews).isRequired,
  minDetail: PropTypes.oneOf(allViews).isRequired,
  setMinDetail: PropTypes.func.isRequired,
};
