import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  formatMonthYear,
  getCenturyLabel,
  getDecadeLabel,
  getNextRange,
  getPreviousRange,
  getYear,
} from '../shared/dates';

const views = ['century', 'decade', 'year', 'month'];

export default class Navigation extends Component {
  get drillDownAvailable() {
    const { view } = this.props;

    return views.indexOf(view) < views.length - 1;
  }

  get drillUpAvailable() {
    const { view } = this.props;

    return views.indexOf(view) > 0;
  }

  onClickPrevious = () => {
    const { activeRange, view, setActiveRange } = this.props;
    const [date] = activeRange;

    setActiveRange(getPreviousRange(view, date));
  }

  onClickNext = () => {
    const { activeRange, view, setActiveRange } = this.props;
    const [date] = activeRange;

    setActiveRange(getNextRange(view, date));
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
        throw new Error('Invalid view.');
    }

    const {
      prevLabel,
      prev2Label,
      nextLabel,
      next2Label,
    } = this.props;

    return (
      <div className="react-calendar__navigation">
        <button disabled>{prev2Label}</button>
        <button onClick={this.onClickPrevious}>{prevLabel}</button>
        <button
          onClick={drillUp}
          disabled={!this.drillUpAvailable}
        >
          {label}
        </button>
        <button onClick={this.onClickNext}>{nextLabel}</button>
        <button disabled>{next2Label}</button>
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
  view: PropTypes.oneOf(views).isRequired,
};
