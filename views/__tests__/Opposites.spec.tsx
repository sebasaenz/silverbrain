import renderer from 'react-test-renderer'
import Opposites from '../Opposites'
import { Text } from 'react-native'
import OppositesGame from '../../components/Opposites/OppositesGame'

describe('Opposites', () => {
	it('renders correctly', () => {
		// Arrange & Act
		const oppositesInstance = renderer.create(<Opposites />).root

		const titleInstance = oppositesInstance.findAllByType(Text)[0]
		const oppositesGameInstance = oppositesInstance.findByType(OppositesGame)

		// Assert
		expect(titleInstance.props.children).toEqual('common.opposites')
		expect(oppositesGameInstance).toBeDefined()
	})
})
