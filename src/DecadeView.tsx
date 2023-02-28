import React from 'react';

import Years from './DecadeView/Years';

type DecadeViewProps = React.ComponentProps<typeof Years>;

export default function DecadeView(props: DecadeViewProps) {
  function renderYears() {
    return <Years {...props} />;
  }

  return <div className="react-calendar__decade-view">{renderYears()}</div>;
}
