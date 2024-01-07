import renderer, { act } from 'react-test-renderer'
import Home from '../Home'
import { AVAILABLE_LANGUAGES } from '../../i18n'
import Ionicons from '@expo/vector-icons/Ionicons'
import SettingsModal from '../../components/Common/modals/SettingsModal'
import { ComponentTree } from '../../constants/testing'
import { useMediaQuery } from 'react-responsive'

jest.mock('react-responsive', () => ({
	...jest.requireActual('react-responsive'),
	useMediaQuery: jest.fn().mockReturnValue(false)
}))

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
					el.children && el.children.length > 0 && el.children[0] == 'home.choose_game',
			).length == 1

		const isMemotestDefined =
			children.filter(
				(el: ComponentTree) =>
					el.children && el.children.length > 0 && el.children[0] == 'common.memotest',
			).length == 1

		const isOppositesDefined =
			children.filter(
				(el: ComponentTree) =>
					el.children && el.children.length > 0 && el.children[0] == 'common.opposites',
			).length == 1

		const isCalculatorDefined =
			children.filter(
				(el: ComponentTree) =>
					el.children && el.children.length > 0 && el.children[0] == 'common.calculator',
			).length == 1

		const isSettingsModalDefined =
			children.filter((el: ComponentTree) => el.type == 'Modal' && el.props.visible == false)
				.length == 1

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

		const wasSettingsModalVisible = homeInstance.findByType(SettingsModal).props.isUserModalVisible

		// Act
		await act(() => {
			homeInstance.findByType(Ionicons).props.onPress()
		})
		const isSettingsModalVisible = homeInstance.findByType(SettingsModal).props.isUserModalVisible

		// Assert
		expect(wasSettingsModalVisible).toBeFalsy()
		expect(isSettingsModalVisible).toBeTruthy()
	})

	it('should close the settings modal after pressing on the close icon', async () => {
		// Arrange
		const homeInstance = renderer.create(<Home />).root

		const wasSettingsModalVisible = homeInstance.findByType(SettingsModal).props.isUserModalVisible

		// Act
		await act(() => {
			homeInstance.findByType(Ionicons).props.onPress()
		})
		const wasSettingsModalVisibleOnSettingsIconPress = homeInstance.findByType(SettingsModal).props.isUserModalVisible

		await act(() => {
			homeInstance.findByType(SettingsModal).props.onRequestClose()
		})
		const isSettingsModalVisible = homeInstance.findByType(SettingsModal).props.isUserModalVisible

		// Assert
		expect(wasSettingsModalVisible).toBeFalsy()
		expect(wasSettingsModalVisibleOnSettingsIconPress).toBeTruthy()
		expect(isSettingsModalVisible).toBeFalsy()
	})

	it('should render the settings icon container and the flags container with their corresponding values in higher screen resolutions', () => {
		// Arrange
		(useMediaQuery as jest.Mock).mockReturnValue(true)

		// Act
		const homeInstance = renderer.create(<Home />).root

		// Assert
		expect(homeInstance.findByProps({ testID: 'icon-container' }).props.style.top).toEqual(58)
		expect(homeInstance.findByProps({ testID: 'icon-container' }).props.style.right).toEqual(20)
		expect(homeInstance.findByProps({ testID: 'flags-container' }).props.style.top).toEqual(60)
		expect(homeInstance.findByProps({ testID: 'flags-container' }).props.style.left).toEqual(20)
	})

	it('should render the settings icon container and the flags container with their corresponding values in higher screen resolutions', () => {
		// Arrange
		(useMediaQuery as jest.Mock).mockReturnValue(false)

		// Act
		const homeInstance = renderer.create(<Home />).root

		// Assert
		expect(homeInstance.findByProps({ testID: 'icon-container' }).props.style.top).toEqual(20)
		expect(homeInstance.findByProps({ testID: 'icon-container' }).props.style.right).toEqual(30)
		expect(homeInstance.findByProps({ testID: 'flags-container' }).props.style.top).toEqual(25)
		expect(homeInstance.findByProps({ testID: 'flags-container' }).props.style.left).toEqual(30)
	})
})
