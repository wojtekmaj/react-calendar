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

  get date() {
    const { activeRange } = this.props;
    return activeRange[0];
  }

  onClickPrevious = () => {
    const { view, setActiveRange } = this.props;
    const { date } = this;

    setActiveRange(getPreviousRange(view, date));
  }

  onClickNext = () => {
    const { view, setActiveRange } = this.props;
    const { date } = this;

    setActiveRange(getNextRange(view, date));
  }

  onClickPrevious2 = () => {
    const { view, setActiveRange } = this.props;
    const { date } = this;

    setActiveRange(getPreviousRange2(view, date));
  }

  onClickNext2 = () => {
    const { view, setActiveRange } = this.props;
    const { date } = this;

    setActiveRange(getNextRange2(view, date));
  }

  render() {
    const { activeRange, drillUp, view } = this.props;
    const [date] = activeRange;

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
            onClick={this.onClickPrevious2}
          >
            {prev2Label}
          </button>
        }
        <button
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
  activeRange: PropTypes.arrayOf(
    PropTypes.instanceOf(Date),
  ).isRequired,
  drillUp: PropTypes.func.isRequired,
  next2Label: PropTypes.string,
  nextLabel: PropTypes.string,
  prev2Label: PropTypes.string,
  prevLabel: PropTypes.string,
  setActiveRange: PropTypes.func.isRequired,
  view: viewPropType.isRequired,
  views: PropTypes.arrayOf(viewPropType).isRequired,
};
