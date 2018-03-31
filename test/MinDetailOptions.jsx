import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const allViews = ['century', 'decade', 'year', 'month'];

export default class MinDetailOptions extends PureComponent {
  onChange = (event) => {
    const { value } = event.target;

    this.props.setState({ minDetail: value });
  }

  render() {
    const { maxDetail, minDetail } = this.props;
    const maxDetailIndex = allViews.indexOf(maxDetail);

    return (
      <fieldset id="detailoptions">
        <legend htmlFor="viewoptions">Minimum detail</legend>

        <div>
          <input
            checked={minDetail === 'century'}
            disabled={maxDetailIndex < 0}
            id="minDetailCentury"
            name="minDetail"
            onChange={this.onChange}
            type="radio"
            value="century"
          />
          <label htmlFor="minDetailCentury">Century</label>
        </div>
        <div>
          <input
            checked={minDetail === 'decade'}
            disabled={maxDetailIndex < 1}
            id="minDetailDecade"
            name="minDetail"
            onChange={this.onChange}
            type="radio"
            value="decade"
          />
          <label htmlFor="minDetailDecade">Decade</label>
        </div>
        <div>
          <input
            checked={minDetail === 'year'}
            disabled={maxDetailIndex < 2}
            id="minDetailYear"
            name="minDetail"
            onChange={this.onChange}
            type="radio"
            value="year"
          />
          <label htmlFor="minDetailYear">Year</label>
        </div>
        <div>
          <input
            checked={minDetail === 'month'}
            disabled={maxDetailIndex < 3}
            id="minDetailMonth"
            name="minDetail"
            onChange={this.onChange}
            type="radio"
            value="month"
          />
          <label htmlFor="minDetailMonth">Month</label>
        </div>
      </fieldset>
    );
  }
}

MinDetailOptions.propTypes = {
  maxDetail: PropTypes.oneOf(allViews).isRequired,
  minDetail: PropTypes.oneOf(allViews).isRequired,
  setState: PropTypes.func.isRequired,
};
