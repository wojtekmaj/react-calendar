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
  getLimitedViews(props = this.props) {
    const { minDetail, maxDetail } = props;

    return allViews.slice(allViews.indexOf(minDetail), allViews.indexOf(maxDetail) + 1);
  }

  getInitialView(props = this.props) {
    const { view } = props;

    if (this.getLimitedViews(props).includes(view)) {
      return view;
    }

    return this.getLimitedViews(props).pop();
  }

  get drillDownAvailable() {
    const views = this.getLimitedViews();
    const { view } = this.state;

    return views.indexOf(view) < views.length - 1;
  }

  get drillUpAvailable() {
    const views = this.getLimitedViews();
    const { view } = this.state;

    return views.indexOf(view) > 0;
  }

  isViewAllowed(view, props = this.props) {
    const views = this.getLimitedViews(props);

    return views.includes(view);
  }

  getValue(activeRange = this.state.activeRange) {
    const { returnValue } = this.props;

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
    view: this.getInitialView(),
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;

    if (
      nextProps.minDetail !== props.minDetail ||
      nextProps.maxDetail !== props.maxDetail
    ) {
      const { view } = this.state;

      if (!this.isViewAllowed(view, nextProps)) {
        this.setState({
          view: this.getInitialView(nextProps),
        });
      }
    }
  }

  drillDown = (activeRange) => {
    if (!this.drillDownAvailable) {
      return;
    }

    const views = this.getLimitedViews();

    this.setState(prevState => ({
      activeRange,
      view: views[views.indexOf(prevState.view) + 1],
    }));
  }

  drillUp = () => {
    if (!this.drillUpAvailable) {
      return;
    }

    const views = this.getLimitedViews();

    this.setState(prevState => ({
      view: views[views.indexOf(prevState.view) - 1],
    }));
  }

  onChange = (activeRange) => {
    const { onChange } = this.props;

    if (!onChange) {
      return;
    }

    const value = this.getValue(activeRange);

    onChange(value);
  }

  setView = (view) => {
    this.setState((prevState) => {
      const [startDate] = [].concat(prevState.activeRange);
      const activeRange = getRange(view, startDate);

      return {
        activeRange,
        view,
      };
    });
  }

  setActiveRange = (activeRange) => {
    this.setState({ activeRange });
  }

  onDrillDown = callback => (activeRange) => {
    if (callback) callback();

    if (this.drillDownAvailable) {
      this.drillDown(activeRange);
    } else {
      this.onChange(activeRange);
    }
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
            onClickDecade={this.onDrillDown(onClickDecade)}
            setView={this.setView}
          />
        );
      case 'decade':
        return (
          <DecadeView
            decade={startDate}
            onClickYear={this.onDrillDown(onClickYear)}
            setView={this.setView}
          />
        );
      case 'year':
        return (
          <YearView
            year={startDate}
            onClickMonth={this.onDrillDown(onClickMonth)}
            setView={this.setView}
          />
        );
      case 'month':
        return (
          <MonthView
            month={startDate}
            onClickDay={this.onDrillDown(onClickDay)}
            setView={this.setView}
          />
        );
      default:
        throw new Error(`Invalid view: ${view}.`);
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
        views={this.getLimitedViews()}
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
