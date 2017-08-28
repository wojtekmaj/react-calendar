import once from 'lodash.once';

let userLocale = null;

export const getDefaultLocales = once(() => {
  const languageList = [];

  if (window.navigator.languages) {
    languageList.push(...window.navigator.languages);
  } else if (window.navigator.userLanguage) {
    languageList.push(window.navigator.userLanguage);
  }

  languageList.push('en-GB'); // Fallback

  return languageList;
});

export const getDefaultLocale = once(() => getDefaultLocales()[0]);

export const getLocale = () => userLocale || getDefaultLocale();

export const setLocale = (locale) => {
  userLocale = locale;
};
