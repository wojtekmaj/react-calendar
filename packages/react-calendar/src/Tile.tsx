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
  activeStartDate: Date;
  children: React.ReactNode;
  classes?: string[];
  date: Date;
  formatAbbr?: (locale: string | undefined, date: Date) => string;
  locale?: string;
  maxDate?: Date;
  maxDateTransform: (date: Date) => Date;
  minDate?: Date;
  minDateTransform: (date: Date) => Date;
  onClick?: (date: Date, event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOver?: (date: Date) => void;
  style?: React.CSSProperties;
  tileClassName?: TileClassNameFunc | ClassName;
  tileContent?: TileContentFunc | React.ReactNode;
  tileDisabled?: TileDisabledFunc;
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
