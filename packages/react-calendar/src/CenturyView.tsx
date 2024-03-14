import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Decades, { slotNames as decadesSlotNames } from './CenturyView/Decades.js';

import { tileGroupProps } from './shared/propTypes.js';
import type { ClassName } from './shared/types.js';
import { pickClassNames } from './shared/utils.js';

const localSlotNames = ['base'] as const;
type LocalSlotName = (typeof localSlotNames)[number];

type DecadesProps = React.ComponentProps<typeof Decades>;

type CenturyViewProps = Omit<DecadesProps, 'classNames'> & {
  classNames?: DecadesProps['classNames'] & Partial<Record<LocalSlotName, ClassName>>;
};

/**
 * Displays a given century.
 */
const CenturyView: React.FC<CenturyViewProps> = function CenturyView({
  classNames = {},
  ...props
}) {
  function renderDecades() {
    return <Decades {...props} classNames={pickClassNames(classNames, decadesSlotNames)} />;
  }

  return (
    <div className={clsx('react-calendar__century-view', classNames.base)}>{renderDecades()}</div>
  );
};

CenturyView.propTypes = {
  ...tileGroupProps,
  showNeighboringCentury: PropTypes.bool,
};

export default CenturyView;
