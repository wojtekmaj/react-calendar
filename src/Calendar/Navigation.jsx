import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  formatMonthYear,
  getCenturyLabel,
  getDecadeLabel,
  getBeginNext,
  getBeginNext2,
  getBeginPrevious,
  getBeginPrevious2,
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
    const nextActiveStartDate = getBeginPrevious(view, date);
    return nextActiveStartDate.getFullYear() < 1000;
  }

  get prev2ButtonDisabled() {
    const { activeStartDate: date, view } = this.props;
    const nextActiveStartDate = getBeginPrevious2(view, date);
    return nextActiveStartDate.getFullYear() < 1000;
  }

  onClickPrevious = () => {
    const { activeStartDate: date, view, setActiveStartDate } = this.props;
    setActiveStartDate(getBeginPrevious(view, date));
  }

  onClickNext = () => {
    const { activeStartDate: date, view, setActiveStartDate } = this.props;
    setActiveStartDate(getBeginNext(view, date));
  }

  onClickPrevious2 = () => {
    const { activeStartDate: date, view, setActiveStartDate } = this.props;
    setActiveStartDate(getBeginPrevious2(view, date));
  }

  onClickNext2 = () => {
    const { activeStartDate: date, view, setActiveStartDate } = this.props;
    setActiveStartDate(getBeginNext2(view, date));
  }

  get label() {
    const { activeStartDate: date, view } = this.props;

    switch (view) {
      case 'century':
        return getCenturyLabel(date);
      case 'decade':
        return getDecadeLabel(date);
      case 'year':
        return getYear(date);
      case 'month':
        return formatMonthYear(date);
      default:
        throw new Error(`Invalid view: ${view}.`);
    }
  }

  render() {
    const { label } = this;
    const { drillUp, view } = this.props;

    return (
      <div className="react-calendar__navigation">
        {
          view !== 'century' &&
          <button
            disabled={this.prev2ButtonDisabled}
            onClick={this.onClickPrevious2}
          >
            {this.props.prev2Label}
          </button>
        }
        <button
          disabled={this.prevButtonDisabled}
          onClick={this.onClickPrevious}
        >
          {this.props.prevLabel}
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
          {this.props.nextLabel}
        </button>
        {
          view !== 'century' &&
          <button
            onClick={this.onClickNext2}
          >
            {this.props.next2Label}
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
