import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

i18next
	.use(HttpApi)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		debug: false,
		keySeparator: false,
		backend: {
			loadPath: "/locales/{{lng}}/translation.json",
		},
		react: {
			useSuspense: false,
		},
		interpolation: {
			escapeValue: false,
		},
		nsSeparator: "|",
	});

export { i18next };
