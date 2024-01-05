import renderer from 'react-test-renderer'
import Memotest from '../Memotest'

describe.skip('Memotest', () => {
	it('renders correctly', () => {
		// Arrange & Act
		const memotestInstance = renderer.create(<Memotest />)

		// console.log(memotestInstance.children)

		// const titleInstance = memotestInstance.findByType(Text)
		// // const memotestGridInstance = memotestInstance.findByType(MemotestGrid)

		// // Assert
		// expect(titleInstance.children).toEqual('common.memotest')
		// // expect(memotestGridInstance).toBeDefined()
	})
})
