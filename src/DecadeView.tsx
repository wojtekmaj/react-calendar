import React from 'react';

import Years from './DecadeView/Years';

import { tileGroupProps } from './shared/propTypes';

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
