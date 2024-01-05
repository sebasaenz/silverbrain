import renderer, { act } from 'react-test-renderer'
import Home from '../Home'
import { AVAILABLE_LANGUAGES } from '../../i18n'
import Ionicons from '@expo/vector-icons/Ionicons'
import SettingsModal from '../../modals/SettingsModal'

interface ComponentTree {
	type: string
	props: any
	children: any[]
}

describe('Home', () => {
	it('renders correctly', () => {
		// Arrange && Act
		const homeComponent = renderer.create(<Home />).toJSON()
		const children = (homeComponent as ComponentTree).children

		const areFlagsDefined =
			children.filter(
				(el: ComponentTree) =>
					el.type == 'View' &&
					el.children &&
					el.children.length == AVAILABLE_LANGUAGES.length &&
					el.children.map((el: ComponentTree) =>
						el.children.map((el1: ComponentTree) => el1.type == 'Image'),
					),
			).length == 1

		const isSettingsIconDefined =
			children.filter(
				(el: ComponentTree) =>
					el.type == 'View' &&
					el.children &&
					el.children.length == 1 &&
					el.children[0].type == 'Text',
			).length == 1

		const isTitleDefined =
			children.filter(
				(el: ComponentTree) =>
					el.children &&
					el.children.length > 0 &&
					el.children[0] == 'Escoja un juego',
			).length == 1

		const isMemotestDefined =
			children.filter(
				(el: ComponentTree) =>
					el.children && el.children.length > 0 && el.children[0] == 'Memotest',
			).length == 1

		const isOppositesDefined =
			children.filter(
				(el: ComponentTree) =>
					el.children && el.children.length > 0 && el.children[0] == 'Opuestos',
			).length == 1

		const isCalculatorDefined =
			children.filter(
				(el: ComponentTree) =>
					el.children &&
					el.children.length > 0 &&
					el.children[0] == 'Calculadora',
			).length == 1

		const isSettingsModalDefined =
			children.filter(
				(el: ComponentTree) => el.type == 'Modal' && el.props.visible == false,
			).length == 1

		// Assert
		expect(areFlagsDefined).toBeTruthy()
		expect(isSettingsIconDefined).toBeTruthy()
		expect(isTitleDefined).toBeTruthy()
		expect(isMemotestDefined).toBeTruthy()
		expect(isOppositesDefined).toBeTruthy()
		expect(isCalculatorDefined).toBeTruthy()
		expect(isSettingsModalDefined).toBeTruthy()
	})

	it('makes the settings modal visible after pressing on the settings icon', async () => {
		// Arrange
		const homeRender = renderer.create(<Home />)
		const homeInstance = homeRender.root

		const wasSettingsModalVisible =
			homeInstance.findByType(SettingsModal).props.isUserModalVisible

		// Act
		await act(() => {
			homeInstance.findByType(Ionicons).props.onPress()
		})
		const isSettingsModalVisible =
			homeInstance.findByType(SettingsModal).props.isUserModalVisible

		// Assert
		expect(wasSettingsModalVisible).toBeFalsy()
		expect(isSettingsModalVisible).toBeTruthy()
	})
})
