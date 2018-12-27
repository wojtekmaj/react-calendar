import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class LocaleOptions extends PureComponent {
  onChange = (event) => {
    const { setState } = this.props;

    let { value: locale } = event.target;

    if (locale === 'null') {
      locale = null;
    }

    setState({ locale });
  }

  onCustomChange = (event) => {
    const { setState } = this.props;

    event.preventDefault();

    const { value: locale } = event.target.customLocale;

    setState({ locale });
  }

  resetLocale = () => {
    const { setState } = this.props;

    setState({ locale: null });
  }

  render() {
    const { locale } = this.props;

    return (
      <fieldset id="localeOptions">
        <legend htmlFor="localeOptions">
          Locale
        </legend>

        <div>
          <input
            checked={locale === null}
            id="localeDefault"
            name="locale"
            onChange={this.onChange}
            type="radio"
            value="null"
          />
          <label htmlFor="localeDefault">
            Auto
          </label>
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
          <label htmlFor="localeEnUS">
            en-US
          </label>
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
          <label htmlFor="localeFrFR">
            fr-FR
          </label>
        </div>
        <div>
          <input
            checked={locale === 'ar-EG'}
            id="localeArEG"
            name="locale"
            onChange={this.onChange}
            type="radio"
            value="ar-EG"
          />
          <label htmlFor="localeArEG">
            ar-EG
          </label>
        </div>
        <form onSubmit={this.onCustomChange}>
          <label htmlFor="customLocale">
            Custom locale:
          </label>
          &nbsp;
          <input
            type="text"
            key={locale}
            name="customLocale"
            defaultValue={locale}
            pattern="^[a-z]{2}-[A-Z0-9]{2,3}$"
          />
          &nbsp;
          <button
            style={{ display: 'none' }}
            type="submit"
          >
            Set locale
          </button>
          <button
            disabled={locale === null}
            onClick={this.resetLocale}
            type="button"
          >
            Reset locale
          </button>
        </form>
      </fieldset>
    );
  }
}

LocaleOptions.propTypes = {
  locale: PropTypes.string,
  setState: PropTypes.func.isRequired,
};
