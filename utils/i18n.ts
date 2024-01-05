import i18n, { AvailableLanguage } from '../i18n'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const changeLanguageHandler = async (lang: AvailableLanguage) => {
	try {
		await AsyncStorage.setItem('lang', lang)
		i18n.changeLanguage(lang)
	} catch (e) {
		throw e
	}
}
