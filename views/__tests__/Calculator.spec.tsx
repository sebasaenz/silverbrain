import { Text } from 'react-native'
import Calculator from '../Calculator'
import renderer from 'react-test-renderer'

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
})
