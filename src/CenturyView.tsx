import React from 'react';

import Decades from './CenturyView/Decades';

import { tileGroupProps } from './shared/propTypes';

type CenturyViewProps = React.ComponentProps<typeof Decades>;

const CenturyView: React.FC<CenturyViewProps> = function CenturyView(props) {
  function renderDecades() {
    return <Decades {...props} />;
  }

  return <div className="react-calendar__century-view">{renderDecades()}</div>;
};

CenturyView.propTypes = {
  ...tileGroupProps,
};

export default CenturyView;
