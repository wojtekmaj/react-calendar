import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  formatMonthYear,
  getCenturyLabel,
  getDecadeLabel,
  getNextRange,
  getNextRange2,
  getPreviousRange,
  getPreviousRange2,
  getYear,
} from '../shared/dates';

const allViews = ['century', 'decade', 'year', 'month'];

export default class Navigation extends Component {
  get drillDownAvailable() {
    const { view, views } = this.props;
    return views.indexOf(view) < views.length - 1;
  }

  get drillUpAvailable() {
    const { view, views } = this.props;
    return views.indexOf(view) > 0;
  }

  get prevButtonDisabled() {
    const { activeStartDate: date, view } = this.props;
    const [nextActiveStartDate] = getPreviousRange(view, date);
    return nextActiveStartDate.getFullYear() < 1000;
  }

  get prev2ButtonDisabled() {
    const { activeStartDate: date, view } = this.props;
    const [nextActiveStartDate] = getPreviousRange2(view, date);
    return nextActiveStartDate.getFullYear() < 1000;
  }

  onClickPrevious = () => {
    const { activeStartDate: date, view, setActiveStartDate } = this.props;
    setActiveStartDate(getPreviousRange(view, date)[0]);
  }

  onClickNext = () => {
    const { activeStartDate: date, view, setActiveStartDate } = this.props;
    setActiveStartDate(getNextRange(view, date)[0]);
  }

  onClickPrevious2 = () => {
    const { activeStartDate: date, view, setActiveStartDate } = this.props;
    setActiveStartDate(getPreviousRange2(view, date)[0]);
  }

  onClickNext2 = () => {
    const { activeStartDate: date, view, setActiveStartDate } = this.props;
    setActiveStartDate(getNextRange2(view, date)[0]);
  }

  render() {
    const { activeStartDate: date, drillUp, view } = this.props;

    let label;
    switch (view) {
      case 'century':
        label = getCenturyLabel(date);
        break;
      case 'decade':
        label = getDecadeLabel(date);
        break;
      case 'year':
        label = getYear(date);
        break;
      case 'month':
        label = formatMonthYear(date);
        break;
      default:
        throw new Error(`Invalid view: ${view}.`);
    }

    const {
      prevLabel,
      prev2Label,
      nextLabel,
      next2Label,
    } = this.props;

    return (
      <div className="react-calendar__navigation">
        {
          view !== 'century' &&
          <button
            disabled={this.prev2ButtonDisabled}
            onClick={this.onClickPrevious2}
          >
            {prev2Label}
          </button>
        }
        <button
          disabled={this.prevButtonDisabled}
          onClick={this.onClickPrevious}
        >
          {prevLabel}
        </button>
        <button
          className="react-calendar__navigation__label"
          onClick={drillUp}
          disabled={!this.drillUpAvailable}
        >
          {label}
        </button>
        <button
          onClick={this.onClickNext}
        >
          {nextLabel}
        </button>
        {
          view !== 'century' &&
          <button
            onClick={this.onClickNext2}
          >
            {next2Label}
          </button>
        }
      </div>
    );
  }
}

Navigation.defaultProps = {
  next2Label: '»',
  nextLabel: '›',
  prev2Label: '«',
  prevLabel: '‹',
};

const viewPropType = PropTypes.oneOf(allViews);

Navigation.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  drillUp: PropTypes.func.isRequired,
  next2Label: PropTypes.string,
  nextLabel: PropTypes.string,
  prev2Label: PropTypes.string,
  prevLabel: PropTypes.string,
  setActiveStartDate: PropTypes.func.isRequired,
  view: viewPropType.isRequired,
  views: PropTypes.arrayOf(viewPropType).isRequired,
};
