import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en/translation.json'
import es from './locales/es/translation.json'
import ca from './locales/ca/translation.json'
import eu from './locales/eu/translation.json'

export type AvailableLanguage = 'en' | 'es' | 'ca' | 'eu'

export const AVAILABLE_LANGUAGES: AvailableLanguage[] = ['es', 'ca', 'eu', 'en']

const resources = {
	en: {
		translation: en,
	},
	es: {
		translation: es,
	},
	ca: {
		translation: ca,
	},
	eu: {
		translation: eu,
	},
}

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	resources,
	lng: 'es',
	interpolation: {
		escapeValue: false,
	},
	react: { useSuspense: false },
})

export default i18n
