import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './assets/locales/en.yml';
import ja from './assets/locales/ja.yml';

const resources = {
  en,
  ja,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: [
        'navigator',
        'querystring',
        'cookie',
        'localStorage',
        'sessionStorage',
        'htmlTag',
      ],
    },
  });
