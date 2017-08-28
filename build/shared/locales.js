'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocale = exports.getLocale = exports.getDefaultLocale = exports.getDefaultLocales = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _lodash = require('lodash.once');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userLocale = null;

var getDefaultLocales = exports.getDefaultLocales = (0, _lodash2.default)(function () {
  var languageList = [];

  if (window.navigator.languages) {
    languageList.push.apply(languageList, (0, _toConsumableArray3.default)(window.navigator.languages));
  } else if (window.navigator.userLanguage) {
    languageList.push(window.navigator.userLanguage);
  }

  languageList.push('en-GB'); // Fallback

  return languageList;
});

var getDefaultLocale = exports.getDefaultLocale = (0, _lodash2.default)(function () {
  return getDefaultLocales()[0];
});

var getLocale = exports.getLocale = function getLocale() {
  return userLocale || getDefaultLocale();
};

var setLocale = exports.setLocale = function setLocale(locale) {
  userLocale = locale;
};