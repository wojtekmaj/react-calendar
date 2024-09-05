'use client';

import { getUserLocale } from 'get-user-locale';

import {
  getCenturyLabel,
  getDecadeLabel,
  getBeginNext,
  getBeginNext2,
  getBeginPrevious,
  getBeginPrevious2,
  getEndPrevious,
  getEndPrevious2,
} from '../shared/dates.js';
import {
  formatMonthYear as defaultFormatMonthYear,
  formatYear as defaultFormatYear,
} from '../shared/dateFormatter.js';

import type { Action, NavigationLabelFunc, RangeType } from '../shared/types.js';

const className = 'react-calendar__navigation';

type NavigationProps = {
  /**
   * The beginning of a period that shall be displayed. If you wish to use react-calendar in an uncontrolled way, use `defaultActiveStartDate` instead.
   *
   * @example new Date(2017, 0, 1)
   */
  activeStartDate: Date;
  drillUp: () => void;
  /**
   * Function called to override default formatting of months and years. Can be used to use your own formatting function.
   *
   * @example (locale, date) => formatDate(date, 'MMMM YYYY')
   */
  formatMonthYear?: typeof defaultFormatMonthYear;
  /**
   *  Function called to override default formatting of year in the top navigation section. Can be used to use your own formatting function.
   *
   * @example (locale, date) => formatDate(date, 'YYYY')
   */
  formatYear?: typeof defaultFormatYear;
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
  /**
   * Minimum date that the user can select. Periods partially overlapped by minDate will also be selectable, although react-calendar will ensure that no earlier date is selected.
   *
   * @example new Date()
   */
  minDate?: Date;
  /**
   * `aria-label` attribute of a label rendered on calendar navigation bar.
   *
   * @example 'Go up'
   */
  navigationAriaLabel?: string;
  /**
   * `aria-live` attribute of a label rendered on calendar navigation bar.
   *
   * @default undefined
   * @example 'polite'
   */
  navigationAriaLive?: 'off' | 'polite' | 'assertive';
  /**
   * Content of a label rendered on calendar navigation bar.
   *
   * @example ({ date, label, locale, view }) => alert(`Current view: ${view}, date: ${date.toLocaleDateString(locale)}`)
   */
  navigationLabel?: NavigationLabelFunc;
  /**
   * `aria-label` attribute of the "next on higher level" button on the navigation pane.
   *
   * @example 'Jump forwards'
   */
  next2AriaLabel?: string;
  /**
   * Content of the "next on higher level" button on the navigation pane. Setting the value explicitly to null will hide the icon.
   *
   * @example '»'
   * @example <DoubleNextIcon />
   */
  next2Label?: React.ReactNode;
  /**
   * `aria-label` attribute of the "next" button on the navigation pane.
   *
   * @example 'Next'
   */
  nextAriaLabel?: string;
  /**
   * Content of the "next" button on the navigation pane. Setting the value explicitly to null will hide the icon.
   *
   * @example '›'
   * @example <NextIcon />
   */
  nextLabel?: React.ReactNode;
  /**
   * `aria-label` attribute of the "previous on higher level" button on the navigation pane.
   *
   * @example 'Jump backwards'
   */
  prev2AriaLabel?: string;
  /**
   * Content of the "previous on higher level" button on the navigation pane. Setting the value explicitly to null will hide the icon.
   *
   * @example '«'
   * @example <DoublePreviousIcon />
   */
  prev2Label?: React.ReactNode;
  /**
   * `aria-label` attribute of the "previous" button on the navigation pane.
   *
   * @example 'Previous'
   */
  prevAriaLabel?: string;
  /**
   * Content of the "previous" button on the navigation pane. Setting the value explicitly to null will hide the icon.
   *
   * @example '‹'
   * @example <PreviousIcon />
   */
  prevLabel?: React.ReactNode;
  setActiveStartDate: (nextActiveStartDate: Date, action: Action) => void;
  /**
   * Whether to show two months/years/… at a time instead of one. Defaults `showFixedNumberOfWeeks` prop to be `true`.
   *
   * @default false
   * @example true
   */
  showDoubleView?: boolean;
  /**
   * Determines which calendar view shall be opened. Does not disable navigation. Can be `"day"`, `"month"`, `"year"`, `"decade"` or `"century"`.
   *
   * @example 'year'
   */
  view: RangeType;
  views: string[];
};

