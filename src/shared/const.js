export const CALENDAR_TYPES = {
  ARABIC: 'Arabic',
  HEBREW: 'Hebrew',
  ISO_8601: 'ISO 8601',
  US: 'US',
};

export const CALENDAR_TYPE_LOCALES = {
  [CALENDAR_TYPES.US]: [
    'en-CA',
    'en-US',
    'es-AR',
    'es-BO',
    'es-CL',
    'es-CO',
    'es-CR',
    'es-DO',
    'es-EC',
    'es-GT',
    'es-HN',
    'es-MX',
    'es-NI',
    'es-PA',
    'es-PE',
    'es-PR',
    'es-SV',
    'es-VE',
    'pt-BR',
  ],
  [CALENDAR_TYPES.ARABIC]: [
    // ar-LB, ar-MA intentionally missing
    'ar',
    'ar-AE',
    'ar-BH',
    'ar-DZ',
    'ar-EG',
    'ar-IQ',
    'ar-JO',
    'ar-KW',
    'ar-LY',
    'ar-OM',
    'ar-QA',
    'ar-SA',
    'ar-SD',
    'ar-SY',
    'ar-YE',
    'dv',
    'dv-MV',
    'ps',
    'ps-AR',
  ],
  [CALENDAR_TYPES.HEBREW]: [
    'he',
    'he-IL',
  ],
};

export const WEEKDAYS = [...Array(7)].map((el, index) => index);
