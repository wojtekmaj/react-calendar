import React, { PureComponent } from 'react';
import Calendar from 'react-calendar/src/entry.nostyle';
import 'react-calendar/src/Calendar.less';

import DateBonduariesOptions from './DateBonduariesOptions';
import MaxDetailOptions from './MaxDetailOptions';
import MinDetailOptions from './MinDetailOptions';
import LocaleOptions from './LocaleOptions';
import ValueOptions from './ValueOptions';
import ViewOptions from './ViewOptions';

import { formatDate } from '../src/shared/dateFormatter';

import './Test.less';

const now = new Date();

/* eslint-disable no-console, react/prop-types */

const tileClassName = ({ date, view }) => {
  switch (view) {
    case 'month':
      return date.getDay() === 0 || date.getDay() === 6
        ? 'red' : null;
    case 'year':
      return date.getMonth() === 5 || date.getMonth() === 6
        ? 'green' : null;
    case 'decade':
      return date.getFullYear() === 1991
        ? 'pink' : null;
    case 'century':
      return date.getFullYear() === 1991
        ? 'brown' : null;
    default:
      return null;
  }
};

const tileContent = ({ date, view }) => {
  switch (view) {
    case 'month':
      return date.getDay() === 0
        ? (
          <p>
            <small>
              {'It\'s Sunday!'}
            </small>
          </p>
        )
        : null;
    case 'year':
      return date.getMonth() === 5 || date.getMonth() === 6
        ? (
          <p>
            <small>
              Holidays
            </small>
          </p>
        )
        : null;
    case 'decade':
      return date.getFullYear() === 1991
        ? (
          <p>
            <small>
              {'Developer\'s birthday!'}
            </small>
          </p>
        )
        : null;
    case 'century':
      return date.getFullYear() === 1991
        ? (
          <p>
            <small>
              {'The 90\'s'}
            </small>
          </p>
        )
        : null;
    default:
      return null;
  }
};

export default class Test extends PureComponent {
  state = {
    activeStartDate: new Date(now.getFullYear(), now.getMonth()),
    locale: null,
    maxDate: new Date(now.getFullYear(), now.getMonth() + 1, 15, 12),
    maxDetail: 'month',
    minDate: new Date(1995, now.getMonth() + 1, 15, 12),
    minDetail: 'century',
    returnValue: 'start',
    selectRange: false,
    showFixedNumberOfWeeks: false,
    showNeighboringMonth: true,
    showWeekNumbers: false,
    value: now,
    view: 'month',
  }

  onChange = value => this.setState({ value });

  onViewOrDateChange = ({ activeStartDate, view }) => {
    console.log('Changed view to', view, activeStartDate);
    this.setState({ activeStartDate, view });
  };

  renderDebugInfo() {
    const { locale, value } = this.state;

    const renderDate = (dateToRender) => {
      if (dateToRender instanceof Date) {
        return formatDate(locale, dateToRender);
      }
      return dateToRender;
    };

    if (value instanceof Array) {
      return (
        <p>
          {`Chosen date range: ${renderDate(value[0])} - ${renderDate(value[1])}`}
        </p>
      );
    }

    return (
      <p>
        {`Chosen date: ${value ? renderDate(value) : '(none)'}`}
      </p>
    );
  }

  render() {
    const {
      activeStartDate,
      locale,
      maxDate,
      maxDetail,
      minDate,
      minDetail,
      returnValue,
      selectRange,
      showFixedNumberOfWeeks,
      showNeighboringMonth,
      showWeekNumbers,
      value,
      view,
    } = this.state;

    const setState = state => this.setState(state);

    const commonProps = {
      className: 'myCustomCalendarClassName',
      locale,
      maxDate,
      maxDetail,
      minDate,
      minDetail,
      onActiveStartDateChange: this.onViewOrDateChange,
      onChange: this.onChange,
      onClickWeekNumber: (weekNumber, date) => {
        console.log('Clicked week number', weekNumber, date);
      },
      onDrillDown: ({ activeStartDate: nextActiveStartDate, view: nextView }) => {
        console.log('Drilled down to', nextView, nextActiveStartDate);
      },
      onDrillUp: ({ activeStartDate: nextActiveStartDate, view: nextView }) => {
        console.log('Drilled up to', nextView, nextActiveStartDate);
      },
      onViewChange: this.onViewOrDateChange,
      returnValue,
      selectRange,
      showFixedNumberOfWeeks,
      showNeighboringMonth,
      showWeekNumbers,
      tileClassName,
      tileContent,
    };

    return (
      <div className="Test">
        <header>
          <h1>
            react-calendar test page
          </h1>
        </header>
        <div className="Test__container">
          <aside className="Test__container__options">
            <MinDetailOptions
              maxDetail={maxDetail}
              minDetail={minDetail}
              setState={setState}
            />
            <MaxDetailOptions
              maxDetail={maxDetail}
              minDetail={minDetail}
              setState={setState}
            />
            <DateBonduariesOptions
              maxDate={maxDate}
              minDate={minDate}
              setState={setState}
            />
            <LocaleOptions
              locale={locale}
              setState={setState}
            />
            <ValueOptions
              selectRange={selectRange}
              setState={setState}
              value={value}
            />
            <ViewOptions
              setState={setState}
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
            {this.renderDebugInfo()}
          </main>
        </div>
      </div>
    );
  }
}
