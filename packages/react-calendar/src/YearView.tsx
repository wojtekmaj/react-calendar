import React from 'react';
import clsx from 'clsx';

import Months, { slotNames as monthsSlotNames } from './YearView/Months.js';

import { tileGroupProps } from './shared/propTypes.js';
import type { ClassName } from './shared/types.js';
import { pickClassNames } from './shared/utils.js';

const localSlotName = ['yearView'] as const;
type LocalSlotName = (typeof localSlotName)[number];
export const slotNames = [...localSlotName, ...monthsSlotNames] as const;

type MonthsProps = React.ComponentProps<typeof Months>;

type YearViewProps = Omit<MonthsProps, 'classNames'> & {
  classNames?: MonthsProps['classNames'] & Partial<Record<LocalSlotName, ClassName>>;
};

/**
 * Displays a given year.
 */
const YearView: React.FC<YearViewProps> = function YearView({ classNames = {}, ...props }) {
  function renderMonths() {
    return <Months {...props} classNames={pickClassNames(classNames, monthsSlotNames)} />;
  }

  return (
    <div className={clsx('react-calendar__year-view', classNames.yearView)}>{renderMonths()}</div>
  );
};

YearView.propTypes = {
  ...tileGroupProps,
};

export default YearView;
