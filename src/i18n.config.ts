import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ES_MX from '../i18n/es-MX.json';
import EN_US from '../i18n/en-US.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'es-MX': {
        translation: ES_MX,
      },
      'en-US': {
        translation: EN_US,
      },
    },
    lng: 'es-MX',
    fallbackLng: 'es-MX',
  });
