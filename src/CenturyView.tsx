import React from 'react';

import Decades from './CenturyView/Decades.js';

import { tileGroupProps } from './shared/propTypes.js';

type CenturyViewProps = React.ComponentProps<typeof Decades>;

export default function CenturyView(props: CenturyViewProps) {
  function renderDecades() {
    return <Decades {...props} />;
  }

  return <div className="react-calendar__century-view">{renderDecades()}</div>;
}

CenturyView.propTypes = {
  ...tileGroupProps,
};
