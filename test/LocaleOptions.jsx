import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LocaleOptions extends Component {
  onChange = (event) => {
    let { value: locale } = event.target;

    if (locale === 'null') {
      locale = null;
    }

    this.props.setState({ locale });
  }

  render() {
    const { locale } = this.props;

    return (
      <fieldset id="detailoptions">
        <legend htmlFor="viewoptions">Locale</legend>

        <div>
          <input
            checked={locale === null}
            id="localeDefault"
            name="locale"
            onChange={this.onChange}
            type="radio"
            value="null"
          />
          <label htmlFor="localeDefault">Auto</label>
        </div>
        <div>
          <input
            checked={locale === 'en-US'}
            id="localeEnUS"
            name="locale"
            onChange={this.onChange}
            type="radio"
            value="en-US"
          />
          <label htmlFor="localeEnUS">en-US</label>
        </div>
        <div>
          <input
            checked={locale === 'fr-FR'}
            id="localeFrFR"
            name="locale"
            onChange={this.onChange}
            type="radio"
            value="fr-FR"
          />
          <label htmlFor="localeFrFR">fr-FR</label>
        </div>
      </fieldset>
    );
  }
}

LocaleOptions.propTypes = {
  locale: PropTypes.string,
  setState: PropTypes.func.isRequired,
};
