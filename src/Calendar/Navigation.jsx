import React from 'react';
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

const className = 'react-calendar__navigation';

export default function Navigation({
  activeStartDate: date,
  drillUp,
  formatMonthYear,
  locale,
  maxDate,
  minDate,
  navigationAriaLabel,
  navigationLabel,
  next2AriaLabel,
  next2Label,
  nextAriaLabel,
  nextLabel,
  prev2AriaLabel,
  prev2Label,
  prevAriaLabel,
  prevLabel,
  setActiveStartDate,
  view,
  views,
}) {
  const drillUpAvailable = views.indexOf(view) > 0;
  const shouldShowPrevNext2Buttons = view !== 'century';

  const previousActiveStartDate = getBeginPrevious(view, date);
  const previousActiveStartDate2 = shouldShowPrevNext2Buttons && getBeginPrevious2(view, date);
  const nextActiveStartDate = getBeginNext(view, date);
  const nextActiveStartDate2 = shouldShowPrevNext2Buttons && getBeginNext2(view, date);

  const prevButtonDisabled = (() => {
    if (previousActiveStartDate.getFullYear() < 1000) {
      return true;
    }
    const previousActiveEndDate = getEndPrevious(view, date);
    return minDate && minDate >= previousActiveEndDate;
  })();

  const prev2ButtonDisabled = shouldShowPrevNext2Buttons && (() => {
    if (previousActiveStartDate2.getFullYear() < 1000) {
      return true;
    }
    const previousActiveEndDate = getEndPrevious2(view, date);
    return minDate && minDate >= previousActiveEndDate;
  })();

  const nextButtonDisabled = maxDate && maxDate <= nextActiveStartDate;

  const next2ButtonDisabled = (
    shouldShowPrevNext2Buttons
    && maxDate
    && maxDate <= nextActiveStartDate2
  );

  function onClickPrevious() {
    setActiveStartDate(previousActiveStartDate);
  }

  function onClickPrevious2() {
    setActiveStartDate(previousActiveStartDate2);
  }

  function onClickNext() {
    setActiveStartDate(nextActiveStartDate);
  }

  function onClickNext2() {
    setActiveStartDate(nextActiveStartDate2);
  }

  const label = (() => {
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
  })();

  return (
    <div
      className={className}
      style={{ display: 'flex' }}
    >
      {prev2Label !== null && shouldShowPrevNext2Buttons && (
        <button
          aria-label={prev2AriaLabel}
          className={`${className}__arrow ${className}__prev2-button`}
          disabled={prev2ButtonDisabled}
          onClick={onClickPrevious2}
          type="button"
        >
          {prev2Label}
        </button>
      )}
      <button
        aria-label={prevAriaLabel}
        className={`${className}__arrow ${className}__prev-button`}
        disabled={prevButtonDisabled}
        onClick={onClickPrevious}
        type="button"
      >
        {prevLabel}
      </button>
      <button
        aria-label={navigationAriaLabel}
        className="react-calendar__navigation__label"
        disabled={!drillUpAvailable}
        onClick={drillUp}
        style={{ flexGrow: 1 }}
        type="button"
      >
        {navigationLabel
          ? navigationLabel({ date, view, label })
          : label}
      </button>
      <button
        aria-label={nextAriaLabel}
        className={`${className}__arrow ${className}__next-button`}
        disabled={nextButtonDisabled}
        onClick={onClickNext}
        type="button"
      >
        {nextLabel}
      </button>
      {next2Label !== null && shouldShowPrevNext2Buttons && (
        <button
          aria-label={next2AriaLabel}
          className={`${className}__arrow ${className}__next2-button`}
          disabled={next2ButtonDisabled}
          onClick={onClickNext2}
          type="button"
        >
          {next2Label}
        </button>
      )}
    </div>
  );
}

Navigation.defaultProps = {
  formatMonthYear: defaultFormatMonthYear,
  navigationAriaLabel: '',
  next2AriaLabel: '',
  next2Label: '»',
  nextAriaLabel: '',
  nextLabel: '›',
  prev2AriaLabel: '',
  prev2Label: '«',
  prevAriaLabel: '',
  prevLabel: '‹',
};

Navigation.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  drillUp: PropTypes.func.isRequired,
  formatMonthYear: PropTypes.func,
  locale: PropTypes.string,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  navigationAriaLabel: PropTypes.string,
  navigationLabel: PropTypes.func,
  next2AriaLabel: PropTypes.string,
  next2Label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  nextAriaLabel: PropTypes.string,
  nextLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  prev2AriaLabel: PropTypes.string,
  prev2Label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  prevAriaLabel: PropTypes.string,
  prevLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  setActiveStartDate: PropTypes.func.isRequired,
  view: isView.isRequired,
  views: isViews.isRequired,
};
