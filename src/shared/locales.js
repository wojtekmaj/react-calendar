import once from 'lodash.once';

export const getDefaultLocales = once(() => {
  const languageList = [];

  if (typeof window !== 'undefined') {
    if (window.navigator.languages) {
      languageList.push(...window.navigator.languages);
    } else if (window.navigator.userLanguage) {
      languageList.push(window.navigator.userLanguage);
    }
  }

  languageList.push('en-GB'); // Fallback

  return languageList;
});

export const getDefaultLocale = once(() => getDefaultLocales()[0]);

