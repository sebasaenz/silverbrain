import { Text, View } from 'react-native'
import Calculator from '../Calculator'
import CalculatorSubcomponent from '../../components/Calculator/Calculator'
import renderer, { act } from 'react-test-renderer'

describe('Calculator', () => {
	it('renders correctly', () => {
		// Arrange & Act
		const calculatorInstance = renderer.create(<Calculator />).root
		const textInstances = calculatorInstance.findAllByType(Text)

		// Assert
		expect(textInstances.map((el: any) => el.props).map((el: any) => el.children)).toContain(
			'common.calculator',
		)
		expect(textInstances.map((el: any) => el.props).map((el: any) => el.children)).toContain(
			'common.choose_a_level',
		)
		expect(textInstances.map((el: any) => el.props).map((el: any) => el.children)).toContain(
			'Common.easy',
		)
		expect(textInstances.map((el: any) => el.props).map((el: any) => el.children)).toContain(
			'Common.medium',
		)
		expect(textInstances.map((el: any) => el.props).map((el: any) => el.children)).toContain(
			'Common.hard',
		)
	})

	it('renders the calculator subcomponent when a level is selected and the start button is pressed', async () => {
		// Arrange & Act
		const calculatorInstance = renderer.create(<Calculator />).root

		await act(() => {
			calculatorInstance.findByProps({ testID: 'easy' }).props.onPress()
		})

		await act(() => {
			calculatorInstance.findByProps({ testID: 'start-button' }).props.onPress()
		})

		// Assert
		const calculatorSubcomponentInstance = calculatorInstance!.findByType(CalculatorSubcomponent)
		expect(calculatorSubcomponentInstance).toBeDefined()
		expect(calculatorSubcomponentInstance.props.level).toEqual('easy')
	})
})
