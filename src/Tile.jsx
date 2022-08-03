import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

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

function formatDateToNumberShortcut(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [(day > 9 ? '' : '0') + day, (month > 9 ? '' : '0') + month, date.getFullYear()].join('');
}

function getValueFromObjectByDate(object, date) {
  if (!object || !date) {
    return null;
  }

  if (object.hasOwnProperty(date)) {
    return object[date];
  }

  return null;
}

export default class Tile extends Component {
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
      daysClassNames,
      daysStyles,
    } = this.props;
    const { tileClassName, tileContent } = this.state;

    const formattedDate = formatDateToNumberShortcut(date);

    return (
      <button
        className={mergeClassNames(
          classes,
          tileClassName,
          getValueFromObjectByDate(daysClassNames, formattedDate),
        )}
        disabled={
          (minDate && minDateTransform(minDate) > date) ||
          (maxDate && maxDateTransform(maxDate) < date) ||
          (tileDisabled && tileDisabled({ activeStartDate, date, view }))
        }
        onClick={onClick && ((event) => onClick(date, event))}
        onFocus={onMouseOver && (() => onMouseOver(date))}
        onMouseOver={onMouseOver && (() => onMouseOver(date))}
        style={Object.assign({}, style, getValueFromObjectByDate(daysStyles, formattedDate))}
        type="button"
      >
        {formatAbbr ? <abbr aria-label={formatAbbr(locale, date)}>{children}</abbr> : children}
        {tileContent}
      </button>
    );
  }
}

Tile.propTypes = {
  ...tileProps,
  children: PropTypes.node.isRequired,
  formatAbbr: PropTypes.func,
  maxDateTransform: PropTypes.func.isRequired,
  minDateTransform: PropTypes.func.isRequired,
};
