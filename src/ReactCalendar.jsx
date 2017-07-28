import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatDate } from './shared/dates';

import './ReactCalendar.less';

import Navigation from './ReactCalendar/Navigation';
import CenturyView from './CenturyView';
import DecadeView from './DecadeView';
import YearView from './YearView';
import MonthView from './MonthView';

const views = ['century', 'decade', 'year', 'month'];

export default class ReactCalendar extends Component {
  state = {
    // @TODO: Take it from value, fallback to current month
    activeRange: [new Date(), new Date()],
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

  setActiveRange = activeRange => this.setState({ activeRange })

  get drillDownAvailable() {
    const { view } = this.state;

    return views.indexOf(view) < views.length - 1;
  }

  get drillUpAvailable() {
    const { view } = this.state;

    return views.indexOf(view) > 0;
  }

  renderContent() {
    const { activeRange, view } = this.state;
    const { onClickDay, onClickMonth, onClickYear, onClickDecade } = this.props;
    const [startDate] = [].concat(activeRange);

    switch (view) {
      case 'century':
        return (
          <CenturyView
            century={startDate}
            onClickDecade={onClickDecade || this.drillDown}
            setActiveRange={this.setActiveRange}
          />
        );
      case 'decade':
        return (
          <DecadeView
            decade={startDate}
            onClickYear={onClickYear || this.drillDown}
            setActiveRange={this.setActiveRange}
          />
        );
      case 'year':
        return (
          <YearView
            year={startDate}
            onClickMonth={onClickMonth || this.drillDown}
            setActiveRange={this.setActiveRange}
          />
        );
      case 'month':
        return (
          <MonthView
            month={startDate}
            onClickDay={onClickDay || this.drillDown}
            setActiveRange={this.setActiveRange}
          />
        );
      default:
        throw new Error('Invalid view.');
    }
  }

  renderNavigation() {
    const {
      prevLabel,
      prev2Label,
      nextLabel,
      next2Label,
    } = this.props;

    return (
      <Navigation
        activeRange={this.state.activeRange}
        drillUp={this.drillUp}
        nextLabel={nextLabel}
        next2Label={next2Label}
        prevLabel={prevLabel}
        prev2Label={prev2Label}
        setActiveRange={this.setActiveRange}
        view={this.state.view}
      />
    );
  }

  renderDebugInfo() {
    const { activeRange } = this.state;

    const renderDate = (dateToRender) => {
      if (dateToRender instanceof Date) {
        return formatDate(dateToRender);
      }
      return dateToRender;
    };

    if (activeRange instanceof Array) {
      return (
        <p>Chosen date range: {renderDate(activeRange[0])} - {renderDate(activeRange[1])}</p>
      );
    }

    return (
      <p>Chosen date: {renderDate(activeRange)}</p>
    );
  }

  render() {
    return (
      <div className="react-calendar">
        {this.renderDebugInfo()}
        {this.renderNavigation()}
        {this.renderContent()}
      </div>
    );
  }
}

ReactCalendar.defaultProps = {
  maxDetail: 'month',
  minDetail: 'century',
  view: 'month',
};

ReactCalendar.propTypes = {
  maxDetail: PropTypes.oneOf(views),
  minDetail: PropTypes.oneOf(views),
  next2Label: PropTypes.string,
  nextLabel: PropTypes.string,
  onClickDay: PropTypes.func,
  onClickDecade: PropTypes.func,
  onClickMonth: PropTypes.func,
  onClickYear: PropTypes.func,
  prev2Label: PropTypes.string,
  prevLabel: PropTypes.string,
  view: PropTypes.oneOf(views),
};
