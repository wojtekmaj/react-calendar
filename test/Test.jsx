import React, { Component } from 'react';
import Calendar from 'react-calendar/src/entry';

import MaxDetailOptions from './MaxDetailOptions';
import MinDetailOptions from './MinDetailOptions';
import LocaleOptions from './LocaleOptions';
import ValueOptions from './ValueOptions';

import { formatDate } from '../src/shared/dates';

import './Test.less';

export default class Test extends Component {
  state = {
    locale: null,
    maxDetail: 'month',
    minDetail: 'century',
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
      maxDetail,
      minDetail,
      value,
    } = this.state;

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
              setState={state => this.setState(state)}
            />
            <MaxDetailOptions
              maxDetail={maxDetail}
              minDetail={minDetail}
              setState={state => this.setState(state)}
            />
            <LocaleOptions
              setState={state => this.setState(state)}
              locale={locale}
            />
            <ValueOptions
              setState={state => this.setState(state)}
              value={value}
            />
          </aside>
          <main className="Test__container__content">
            <Calendar
              locale={locale}
              maxDetail={maxDetail}
              minDetail={minDetail}
              onChange={this.onChange}
              value={value}
            />
            {this.renderDebugInfo()}
          </main>
        </div>
      </div>
    );
  }
}
