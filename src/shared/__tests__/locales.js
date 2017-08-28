import {
  getDefaultLocales,
  getDefaultLocale,
  getLocale,
  setLocale,
} from '../locales';

describe('getDefaultLocales', () => {
  it('returns an array of default locales', () => {
    const locales = getDefaultLocales();

    expect(locales).toEqual(['en-US', 'en', 'en-GB']);
  });
});

describe('getDefaultLocale', () => {
  it('returns en-US', () => {
    const locale = getDefaultLocale();

    expect(locale).toBe('en-US');
  });
});

describe('getLocale', () => {
  it('returns default locale on initial run', () => {
    const locale = getLocale();

    expect(locale).toBe('en-US');
  });
});

describe('setLocale', () => {
  it('saves a given locale so that getLocale can read it', () => {
    setLocale('pl-PL');

    const locale = getLocale();

    expect(locale).toBe('pl-PL');
  });
});
