import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatDate } from './shared/dates';

import './ReactCalendar.less';

import CenturyView from './CenturyView';
import DecadeView from './DecadeView';
import YearView from './YearView';
import MonthView from './MonthView';

const views = ['century', 'decade', 'year', 'month'];

export default class ReactCalendar extends Component {
  state = {
    view: this.props.view,
  }

  drillDown = () => {
    this.setState(prevState => ({
      view: views[Math.min(views.indexOf(prevState.view) + 1, views.length - 1)],
    }));
  }

  drillUp = () => {
    this.setState(prevState => ({
      view: views[Math.max(views.indexOf(prevState.view) - 1, 0)],
    }));
  }

  setDate = date => this.setState({ date })

  get drillDownAvailable() {
    const { view } = this.state;

    return views.indexOf(view) < views.length - 1;
  }

  get drillUpAvailable() {
    const { view } = this.state;

    return views.indexOf(view) > 0;
  }

  renderContent() {
    const { view, date } = this.state;
    const { onClickDay, onClickMonth, onClickYear, onClickDecade } = this.props;
    const startDate = date instanceof Array ? date[0] : date;

    switch (view) {
      case 'century':
        return (
          <CenturyView
            century={startDate}
            onClickDecade={onClickDecade || this.drillDown}
            setDate={this.setDate}
          />
        );
      case 'decade':
        return (
          <DecadeView
            decade={startDate}
            onClickYear={onClickYear || this.drillDown}
            setDate={this.setDate}
          />
        );
      case 'year':
        return (
          <YearView
            year={startDate}
            onClickMonth={onClickMonth || this.drillDown}
            setDate={this.setDate}
          />
        );
      case 'month':
        return (
          <MonthView
            month={startDate}
            onClickDay={onClickDay || this.drillDown}
            setDate={this.setDate}
          />
        );
      default:
        throw new Error('Invalid view.');
    }
  }

  renderNavigation() {
    return (
      <div className="react-calendar__navigation">
        <button>
          {'<<'}
        </button>
        <button>
          {'<'}
        </button>
        <button
          onClick={this.drillUp}
          disabled={!this.drillUpAvailable}
        >
          {this.state.view}
        </button>
        <button>
          {'>'}
        </button>
        <button>
          {'>>'}
        </button>
      </div>
    );
  }

  renderDebugInfo() {
    const { date } = this.state;

    const renderDate = (dateToRender) => {
      if (dateToRender instanceof Date) {
        return formatDate(dateToRender);
      }
      return dateToRender;
    };

    if (date instanceof Array) {
      return (
        <p>Chosen date range: {renderDate(date[0])} - {renderDate(date[1])}</p>
      );
    }

    return (
      <p>Chosen date: {renderDate(date)}</p>
    );
  }

  render() {
    return (
      <div className="react-calendar">
        Calendar
        {this.renderDebugInfo()}
        {this.renderNavigation()}
        {this.renderContent()}
      </div>
    );
  }
}

ReactCalendar.defaultProps = {
  view: 'month',
};

ReactCalendar.propTypes = {
  view: PropTypes.oneOf(views),
  onClickDay: PropTypes.func,
  onClickMonth: PropTypes.func,
  onClickYear: PropTypes.func,
  onClickDecade: PropTypes.func,
};
