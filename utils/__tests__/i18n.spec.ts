import AsyncStorage from '@react-native-async-storage/async-storage'
import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import { changeLanguageHandler } from '../i18n'
import i18n, { AvailableLanguage } from '../../i18n'

jest.mock('../../i18n')

describe('i18n', () => {
	afterEach((done) => {
		jest.resetAllMocks()
		done()
	})

	describe('changeLanguageHandler', () => {
		it('should call AsyncStorage.setItem to set lng to the language that is passed to the function', async () => {
			// Arrange
			const selectedLanguage: AvailableLanguage = 'eu'

			// Act
			await changeLanguageHandler(selectedLanguage)

			// Assert
			expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1)
			expect(AsyncStorage.setItem).toHaveBeenNthCalledWith(1, 'lang', selectedLanguage)
		})

		it('should call i18n.changeLanguage with the selected language', async () => {
			// Arrange
			const selectedLanguage: AvailableLanguage = 'ca'

			// Act
			await changeLanguageHandler(selectedLanguage)

			// Assert
			expect(i18n.changeLanguage).toHaveBeenCalledTimes(1)
			expect(i18n.changeLanguage).toHaveBeenNthCalledWith(1, selectedLanguage)
		})

		it('should throw an error if AsyncStorage.setItem throws an error', async () => {
			// Arrange
			const selectedLanguage: AvailableLanguage = 'ca'
			AsyncStorageMock.setItem = jest.fn(() => Promise.reject('Error'))
			let functionThrew = false

			// Act
			try {
				await changeLanguageHandler(selectedLanguage)
			} catch (e: any) {
				functionThrew = true
			}

			// Act & Assert
			expect(functionThrew).toBeTruthy()
		})
	})
})
