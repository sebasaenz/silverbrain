import { getRandomlySortedArray } from './common'
import { ItemData, DEFAULT_GRID_SIZE } from '../constants/memotest'

export const generateMemotestGridData = (data: ItemData[], gridSize: number = DEFAULT_GRID_SIZE): ItemData[][] => {
	let duplicatedRandomizedData = getRandomlySortedArray([...data, ...data])
	let gridData: ItemData[][] = []

	let dataCounter = 0
	for (let i = 0; i < gridSize; i++) {
		let row: ItemData[] = []
		for (let j = 0; j < gridSize; j++) {
			row.push({
				key: dataCounter + 1,
				...duplicatedRandomizedData[dataCounter],
			})
			dataCounter++
		}
		gridData.push(row)
	}

	return gridData
}
