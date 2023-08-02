import React from 'react';

import Years from './DecadeView/Years.js';

import { tileGroupProps } from './shared/propTypes.js';

type DecadeViewProps = React.ComponentProps<typeof Years>;

const DecadeView: React.FC<DecadeViewProps> = function DecadeView(props) {
  function renderYears() {
    return <Years {...props} />;
  }

  return <div className="react-calendar__decade-view">{renderYears()}</div>;
};

DecadeView.propTypes = {
  ...tileGroupProps,
};

export default DecadeView;
