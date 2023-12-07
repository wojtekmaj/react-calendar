import React, { useMemo } from 'react';
import clsx from 'clsx';

import type {
  ClassName,
  TileClassNameFunc,
  TileContentFunc,
  TileDisabledFunc,
  View,
} from './shared/types.js';

type TileProps = {
  /**
   * The beginning of a period that shall be displayed.
   *
   * @example new Date(2017, 0, 1)
   */
  activeStartDate: Date;
  children: React.ReactNode;
  classes?: string[];
  date: Date;
  formatAbbr?: (locale: string | undefined, date: Date) => string;
  /**
   * Locale that should be used by the calendar. Can be any [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag).
   *
   * **Note**: When using SSR, setting this prop may help resolving hydration errors caused by locale mismatch between server and client.
   *
   * @example 'hu-HU'
   */
  locale?: string;
  /**
   * Maximum date that the user can select. Periods partially overlapped by maxDate will also be selectable, although react-calendar will ensure that no later date is selected.
   *
   * @example new Date()
   */
  maxDate?: Date;
  maxDateTransform: (date: Date) => Date;
  /**
   * Minimum date that the user can select. Periods partially overlapped by minDate will also be selectable, although react-calendar will ensure that no earlier date is selected.
   *
   * @example new Date()
   */
  minDate?: Date;
  minDateTransform: (date: Date) => Date;
  onClick?: (date: Date, event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOver?: (date: Date) => void;
  style?: React.CSSProperties;
  /**
   * Class name(s) that will be applied to a given calendar item (day on month view, month on year view and so on).
   *
   * @example 'class1 class2'
   * @example ['class1', 'class2 class3']
   * @example ({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 3 ? 'wednesday' : null
   */
  tileClassName?: TileClassNameFunc | ClassName;
  /**
   * Allows to render custom content within a given calendar item (day on month view, month on year view and so on).
   *
   * @example 'Sample'
   * @example ({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null
   */
  tileContent?: TileContentFunc | React.ReactNode;
  /**
   * Pass a function to determine if a certain day should be displayed as disabled.
   *
   * @example ({ activeStartDate, date, view }) => date.getDay() === 0
   */
  tileDisabled?: TileDisabledFunc;
  /**
   * Determines which calendar view shall be opened. Does not disable navigation. Can be `"month"`, `"year"`, `"decade"` or `"century"`.
   *
   * @example 'year'
   */
  view: View;
};

export default function Tile(props: TileProps) {
  const {
    activeStartDate,
    children,
    classes,
    date,
    formatAbbr,
    locale,
    maxDate,
    maxDateTransform,
    minDate,
    minDateTransform,
    onClick,
    onMouseOver,
    style,
    tileClassName: tileClassNameProps,
    tileContent: tileContentProps,
    tileDisabled,
    view,
  } = props;

  const tileClassName = useMemo(() => {
    const args = { activeStartDate, date, view };

    return typeof tileClassNameProps === 'function' ? tileClassNameProps(args) : tileClassNameProps;
  }, [activeStartDate, date, tileClassNameProps, view]);

  const tileContent = useMemo(() => {
    const args = { activeStartDate, date, view };

    return typeof tileContentProps === 'function' ? tileContentProps(args) : tileContentProps;
  }, [activeStartDate, date, tileContentProps, view]);

  return (
    <button
      className={clsx(classes, tileClassName)}
      disabled={
        (minDate && minDateTransform(minDate) > date) ||
        (maxDate && maxDateTransform(maxDate) < date) ||
        (tileDisabled && tileDisabled({ activeStartDate, date, view }))
      }
      onClick={onClick ? (event) => onClick(date, event) : undefined}
      onFocus={onMouseOver ? () => onMouseOver(date) : undefined}
      onMouseOver={onMouseOver ? () => onMouseOver(date) : undefined}
      style={style}
      type="button"
    >
      {formatAbbr ? <abbr aria-label={formatAbbr(locale, date)}>{children}</abbr> : children}
      {tileContent}
    </button>
  );
}
