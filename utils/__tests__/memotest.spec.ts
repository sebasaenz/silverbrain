import { generateMemotestGridData } from '../memotest'
import { MEMOTEST_DUMMY_DATA } from '../../constants/memotest'

describe('generateMemotestGridData', () => {
	it('should generate a bidimensional matrix with the default grid size', () => {
		// Act
		const memotestGrid = generateMemotestGridData(MEMOTEST_DUMMY_DATA)

		// Assert
		expect(memotestGrid.length).toEqual(4)
		expect(memotestGrid[0].length).toEqual(4)
	})

	it('should have the input data twice', () => {
		// Act
		const memotestGrid = generateMemotestGridData(MEMOTEST_DUMMY_DATA)

		// Assert
		expect(
			MEMOTEST_DUMMY_DATA.every(
				(el) => memotestGrid.flat().filter((el1) => el1.title == el.title).length == 2,
			),
		).toEqual(true)
	})
})
