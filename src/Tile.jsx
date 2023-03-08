import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FocusContext } from './FocusContainer';

import { tileProps } from './shared/propTypes';

function datesAreDifferent(date1, date2) {
  return (
    (date1 && !date2) ||
    (!date1 && date2) ||
    (date1 && date2 && date1.getTime() !== date2.getTime())
  );
}

function getValue(nextProps, prop) {
  const { activeStartDate, date, view } = nextProps;

  return typeof prop === 'function' ? prop({ activeStartDate, date, view }) : prop;
}

export default class Tile extends Component {
  static propTypes = {
    ...tileProps,
    children: PropTypes.node.isRequired,
    formatAbbr: PropTypes.func,
    maxDateTransform: PropTypes.func.isRequired,
    minDateTransform: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeStartDate, tileClassName, tileContent } = nextProps;

    const nextState = {};

    if (
      tileClassName !== prevState.tileClassNameProps ||
      datesAreDifferent(activeStartDate, prevState.activeStartDateProps)
    ) {
      nextState.tileClassName = getValue(nextProps, tileClassName);
      nextState.tileClassNameProps = tileClassName;
    }

    if (
      tileContent !== prevState.tileContentProps ||
      datesAreDifferent(activeStartDate, prevState.activeStartDateProps)
    ) {
      nextState.tileContent = getValue(nextProps, tileContent);
      nextState.tileContentProps = tileContent;
    }

    nextState.activeStartDateProps = activeStartDate;

    return nextState;
  }

  state = {};

  handleClick = (event) => {
    this.props.onClick?.(this.props.date, event);
    this.context.setActiveTabDate(this.props.date);
  };

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
      onMouseOver,
      isFocusable,
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
        onClick={this.handleClick}
        onFocus={onMouseOver ? () => onMouseOver(date) : undefined}
        onMouseOver={onMouseOver ? () => onMouseOver(date) : undefined}
        style={style}
        tabIndex={isFocusable ? 0 : -1}
        type="button"
      >
        {formatAbbr ? <abbr aria-label={formatAbbr(locale, date)}>{children}</abbr> : children}
        {tileContent}
      </button>
    );
  }
}
Tile.contextType = FocusContext;
