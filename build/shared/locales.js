'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocale = exports.getLocale = undefined;

var _lodash = require('lodash.once');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var userLocale = null;

var getDefaultLocales = (0, _lodash2.default)(function () {
  var languageList = [];

  if (window.navigator.languages) {
    languageList.push.apply(languageList, _toConsumableArray(window.navigator.languages));
  } else if (window.navigator.userLanguage) {
    languageList.push(window.navigator.userLanguage);
  }

  languageList.push('en-GB'); // Fallback

  return languageList;
});

var getDefaultLocale = (0, _lodash2.default)(function () {
  return getDefaultLocales()[0];
});

var getLocale = exports.getLocale = function getLocale() {
  return userLocale || getDefaultLocale();
};

var setLocale = exports.setLocale = function setLocale(locale) {
  userLocale = locale;
};