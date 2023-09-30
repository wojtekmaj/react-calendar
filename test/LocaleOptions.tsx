import { useRef } from 'react';

type LocaleOptionsProps = {
  locale: string | undefined;
  setLocale: (locale: string | undefined) => void;
};

export default function LocaleOptions({ locale, setLocale }: LocaleOptionsProps) {
  const customLocale = useRef<HTMLInputElement>(null);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: nextLocale } = event.target;

    if (nextLocale === 'undefined') {
      setLocale(undefined);
    } else {
      setLocale(nextLocale);
    }
  }

  function onCustomChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const input = customLocale.current;
    const { value: nextLocale } = input as HTMLInputElement;

    setLocale(nextLocale);
  }

  function resetLocale() {
    setLocale(undefined);
  }

  return (
    <fieldset>
      <legend>Locale</legend>

      <div>
        <input
          checked={locale === undefined}
          id="localeDefault"
          name="locale"
          onChange={onChange}
          type="radio"
          value="undefined"
        />
        <label htmlFor="localeDefault">Auto</label>
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
        <label htmlFor="localeEnUS">en-US</label>
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
        <label htmlFor="localeFrFR">fr-FR</label>
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
        <label htmlFor="localeArEG">ar-EG</label>
      </div>
      <form onSubmit={onCustomChange}>
        <label htmlFor="customLocale">Custom locale:</label>
        &nbsp;
        <input
          key={locale}
          defaultValue={locale}
          id="customLocale"
          name="customLocale"
          pattern="^[a-z]{2}(-[A-Z0-9]{2,3})?$"
          ref={customLocale}
          type="text"
        />
        &nbsp;
        <button style={{ display: 'none' }} type="submit">
          Set locale
        </button>
        <button disabled={locale === undefined} onClick={resetLocale} type="button">
          Reset locale
        </button>
      </form>
    </fieldset>
  );
}
