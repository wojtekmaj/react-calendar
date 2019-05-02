import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  getCenturyLabel,
  getDecadeLabel,
  getBeginNext,
  getBeginNext2,
  getBeginPrevious,
  getBeginPrevious2,
  getEndPrevious,
  getEndPrevious2,
  getYear,
} from '../shared/dates';
import { formatMonthYear as defaultFormatMonthYear } from '../shared/dateFormatter';
import { isView, isViews } from '../shared/propTypes';

export default class Navigation extends PureComponent {
  get drillUpAvailable() {
    const { view, views } = this.props;
    return views.indexOf(view) > 0;
  }

  get prevButtonDisabled() {
    const { activeStartDate: date, minDate, view } = this.props;
    const previousActiveStartDate = getBeginPrevious(view, date);
    if (previousActiveStartDate.getFullYear() < 1000) {
      return true;
    }
    const previousActiveEndDate = getEndPrevious(view, date);
    return minDate && minDate >= previousActiveEndDate;
  }

  get prev2ButtonDisabled() {
    const { activeStartDate: date, minDate, view } = this.props;
    const previousActiveStartDate = getBeginPrevious2(view, date);
    if (previousActiveStartDate.getFullYear() < 1000) {
      return true;
    }
    const previousActiveEndDate = getEndPrevious2(view, date);
    return minDate && minDate >= previousActiveEndDate;
  }

  get nextButtonDisabled() {
    const { activeStartDate: date, maxDate, view } = this.props;
    const nextActiveStartDate = getBeginNext(view, date);
    return maxDate && maxDate <= nextActiveStartDate;
  }

  get next2ButtonDisabled() {
    const { activeStartDate: date, maxDate, view } = this.props;
    const nextActiveStartDate = getBeginNext2(view, date);
    return maxDate && maxDate <= nextActiveStartDate;
  }

  onClickPrevious = () => {
    const { activeStartDate: date, view, setActiveStartDate } = this.props;
    setActiveStartDate(getBeginPrevious(view, date));
  }

  onClickNext = () => {
    const { activeStartDate: date, view, setActiveStartDate } = this.props;
    setActiveStartDate(getBeginNext(view, date));
  }

  onClickPrevious2 = () => {
    const { activeStartDate: date, view, setActiveStartDate } = this.props;
    setActiveStartDate(getBeginPrevious2(view, date));
  }

  onClickNext2 = () => {
    const { activeStartDate: date, view, setActiveStartDate } = this.props;
    setActiveStartDate(getBeginNext2(view, date));
  }

  get label() {
    const {
      activeStartDate: date, formatMonthYear, locale, view,
    } = this.props;

    switch (view) {
      case 'century':
        return getCenturyLabel(date);
      case 'decade':
        return getDecadeLabel(date);
      case 'year':
        return getYear(date);
      case 'month':
        return formatMonthYear(locale, date);
      default:
        throw new Error(`Invalid view: ${view}.`);
    }
  }

  render() {
    const { label } = this;
    const {
      activeStartDate: date,
      drillUp,
      navigationLabel,
      next2Label,
      nextLabel,
      prev2Label,
      prevLabel,
      view,
    } = this.props;

    const className = 'react-calendar__navigation';

    return (
      <div
        className={className}
        style={{ display: 'flex' }}
      >
        {prev2Label !== null && view !== 'century' && (
          <button
            className={`${className}__arrow ${className}__prev2-button`}
            disabled={this.prev2ButtonDisabled}
            onClick={this.onClickPrevious2}
            type="button"
          >
            {typeof prev2Label === 'function' ? prev2Label(view) : prev2Label}
          </button>
        )}
        <button
          className={`${className}__arrow ${className}__prev-button`}
          disabled={this.prevButtonDisabled}
          onClick={this.onClickPrevious}
          type="button"
        >
          {typeof prevLabel === 'function' ? prevLabel(view) : prevLabel}
        </button>
        <button
          className="react-calendar__navigation__label"
          onClick={drillUp}
          disabled={!this.drillUpAvailable}
          style={{ flexGrow: 1 }}
          type="button"
        >
          {navigationLabel
            ? navigationLabel({ date, view, label })
            : label
          }
        </button>
        <button
          className={`${className}__arrow ${className}__next-button`}
          disabled={this.nextButtonDisabled}
          onClick={this.onClickNext}
          type="button"
        >
          {typeof nextLabel === 'function' ? nextLabel(view) : nextLabel}
        </button>
        {next2Label !== null && view !== 'century' && (
          <button
            className={`${className}__arrow ${className}__next2-button`}
            disabled={this.next2ButtonDisabled}
            onClick={this.onClickNext2}
            type="button"
          >
            {typeof next2Label === 'function' ? next2Label(view) : next2Label}
          </button>
        )}
      </div>
    );
  }
}

Navigation.defaultProps = {
  formatMonthYear: defaultFormatMonthYear,
  next2Label: '»',
  nextLabel: '›',
  prev2Label: '«',
  prevLabel: '‹',
};

Navigation.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  drillUp: PropTypes.func.isRequired,
  formatMonthYear: PropTypes.func,
  locale: PropTypes.string,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  next2Label: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  nextLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  navigationLabel: PropTypes.func,
  prev2Label: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  prevLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  setActiveStartDate: PropTypes.func.isRequired,
  view: isView.isRequired,
  views: isViews.isRequired,
};
