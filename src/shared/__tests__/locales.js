import {
  getDefaultLocales,
  getDefaultLocale,
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

