import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: { "key": "value" } },
        es: { translation: { "key": "valor" } },
        fr: { translation: { "key": "valeur" } },

    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
        escapeValue: false, // React already escapes values
    },
});

export default i18n;