export default function Navigation({
  activeStartDate,
  drillUp,
  formatMonthYear = defaultFormatMonthYear,
  formatYear = defaultFormatYear,
  locale,
  maxDate,
  minDate,
  navigationAriaLabel = '',
  navigationAriaLive,
  navigationLabel,
  next2AriaLabel = '',
  next2Label = '»',
  nextAriaLabel = '',
  nextLabel = '›',
  prev2AriaLabel = '',
  prev2Label = '«',
  prevAriaLabel = '',
  prevLabel = '‹',
  setActiveStartDate,
  showDoubleView,
  view,
  views,
}: NavigationProps): React.ReactElement {
  const drillUpAvailable = views.indexOf(view) > 0;
  const shouldShowPrevNext2Buttons = view !== 'century';

  const previousActiveStartDate = getBeginPrevious(view, activeStartDate);
  const previousActiveStartDate2 = shouldShowPrevNext2Buttons
    ? getBeginPrevious2(view, activeStartDate)
    : undefined;
  const nextActiveStartDate = getBeginNext(view, activeStartDate);
  const nextActiveStartDate2 = shouldShowPrevNext2Buttons
    ? getBeginNext2(view, activeStartDate)
    : undefined;

  const prevButtonDisabled = (() => {
    if (previousActiveStartDate.getFullYear() < 0) {
      return true;
    }
    const previousActiveEndDate = getEndPrevious(view, activeStartDate);
    return minDate && minDate >= previousActiveEndDate;
  })();

  const prev2ButtonDisabled =
    shouldShowPrevNext2Buttons &&
    (() => {
      if ((previousActiveStartDate2 as Date).getFullYear() < 0) {
        return true;
      }
      const previousActiveEndDate = getEndPrevious2(view, activeStartDate);
      return minDate && minDate >= previousActiveEndDate;
    })();

  const nextButtonDisabled = maxDate && maxDate < nextActiveStartDate;

  const next2ButtonDisabled =
    shouldShowPrevNext2Buttons && maxDate && maxDate < (nextActiveStartDate2 as Date);

  function onClickPrevious() {
    setActiveStartDate(previousActiveStartDate, 'prev');
  }

  function onClickPrevious2() {
    setActiveStartDate(previousActiveStartDate2 as Date, 'prev2');
  }

  function onClickNext() {
    setActiveStartDate(nextActiveStartDate, 'next');
  }

  function onClickNext2() {
    setActiveStartDate(nextActiveStartDate2 as Date, 'next2');
  }

  function renderLabel(date: Date) {
    const label = (() => {
      switch (view) {
        case 'century':
          return getCenturyLabel(locale, formatYear, date);
        case 'decade':
          return getDecadeLabel(locale, formatYear, date);
        case 'year':
          return formatYear(locale, date);
        case 'month':
          return formatMonthYear(locale, date);
        default:
          throw new Error(`Invalid view: ${view}.`);
      }
    })();

    return navigationLabel
      ? navigationLabel({
          date,
          label,
          locale: locale || getUserLocale() || undefined,
          view,
        })
      : label;
  }

  function renderButton() {
    const labelClassName = `${className}__label`;
    return (
      <button
        aria-label={navigationAriaLabel}
        aria-live={navigationAriaLive}
        className={labelClassName}
        disabled={!drillUpAvailable}
        onClick={drillUp}
        style={{ flexGrow: 1 }}
        type="button"
      >
        <span className={`${labelClassName}__labelText ${labelClassName}__labelText--from`}>
          {renderLabel(activeStartDate)}
        </span>
        {showDoubleView ? (
          <>
            <span className={`${labelClassName}__divider`}> – </span>
            <span className={`${labelClassName}__labelText ${labelClassName}__labelText--to`}>
              {renderLabel(nextActiveStartDate)}
            </span>
          </>
        ) : null}
      </button>
    );
  }

  return (
    <div className={className}>
      {prev2Label !== null && shouldShowPrevNext2Buttons ? (
        <button
          aria-label={prev2AriaLabel}
          className={`${className}__arrow ${className}__prev2-button`}
          disabled={prev2ButtonDisabled}
          onClick={onClickPrevious2}
          type="button"
        >
          {prev2Label}
        </button>
      ) : null}
      {prevLabel !== null && (
        <button
          aria-label={prevAriaLabel}
          className={`${className}__arrow ${className}__prev-button`}
          disabled={prevButtonDisabled}
          onClick={onClickPrevious}
          type="button"
        >
          {prevLabel}
        </button>
      )}
      {renderButton()}
      {nextLabel !== null && (
        <button
          aria-label={nextAriaLabel}
          className={`${className}__arrow ${className}__next-button`}
          disabled={nextButtonDisabled}
          onClick={onClickNext}
          type="button"
        >
          {nextLabel}
        </button>
      )}
      {next2Label !== null && shouldShowPrevNext2Buttons ? (
        <button
          aria-label={next2AriaLabel}
          className={`${className}__arrow ${className}__next2-button`}
          disabled={next2ButtonDisabled}
          onClick={onClickNext2}
          type="button"
        >
          {next2Label}
        </button>
      ) : null}
    </div>
  );
}
