import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ReactCalendar.less';

import Navigation from './ReactCalendar/Navigation';
import CenturyView from './CenturyView';
import DecadeView from './DecadeView';
import YearView from './YearView';
import MonthView from './MonthView';

import { getRange } from './shared/dates';

const allViews = ['century', 'decade', 'year', 'month'];

export default class ReactCalendar extends Component {
  /**
   * Returns views array with disallowed values cut off.
   */
  get limitedViews() {
    const { minDetail, maxDetail } = this.props;

    return allViews.slice(allViews.indexOf(minDetail), allViews.indexOf(maxDetail) + 1);
  }

  get initialView() {
    const { view } = this.props;

    if (this.limitedViews.includes(view)) {
      return view;
    }

    return this.limitedViews.pop();
  }

  get drillDownAvailable() {
    const { limitedViews: views } = this;
    const { view } = this.state;

    return views.indexOf(view) < views.length - 1;
  }

  get drillUpAvailable() {
    const { limitedViews: views } = this;
    const { view } = this.state;

    return views.indexOf(view) > 0;
  }

  get value() {
    const { returnValue } = this.props;
    const { activeRange } = this.state;

    switch (returnValue) {
      case 'start':
        return activeRange[0];
      case 'end':
        return activeRange[1];
      case 'range':
        return activeRange;
      default:
        throw new Error('Invalid returnValue.');
    }
  }

  state = {
    // @TODO: Take it from value, fallback to current month
    activeRange: [new Date(), new Date()],
    view: this.initialView,
  }

  drillDown = () => {
    if (!this.drillDownAvailable) {
      return;
    }

    const { limitedViews: views } = this;

    this.setState(prevState => ({
      view: views[views.indexOf(prevState.view) + 1],
    }));
  }

  drillUp = () => {
    if (!this.drillUpAvailable) {
      return;
    }

    const { limitedViews: views } = this;

    this.setState(prevState => ({
      view: views[views.indexOf(prevState.view) - 1],
    }));
  }

  onChange = () => {
    const { maxDetail } = this.props;
    const { view } = this.state;

    const maxDetailReached = (view === maxDetail);

    if (!maxDetailReached) {
      return;
    }

    const { onChange } = this.props;

    if (onChange) onChange(this.value);
  }

  setView = (view) => {
    this.setState((prevState) => {
      const [startDate] = [].concat(prevState.activeRange);
      const activeRange = getRange(view, startDate);

      return { activeRange };
    });
  }

  setActiveRange = (activeRange) => {
    this.setState({ activeRange });
    this.onChange();
  }

  renderContent() {
    const { drillDown } = this;
    const { activeRange, view } = this.state;
    const { onClickDay, onClickMonth, onClickYear, onClickDecade } = this.props;
    const [startDate] = [].concat(activeRange);

    switch (view) {
      case 'century':
        return (
          <CenturyView
            century={startDate}
            onClickDecade={onClickDecade || drillDown}
            setView={this.setView}
          />
        );
      case 'decade':
        return (
          <DecadeView
            decade={startDate}
            onClickYear={onClickYear || drillDown}
            setActiveRange={this.setActiveRange}
            setView={this.setView}
          />
        );
      case 'year':
        return (
          <YearView
            year={startDate}
            onClickMonth={onClickMonth || drillDown}
            setActiveRange={this.setActiveRange}
            setView={this.setView}
          />
        );
      case 'month':
        return (
          <MonthView
            month={startDate}
            onClickDay={onClickDay || drillDown}
            setActiveRange={this.setActiveRange}
            setView={this.setView}
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
        views={this.limitedViews}
      />
    );
  }

  render() {
    return (
      <div className="react-calendar">
        {this.renderNavigation()}
        {this.renderContent()}
      </div>
    );
  }
}

ReactCalendar.defaultProps = {
  maxDetail: 'month',
  minDetail: 'century',
  returnValue: 'start',
  view: 'month',
};

ReactCalendar.propTypes = {
  maxDetail: PropTypes.oneOf(allViews),
  minDetail: PropTypes.oneOf(allViews),
  next2Label: PropTypes.string,
  nextLabel: PropTypes.string,
  onChange: PropTypes.func,
  onClickDay: PropTypes.func,
  onClickDecade: PropTypes.func,
  onClickMonth: PropTypes.func,
  onClickYear: PropTypes.func,
  prev2Label: PropTypes.string,
  prevLabel: PropTypes.string,
  returnValue: PropTypes.oneOf(['start', 'end', 'range']).isRequired,
  view: PropTypes.oneOf(allViews),
};
