import React from 'react';

import Months from './YearView/Months';

import { tileGroupProps } from './shared/propTypes';

type YearViewProps = React.ComponentProps<typeof Months>;

const YearView: React.FC<YearViewProps> = function YearView(props) {
  function renderMonths() {
    return <Months {...props} />;
  }

  return <div className="react-calendar__year-view">{renderMonths()}</div>;
};

YearView.propTypes = {
  ...tileGroupProps,
};

export default YearView;
