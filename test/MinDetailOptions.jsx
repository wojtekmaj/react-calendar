import React from 'react';
import PropTypes from 'prop-types';

const allViews = ['century', 'decade', 'year', 'month'];

function upperCaseFirstLetter(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export default function MinDetailOptions({ maxDetail, minDetail, setState }) {
  function onChange(event) {
    const { value } = event.target;

    setState({ minDetail: value });
  }

  const maxDetailIndex = allViews.indexOf(maxDetail);

  return (
    <fieldset id="detailoptions">
      <legend htmlFor="viewoptions">
        Minimum detail
      </legend>

      {allViews.map((view, index) => (
        <div key={view}>
          <input
            checked={minDetail === view}
            disabled={maxDetailIndex < index}
            id={view}
            name="minDetail"
            onChange={onChange}
            type="radio"
            value={view}
          />
          <label htmlFor={view}>
            {upperCaseFirstLetter(view)}
          </label>
        </div>
      ))}
    </fieldset>
  );
}

MinDetailOptions.propTypes = {
  maxDetail: PropTypes.oneOf(allViews).isRequired,
  minDetail: PropTypes.oneOf(allViews).isRequired,
  setState: PropTypes.func.isRequired,
};
