import React from 'react';
import PropTypes from 'prop-types';

import Days from './MonthView/Days';
import Weekdays from './MonthView/Weekdays';
import WeekNumbers from './MonthView/WeekNumbers';

import {
  isCalendarType,
  isMaxDate,
  isMinDate,
  isValue,
} from './shared/propTypes';

export default function MonthView(props) {
  const {
    activeStartDate,
    locale,
    onMouseLeave,
    showFixedNumberOfWeeks,
  } = props;
  const {
    calendarType: calendarTypeProps,
    formatShortWeekday,
    onClickWeekNumber,
    showWeekNumbers,
    ...childProps
  } = props;

  const calendarType = (() => {
    if (calendarTypeProps) {
      return calendarTypeProps;
    }

    switch (locale) {
      case 'en-CA':
      case 'en-US':
      case 'es-AR':
      case 'es-BO':
      case 'es-CL':
      case 'es-CO':
      case 'es-CR':
      case 'es-DO':
      case 'es-EC':
      case 'es-GT':
      case 'es-HN':
      case 'es-MX':
      case 'es-NI':
      case 'es-PA':
      case 'es-PE':
      case 'es-PR':
      case 'es-SV':
      case 'es-VE':
      case 'pt-BR':
        return 'US';
      // ar-LB, ar-MA intentionally missing
      case 'ar':
      case 'ar-AE':
      case 'ar-BH':
      case 'ar-DZ':
      case 'ar-EG':
      case 'ar-IQ':
      case 'ar-JO':
      case 'ar-KW':
      case 'ar-LY':
      case 'ar-OM':
      case 'ar-QA':
      case 'ar-SA':
      case 'ar-SD':
      case 'ar-SY':
      case 'ar-YE':
      case 'dv':
      case 'dv-MV':
      case 'ps':
      case 'ps-AR':
        return 'Arabic';
      case 'he':
      case 'he-IL':
        return 'Hebrew';
      default:
        return 'ISO 8601';
    }
  })();

  function renderWeekdays() {
    return (
      <Weekdays
        calendarType={calendarType}
        formatShortWeekday={formatShortWeekday}
        locale={locale}
        onMouseLeave={onMouseLeave}
      />
    );
  }

  function renderWeekNumbers() {
    if (!showWeekNumbers) {
      return null;
    }

    return (
      <WeekNumbers
        activeStartDate={activeStartDate}
        calendarType={calendarType}
        onClickWeekNumber={onClickWeekNumber}
        onMouseLeave={onMouseLeave}
        showFixedNumberOfWeeks={showFixedNumberOfWeeks}
      />
    );
  }

  function renderDays() {
    return (
      <Days
        calendarType={calendarType}
        {...childProps}
      />
    );
  }

  const className = 'react-calendar__month-view';

  return (
    <div
      className={[
        className,
        showWeekNumbers ? `${className}--weekNumbers` : '',
      ].join(' ')}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {renderWeekNumbers()}
        <div
          style={{
            flexGrow: 1,
            width: '100%',
          }}
        >
          {renderWeekdays()}
          {renderDays()}
        </div>
      </div>
    </div>
  );
}

MonthView.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  calendarType: isCalendarType,
  formatShortWeekday: PropTypes.func,
  locale: PropTypes.string,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
  onClickWeekNumber: PropTypes.func,
  onMouseLeave: PropTypes.func,
  setActiveRange: PropTypes.func,
  showFixedNumberOfWeeks: PropTypes.bool,
  showNeighboringMonth: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  value: isValue,
  valueType: PropTypes.string,
};
