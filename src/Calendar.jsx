import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Calendar.less';

import Navigation from './Calendar/Navigation';
import CenturyView from './CenturyView';
import DecadeView from './DecadeView';
import YearView from './YearView';
import MonthView from './MonthView';

import { getRange } from './shared/dates';

const allViews = ['century', 'decade', 'year', 'month'];
const allValueTypes = [...allViews.slice(1), 'day'];

export default class Calendar extends Component {
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

  /**
   * Returns views array with disallowed values cut off.
   */
  getLimitedViews(props = this.props) {
    const { minDetail, maxDetail } = props;

    return allViews.slice(allViews.indexOf(minDetail), allViews.indexOf(maxDetail) + 1);
  }

  /**
   * Returns value type that can be returned with currently applied settings.
   */
  getValueType(props = this.props) {
    const { maxDetail } = props;
    return allValueTypes[allViews.indexOf(maxDetail)];
  }

  /**
   * Determines whether a given view is allowed with currently applied settings.
   */
  isViewAllowed(props = this.props, view = this.state.view) {
    const views = this.getLimitedViews(props);

    return views.includes(view);
  }

  /**
   * Gets current value in a desired format.
   */
  getValueFromRange(valueRange = this.state.value) {
    const { returnValue } = this.props;

    switch (returnValue) {
      case 'start':
        return valueRange[0];
      case 'end':
        return valueRange[1];
      case 'range':
        return valueRange;
      default:
        throw new Error('Invalid returnValue.');
    }
  }

  state = {
    activeStartDate: this.getActiveStartDate(),
    value: this.getValue(),
    view: this.getView(),
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;

    const allowedViewChanged = (
      nextProps.minDetail !== props.minDetail ||
      nextProps.maxDetail !== props.maxDetail
    );

    const valueChanged = (
      (nextProps.value && !props.value) ||
      (nextProps.value && props.value && nextProps.value.getTime() !== props.value.getTime())
    );

    const nextState = {};

    if (allowedViewChanged) {
      if (!this.isViewAllowed(nextProps)) {
        nextState.view = this.getView(nextProps);
      }
    }

    if (allowedViewChanged || valueChanged) {
      nextState.value = this.getValue(nextProps);
      nextState.activeStartDate = this.getActiveStartDate(nextProps);
    }

    this.setState(nextState);
  }

  getActiveStartDate(props = this.props) {
    const rangeType = this.getView(props);
    return getRange(rangeType, props.value)[0];
  }

  getValue(props = this.props) {
    const rangeType = this.getValueType(props);
    return getRange(rangeType, props.value);
  }

  getView(props = this.props) {
    const { view } = props;

    if (this.getLimitedViews(props).includes(view)) {
      return view;
    }

    return this.getLimitedViews(props).pop();
  }

  /**
   * Called when the user opens a new view.
   */
  setView = (view) => {
    this.setState((prevState) => {
      const activeRange = getRange(view, prevState.activeStartDate);
      const [activeStartDate] = activeRange;

      return {
        activeStartDate,
        view,
      };
    });
  }

  /**
   * Called when the user uses navigation buttons.
   */
  setActiveRange = (activeRange) => {
    const [activeStartDate] = activeRange;

    this.setState({
      activeStartDate,
    });
  }

  /**
   * Called when the user uses navigation buttons.
   */
  setActiveStartDate = activeStartDate => this.setState({ activeStartDate })

  drillDown = (activeRange) => {
    if (!this.drillDownAvailable) {
      return;
    }

    const views = this.getLimitedViews();
    const [activeStartDate] = activeRange;

    this.setState(prevState => ({
      activeStartDate,
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

  onChange = (valueRange) => {
    const { onChange } = this.props;

    const value = this.getValueFromRange(valueRange);

    this.setState({ value });

    if (onChange) onChange(value);
  }

  /**
   * Called when the user clicks an item on any view.
   * If they "hit the bottom" and they can't drill further down, onChange will be called.
   * Otherwise, drillDown will be called.
   */
  onDrillDown = callback => (range) => {
    if (callback) callback();

    if (this.drillDownAvailable) {
      this.drillDown(range);
    } else {
      this.onChange(range);
    }
  }

  renderContent() {
    const { activeStartDate, view } = this.state;
    const { onClickDay, onClickMonth, onClickYear, onClickDecade } = this.props;

    switch (view) {
      case 'century':
        return (
          <CenturyView
            century={activeStartDate}
            onClickDecade={this.onDrillDown(onClickDecade)}
            setView={this.setView}
          />
        );
      case 'decade':
        return (
          <DecadeView
            decade={activeStartDate}
            onClickYear={this.onDrillDown(onClickYear)}
            setView={this.setView}
          />
        );
      case 'year':
        return (
          <YearView
            year={activeStartDate}
            onClickMonth={this.onDrillDown(onClickMonth)}
            setView={this.setView}
          />
        );
      case 'month':
        return (
          <MonthView
            month={activeStartDate}
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
        activeStartDate={this.state.activeStartDate}
        drillUp={this.drillUp}
        nextLabel={nextLabel}
        next2Label={next2Label}
        prevLabel={prevLabel}
        prev2Label={prev2Label}
        setActiveRange={this.setActiveRange}
        setActiveStartDate={this.setActiveStartDate}
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

Calendar.defaultProps = {
  maxDetail: 'month',
  minDetail: 'century',
  returnValue: 'start',
  view: 'month',
};

Calendar.propTypes = {
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
  value: PropTypes.instanceOf(Date),
  view: PropTypes.oneOf(allViews),
};
