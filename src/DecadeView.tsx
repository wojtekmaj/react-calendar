import React from 'react';

import Years from './DecadeView/Years';

import { tileGroupProps } from './shared/propTypes';

type DecadeViewProps = React.ComponentProps<typeof Years>;

export default function DecadeView(props: DecadeViewProps) {
  function renderYears() {
    return <Years {...props} />;
  }

  return <div className="react-calendar__decade-view">{renderYears()}</div>;
}

DecadeView.propTypes = {
  ...tileGroupProps,
};
