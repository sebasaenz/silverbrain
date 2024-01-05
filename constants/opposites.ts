import { AvailableLanguage } from '../i18n'

export const WORDS_WITH_OPPOSITES: {
	[key in AvailableLanguage]: { [key: string]: string }
} = {
	en: {
		pretty: 'ugly',
		big: 'small',
		closed: 'open',
		common: 'rare',
		broad: 'narrow',
	},
	es: {
		bonito: 'feo',
		grande: 'pequeño',
		cerrado: 'abierto',
		común: 'raro',
		ancho: 'angosto',
	},
	ca: {
		bonic: 'lleig',
		grand: 'petit',
		tancat: 'obert',
		comú: 'rar',
		ample: 'estreta',
	},
	eu: {
		polita: 'itsusia',
		handia: 'gutxi',
		itxita: 'irekita',
		ohikoa: 'arraroa',
		zabala: 'estua',
	},
}
