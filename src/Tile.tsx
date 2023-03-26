import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { tileProps } from './shared/propTypes';

import type {
  ClassName,
  TileClassNameFunc,
  TileContentFunc,
  TileDisabledFunc,
  View,
} from './shared/types';

type TileProps = {
  activeStartDate: Date;
  children: React.ReactNode;
  classes?: ClassName;
  date: Date;
  formatAbbr?: (locale: string | undefined, date: Date) => string;
  locale?: string;
  maxDate?: Date;
  maxDateTransform: (date: Date) => Date;
  minDate?: Date;
  minDateTransform: (date: Date) => Date;
  onClick: (date: Date, event: React.MouseEvent) => void;
  onMouseOver: (date: Date) => void;
  style?: React.CSSProperties;
  tileClassName?: TileClassNameFunc | ClassName;
  tileContent?: TileContentFunc | React.ReactNode;
  tileDisabled?: TileDisabledFunc;
  view: View;
};

type TileState = {
  activeStartDateProps?: TileProps['activeStartDate'];
  tileClassName?: ClassName;
  tileClassNameProps?: TileProps['tileClassName'];
  tileContent?: React.ReactNode;
  tileContentProps?: TileProps['tileContent'];
};

function datesAreDifferent(date1?: Date | null, date2?: Date | null) {
  return (
    (date1 && !date2) ||
    (!date1 && date2) ||
    (date1 && date2 && date1.getTime() !== date2.getTime())
  );
}

export default class Tile extends Component<TileProps, TileState> {
  static propTypes = {
    ...tileProps,
    children: PropTypes.node.isRequired,
    formatAbbr: PropTypes.func,
    maxDateTransform: PropTypes.func.isRequired,
    minDateTransform: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(nextProps: TileProps, prevState: TileState) {
    const { activeStartDate, date, tileClassName, tileContent, view } = nextProps;

    const nextState: TileState = {};

    const args = { activeStartDate, date, view };

    if (
      tileClassName !== prevState.tileClassNameProps ||
      datesAreDifferent(activeStartDate, prevState.activeStartDateProps)
    ) {
      nextState.tileClassName =
        typeof tileClassName === 'function' ? tileClassName(args) : tileClassName;
      nextState.tileClassNameProps = tileClassName;
    }

    if (
      tileContent !== prevState.tileContentProps ||
      datesAreDifferent(activeStartDate, prevState.activeStartDateProps)
    ) {
      nextState.tileContent = typeof tileContent === 'function' ? tileContent(args) : tileContent;
      nextState.tileContentProps = tileContent;
    }

    nextState.activeStartDateProps = activeStartDate;

    return nextState;
  }

  state: Readonly<TileState> = {};

  render() {
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
      tileDisabled,
      view,
    } = this.props;
    const { tileClassName, tileContent } = this.state;

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
}
