import React from 'react';
import PropTypes from 'prop-types';

import Decades from './CenturyView/Decades.js';

import { tileGroupProps } from './shared/propTypes.js';

type CenturyViewProps = React.ComponentProps<typeof Decades>;

/**
 * Displays a given century.
 */
const CenturyView: React.FC<CenturyViewProps> = function CenturyView(props) {
  function renderDecades() {
    return <Decades {...props} />;
  }

  return <div className="react-calendar__century-view">{renderDecades()}</div>;
};

CenturyView.propTypes = {
  ...tileGroupProps,
  showNeighboringCentury: PropTypes.bool,
};

export default CenturyView;
