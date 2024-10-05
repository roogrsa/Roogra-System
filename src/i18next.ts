import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next';
import Backend from "i18next-http-backend";

const availableLanguages = ["en", "ar"];

const option = {
    order: ["navigator", "htmlTag", "path", "subdomain"],
    checkWhitelist: true,
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(Backend)
    .init({
        fallbackLng: "ar",
        debug: true,
        supportedLngs: availableLanguages,
        detection: option,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;