import React, { useCallback, useState } from 'react';
import Calendar from 'react-calendar/src';
import 'react-calendar/src/Calendar.css';

import DateBonduariesOptions from './DateBonduariesOptions';
import MaxDetailOptions from './MaxDetailOptions';
import MinDetailOptions from './MinDetailOptions';
import LocaleOptions from './LocaleOptions';
import ValueOptions from './ValueOptions';
import ViewOptions from './ViewOptions';

import { formatDate } from './shared/dateFormatter';

import './Test.css';

const now = new Date();

const tileClassName = ({ date, view }) => {
  switch (view) {
    case 'month':
      return date.getDay() === 0 || date.getDay() === 6 ? 'red' : null;
    case 'year':
      return date.getMonth() === 5 || date.getMonth() === 6 ? 'green' : null;
    case 'decade':
      return date.getFullYear() === 1991 ? 'pink' : null;
    case 'century':
      return date.getFullYear() === 1991 ? 'brown' : null;
    default:
      return null;
  }
};

const tileContent = ({ date, view }) => {
  switch (view) {
    case 'month':
      return date.getDay() === 0 ? (
        <p>
          <small>{"It's Sunday!"}</small>
        </p>
      ) : null;
    case 'year':
      return date.getMonth() === 5 || date.getMonth() === 6 ? (
        <p>
          <small>Holidays</small>
        </p>
      ) : null;
    case 'decade':
      return date.getFullYear() === 1991 ? (
        <p>
          <small>{"Developer's birthday!"}</small>
        </p>
      ) : null;
    case 'century':
      return date.getFullYear() === 1991 ? (
        <p>
          <small>{"The 90's"}</small>
        </p>
      ) : null;
    default:
      return null;
  }
};

const nineteenNinetyFive = new Date(1995, now.getUTCMonth() + 1, 15, 12);
const fifteenthOfNextMonth = new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 15, 12);

/* eslint-disable no-console */

export default function Test() {
  const [activeStartDate, setActiveStartDate] = useState(
    new Date(now.getFullYear(), now.getMonth()),
  );
  const [locale, setLocale] = useState(null);
  const [maxDate, setMaxDate] = useState(fifteenthOfNextMonth);
  const [maxDetail, setMaxDetail] = useState('month');
  const [minDate, setMinDate] = useState(nineteenNinetyFive);
  const [minDetail, setMinDetail] = useState('century');
  const [returnValue /* , setReturnValue */] = useState('start');
  const [selectRange, setSelectRange] = useState(false);
  const [showDoubleView, setShowDoubleView] = useState(false);
  const [showFixedNumberOfWeeks, setShowFixedNumberOfWeeks] = useState(false);
  const [showNeighboringMonth, setShowNeighboringMonth] = useState(true);
  const [showWeekNumbers, setShowWeekNumbers] = useState(false);
  const [value, setValue] = useState(now);
  const [view, setView] = useState('month');

  const onViewOrDateChange = useCallback(
    ({ activeStartDate: nextActiveStartDate, view: nextView }) => {
      console.log('Changed view to', nextView, nextActiveStartDate);
      setActiveStartDate(nextActiveStartDate);
      setView(nextView);
    },
    [],
  );

  function renderDebugInfo() {
    const renderDate = (dateToRender) => {
      if (dateToRender instanceof Date) {
        return formatDate(locale, dateToRender);
      }
      return dateToRender;
    };

    if (Array.isArray(value)) {
      return <p>{`Chosen date range: ${renderDate(value[0])} - ${renderDate(value[1])}`}</p>;
    }

    return <p>{`Chosen date: ${value ? renderDate(value) : '(none)'}`}</p>;
  }

  const commonProps = {
    className: 'myCustomCalendarClassName',
    locale,
    maxDate,
    maxDetail,
    minDate,
    minDetail,
    onActiveStartDateChange: onViewOrDateChange,
    onChange: setValue,
    onClickWeekNumber: (weekNumber, date) => {
      console.log('Clicked week number', weekNumber, date);
    },
    onDrillDown: ({ activeStartDate: nextActiveStartDate, view: nextView }) => {
      console.log('Drilled down to', nextView, nextActiveStartDate);
    },
    onDrillUp: ({ activeStartDate: nextActiveStartDate, view: nextView }) => {
      console.log('Drilled up to', nextView, nextActiveStartDate);
    },
    onViewChange: onViewOrDateChange,
    returnValue,
    selectRange,
    showDoubleView,
    showFixedNumberOfWeeks,
    showNeighboringMonth,
    showWeekNumbers,
    tileClassName,
    tileContent,
  };

  return (
    <div className="Test">
      <header>
        <h1>react-calendar test page</h1>
      </header>
      <div className="Test__container">
        <aside className="Test__container__options">
          <MinDetailOptions
            maxDetail={maxDetail}
            minDetail={minDetail}
            setMinDetail={setMinDetail}
          />
          <MaxDetailOptions
            maxDetail={maxDetail}
            minDetail={minDetail}
            setMaxDetail={setMaxDetail}
          />
          <DateBonduariesOptions
            maxDate={maxDate}
            minDate={minDate}
            setMaxDate={setMaxDate}
            setMinDate={setMinDate}
          />
          <LocaleOptions locale={locale} setLocale={setLocale} />
          <ValueOptions
            selectRange={selectRange}
            setSelectRange={setSelectRange}
            setValue={setValue}
            value={value}
          />
          <ViewOptions
            setShowDoubleView={setShowDoubleView}
            setShowFixedNumberOfWeeks={setShowFixedNumberOfWeeks}
            setShowNeighboringMonth={setShowNeighboringMonth}
            setShowWeekNumbers={setShowWeekNumbers}
            showDoubleView={showDoubleView}
            showFixedNumberOfWeeks={showFixedNumberOfWeeks}
            showNeighboringMonth={showNeighboringMonth}
            showWeekNumbers={showWeekNumbers}
          />
        </aside>
        <main className="Test__container__content">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              console.error('Calendar triggered submitting the form.');
              console.log(event);
            }}
          >
            <p>Controlled:</p>
            <Calendar
              {...commonProps}
              activeStartDate={activeStartDate}
              value={value}
              view={view}
            />
            <p>Uncontrolled:</p>
            <Calendar
              {...commonProps}
              defaultActiveStartDate={activeStartDate}
              defaultValue={value}
              defaultView={view}
            />
          </form>
          {renderDebugInfo()}
        </main>
      </div>
    </div>
  );
}
