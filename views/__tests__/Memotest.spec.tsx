import renderer, { act } from 'react-test-renderer'
import Memotest from '../Memotest'
import MemotestGrid from '../../components/Memotest/MemotestGrid'

describe('Memotest', () => {
	it('renders correctly', async () => {
		// Arrange & Act
		let memotestRender = null

		await act(() => {
			memotestRender = renderer.create(<Memotest />)
		})

		const memotestInstance = memotestRender!.root

		const titleInstance = memotestInstance.findByProps({ children: 'common.memotest' })
		const memotestGridInstance = memotestInstance.findByType(MemotestGrid)

		// Assert
		expect(titleInstance).toBeDefined()
		expect(memotestGridInstance).toBeDefined()
	})
})
