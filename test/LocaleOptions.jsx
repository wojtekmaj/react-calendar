import React from 'react';
import PropTypes from 'prop-types';

export default function LocaleOptions({
  locale,
  setLocale,
}) {
  function onChange(event) {
    let { value: nextLocale } = event.target;

    if (nextLocale === 'null') {
      nextLocale = null;
    }

    setLocale(nextLocale);
  }

  function onCustomChange(event) {
    event.preventDefault();

    const { value: nextLocale } = event.target.customLocale;

    setLocale(nextLocale);
  }

  function resetLocale() {
    setLocale(null);
  }

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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          type="radio"
          value="ar-EG"
        />
        <label htmlFor="localeArEG">
          ar-EG
        </label>
      </div>
      <form onSubmit={onCustomChange}>
        <label htmlFor="customLocale">
          Custom locale:
        </label>
        &nbsp;
        <input
          key={locale}
          defaultValue={locale}
          id="customLocale"
          name="customLocale"
          pattern="^[a-z]{2}(-[A-Z0-9]{2,3})?$"
          type="text"
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
          onClick={resetLocale}
          type="button"
        >
          Reset locale
        </button>
      </form>
    </fieldset>
  );
}

LocaleOptions.propTypes = {
  locale: PropTypes.string,
  setLocale: PropTypes.func.isRequired,
};
