import React from 'react';
import PropTypes from 'prop-types';

const allViews = ['century', 'decade', 'year', 'month'];

function upperCaseFirstLetter(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export default function MaxDetailOptions({ maxDetail, minDetail, setState }) {
  function onChange(event) {
    const { value } = event.target;

    setState({ maxDetail: value });
  }

  const minDetailIndex = allViews.indexOf(minDetail);

  return (
    <fieldset id="detailoptions">
      <legend htmlFor="viewoptions">
        Maximum detail
      </legend>

      {allViews.map((view, index) => (
        <div key={view}>
          <input
            checked={maxDetail === view}
            disabled={minDetailIndex > index}
            id={view}
            name="maxDetail"
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

MaxDetailOptions.propTypes = {
  maxDetail: PropTypes.oneOf(allViews).isRequired,
  minDetail: PropTypes.oneOf(allViews).isRequired,
  setState: PropTypes.func.isRequired,
};
