jest.mock('@react-native-async-storage/async-storage', () =>
	require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
)

jest.mock('react-i18next', () => ({
	...jest.requireActual('react-i18next'),
	__esModule: true,
	useTranslation: () => ({
		t: (key) => key,
		i18n: {
			language: 'es',
		},
	}),
}))
