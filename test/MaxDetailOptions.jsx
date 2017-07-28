import React, { Component } from 'react';
import PropTypes from 'prop-types';

const allViews = ['century', 'decade', 'year', 'month'];

export default class MaxDetailOptions extends Component {
  onChange = (event) => {
    const { value } = event.target;

    this.props.setState({ maxDetail: value });
  }

  render() {
    const { maxDetail, minDetail } = this.props;
    const minDetailIndex = allViews.indexOf(minDetail);

    return (
      <fieldset id="detailoptions">
        <legend htmlFor="viewoptions">Maximum detail</legend>

        <div>
          <input
            checked={maxDetail === 'century'}
            disabled={minDetailIndex > 0}
            id="maxDetailCentury"
            name="maxDetail"
            onChange={this.onChange}
            type="radio"
            value="century"
          />
          <label htmlFor="maxDetailCentury">Century</label>
        </div>
        <div>
          <input
            checked={maxDetail === 'decade'}
            disabled={minDetailIndex > 1}
            id="maxDetailDecade"
            name="maxDetail"
            onChange={this.onChange}
            type="radio"
            value="decade"
          />
          <label htmlFor="maxDetailDecade">Decade</label>
        </div>
        <div>
          <input
            checked={maxDetail === 'year'}
            disabled={minDetailIndex > 2}
            id="maxDetailYear"
            name="maxDetail"
            onChange={this.onChange}
            type="radio"
            value="year"
          />
          <label htmlFor="maxDetailYear">Year</label>
        </div>
        <div>
          <input
            checked={maxDetail === 'month'}
            disabled={minDetailIndex > 3}
            id="maxDetailMonth"
            name="maxDetail"
            onChange={this.onChange}
            type="radio"
            value="month"
          />
          <label htmlFor="maxDetailMonth">Month</label>
        </div>
      </fieldset>
    );
  }
}

MaxDetailOptions.propTypes = {
  maxDetail: PropTypes.oneOf(allViews).isRequired,
  minDetail: PropTypes.oneOf(allViews).isRequired,
  setState: PropTypes.func.isRequired,
};
