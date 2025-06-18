import { useId, useRef } from 'react';

type LocaleOptionsProps = {
  locale: string | undefined;
  setLocale: (locale: string | undefined) => void;
};

export default function LocaleOptions({ locale, setLocale }: LocaleOptionsProps) {
  const localeDefaultId = useId();
  const localeEnUSId = useId();
  const localeFrFRId = useId();
  const localeArEGId = useId();
  const customLocaleId = useId();
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
          id={localeDefaultId}
          name="locale"
          onChange={onChange}
          type="radio"
          value="undefined"
        />
        <label htmlFor={localeDefaultId}>Auto</label>
      </div>
      <div>
        <input
          checked={locale === 'en-US'}
          id={localeEnUSId}
          name="locale"
          onChange={onChange}
          type="radio"
          value="en-US"
        />
        <label htmlFor={localeEnUSId}>en-US</label>
      </div>
      <div>
        <input
          checked={locale === 'fr-FR'}
          id={localeFrFRId}
          name="locale"
          onChange={onChange}
          type="radio"
          value="fr-FR"
        />
        <label htmlFor={localeFrFRId}>fr-FR</label>
      </div>
      <div>
        <input
          checked={locale === 'ar-EG'}
          id={localeArEGId}
          name="locale"
          onChange={onChange}
          type="radio"
          value="ar-EG"
        />
        <label htmlFor={localeArEGId}>ar-EG</label>
      </div>
      <form onSubmit={onCustomChange}>
        <label htmlFor={customLocaleId}>Custom locale:</label>
        &nbsp;
        <input
          key={locale}
          defaultValue={locale}
          id={customLocaleId}
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
