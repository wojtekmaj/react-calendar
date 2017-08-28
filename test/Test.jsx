import React, { Component } from 'react';
import Calendar from 'react-calendar/src/entry';
import 'react-calendar/src/Calendar.less';

import DateBonduariesOptions from './DateBonduariesOptions';
import MaxDetailOptions from './MaxDetailOptions';
import MinDetailOptions from './MinDetailOptions';
import LocaleOptions from './LocaleOptions';
import ValueOptions from './ValueOptions';
import ViewOptions from './ViewOptions';

import { formatDate } from '../src/shared/dates';

import './Test.less';

export default class Test extends Component {
  state = {
    locale: null,
    maxDate: new Date(2017, 8, 15, 12),
    maxDetail: 'month',
    minDate: new Date(1995, 7, 15, 12),
    minDetail: 'century',
    returnValue: 'start',
    showNeighboringMonth: false,
    showWeekNumbers: false,
    value: new Date(),
  }

  onChange = value => this.setState({ value })

  renderDebugInfo() {
    const { value } = this.state;

    const renderDate = (dateToRender) => {
      if (dateToRender instanceof Date) {
        return formatDate(dateToRender);
      }
      return dateToRender;
    };

    if (value instanceof Array) {
      return (
        <p>Chosen date range: {renderDate(value[0])} - {renderDate(value[1])}</p>
      );
    }

    return (
      <p>Chosen date: {renderDate(value)}</p>
    );
  }

  render() {
    const {
      locale,
      maxDate,
      maxDetail,
      minDate,
      minDetail,
      returnValue,
      showNeighboringMonth,
      showWeekNumbers,
      value,
    } = this.state;

    const setState = state => this.setState(state);

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
              setState={setState}
              locale={locale}
            />
            <ValueOptions
              setState={setState}
              value={value}
            />
            <ViewOptions
              setState={setState}
              showNeighboringMonth={showNeighboringMonth}
              showWeekNumbers={showWeekNumbers}
            />
          </aside>
          <main className="Test__container__content">
            <Calendar
              locale={locale}
              maxDate={maxDate}
              maxDetail={maxDetail}
              minDate={minDate}
              minDetail={minDetail}
              onChange={this.onChange}
              returnValue={returnValue}
              showNeighboringMonth={showNeighboringMonth}
              showWeekNumbers={showWeekNumbers}
              value={value}
            />
            {this.renderDebugInfo()}
          </main>
        </div>
      </div>
    );
  }
}
