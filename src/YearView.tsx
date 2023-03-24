import React from 'react';

import Months from './YearView/Months';

type YearViewProps = React.ComponentProps<typeof Months>;

export default function YearView(props: YearViewProps) {
  function renderMonths() {
    return <Months {...props} />;
  }

  return <div className="react-calendar__year-view">{renderMonths()}</div>;
}
