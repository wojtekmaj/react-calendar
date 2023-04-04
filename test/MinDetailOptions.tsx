import React from 'react';
import PropTypes from 'prop-types';
import { View } from './shared/types';

const allViews = ['century', 'decade', 'year', 'month'] as const;

function upperCaseFirstLetter(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

type MinDetailOptionsProps = {
  maxDetail: View;
  minDetail: View;
  setMinDetail: (maxDetail: View) => void;
};

export default function MinDetailOptions({
  maxDetail,
  minDetail,
  setMinDetail,
}: MinDetailOptionsProps) {
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setMinDetail(value as View);
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
