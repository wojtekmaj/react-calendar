import React, { Component } from 'react';
import { CenturyView, DecadeView, YearView, MonthView } from 'react-calendar/src/entry';

import './Test.less';

export default class Test extends Component {
  render() {
    return (
      <div className="Test">
        <header>
          <h1>react-calendar test page</h1>
        </header>
        <main>
          <section>
            <h2>MonthView</h2>
            <MonthView />
          </section>
          <section>
            <h2>YearView</h2>
            <YearView />
          </section>
          <section>
            <h2>DecadeView</h2>
            <DecadeView />
          </section>
          <section>
            <h2>CenturyView</h2>
            <CenturyView />
          </section>
        </main>
      </div>
    );
  }
}
