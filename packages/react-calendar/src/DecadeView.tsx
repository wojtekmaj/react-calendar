import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Years, { slotNames as yearsSlotNames } from './DecadeView/Years.js';

import { tileGroupProps } from './shared/propTypes.js';
import type { ClassName } from './shared/types.js';
import { pickClassNames } from './shared/utils.js';

const localSlotName = ['base'] as const;
type LocalSlotName = (typeof localSlotName)[number];
export const slotNames = [...localSlotName, ...yearsSlotNames] as const;

type YearsProps = React.ComponentProps<typeof Years>;

type DecadeViewProps = Omit<YearsProps, 'classNames'> & {
  classNames?: YearsProps['classNames'] & Partial<Record<LocalSlotName, ClassName>>;
};

/**
 * Displays a given decade.
 */
const DecadeView: React.FC<DecadeViewProps> = function DecadeView({ classNames = {}, ...props }) {
  function renderYears() {
    return <Years {...props} classNames={pickClassNames(classNames, yearsSlotNames)} />;
  }

  return (
    <div className={clsx('react-calendar__decade-view', classNames.base)}>{renderYears()}</div>
  );
};

DecadeView.propTypes = {
  ...tileGroupProps,
  showNeighboringDecade: PropTypes.bool,
};

export default DecadeView;
