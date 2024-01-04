import { getRandomlySortedArray } from '../common'

describe('common', () => {
	it('retrieves a randomly sorted array based on the results of the inner Math.random function', () => {
		// Arrange
		jest
			.spyOn(global.Math, 'random')
			.mockReturnValueOnce(0.7)
			.mockReturnValueOnce(0.3)
			.mockReturnValueOnce(0.8)
			.mockReturnValueOnce(0.2)
			.mockReturnValueOnce(0.6)
			.mockReturnValueOnce(0.6)
			.mockReturnValueOnce(0.2)
			.mockReturnValueOnce(0.1)

		const array = [1, 2, 3, 4, 5]
		const expectedArray = [4, 2, 3, 1, 5]

		// Act
		const sortedArray = getRandomlySortedArray(array)

		// Assert
		expect(sortedArray).toEqual(expectedArray)
	})
})
