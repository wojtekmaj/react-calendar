import React from 'react';
import clsx from 'clsx';

import type { ClassName, OnClickWeekNumberFunc } from '../shared/types.js';

const className = 'react-calendar__tile';

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'className'> & {
  onClickWeekNumber: OnClickWeekNumberFunc;
};

type DivProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> & {
  onClickWeekNumber?: undefined;
};

type WeekNumberProps<T = OnClickWeekNumberFunc | undefined> = (T extends OnClickWeekNumberFunc
  ? ButtonProps
  : DivProps) & {
  className?: ClassName;
  date: Date;
  weekNumber: number;
};

export default function WeekNumber(props: WeekNumberProps) {
  const { onClickWeekNumber, weekNumber, className: externalClassName } = props;

  const children = <span>{weekNumber}</span>;

  if (onClickWeekNumber) {
    const { date, onClickWeekNumber, weekNumber, ...otherProps } = props;

    return (
      <button
        {...otherProps}
        className={clsx(className, externalClassName)}
        onClick={(event) => onClickWeekNumber(weekNumber, date, event)}
        type="button"
      >
        {children}
      </button>
    );
  } else {
    const { date, onClickWeekNumber, weekNumber, ...otherProps } = props;

    return (
      <div {...otherProps} className={clsx(className, externalClassName)}>
        {children}
      </div>
    );
  }
}
