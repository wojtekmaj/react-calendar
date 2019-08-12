import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

import { tileProps } from './shared/propTypes';

export default class Tile extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      date,
      tileClassName,
      tileContent,
      view,
    } = nextProps;

    const nextState = {};

    if (tileClassName !== prevState.tileClassNameProps) {
      nextState.tileClassName = typeof tileClassName === 'function' ? tileClassName({ date, view }) : tileClassName;
      nextState.tileClassNameProps = tileClassName;
    }

    if (tileContent !== prevState.tileContentProps) {
      nextState.tileContent = typeof tileContent === 'function' ? tileContent({ date, view }) : tileContent;
      nextState.tileContentProps = tileContent;
    }

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
    } = this.props;
    const { tileClassName, tileContent } = this.state;

    const ComponentType = onClick ? 'button' : 'div';

    const sharedProps = {
      className: mergeClassNames(classes, tileClassName),
      style,
    };

    const specificProps = ComponentType === 'button' ? {
      disabled:
        (minDate && minDateTransform(minDate) > date)
        || (maxDate && maxDateTransform(maxDate) < date)
        || (tileDisabled && tileDisabled({ activeStartDate, date, view })),
      onClick: onClick && (() => onClick(date)),
      onFocus: onMouseOver && (() => onMouseOver(date)),
      onMouseOver: onMouseOver && (() => onMouseOver(date)),
      type: 'button',
    } : {};


    return (
      <ComponentType {...sharedProps} {...specificProps}>
        {formatAbbr
          ? (
            <abbr aria-label={formatAbbr(locale, date)}>
              {children}
            </abbr>
          )
          : children}
        {tileContent}
      </ComponentType>
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
