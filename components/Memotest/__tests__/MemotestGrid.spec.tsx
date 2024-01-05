import renderer, { act } from 'react-test-renderer'
import MemotestGrid from '../../Memotest/MemotestGrid'
import { FlatList } from 'react-native'
import SimpleModal from '../../Common/modals/SimpleModal'
import { DEFAULT_GRID_SIZE } from '../../../constants/memotest'

describe('MemotestGrid', () => {
    it('renders correctly', async () => {
        let memotestGridRender = null
        await act(() => {
            memotestGridRender = renderer.create(<MemotestGrid />)
        })

        const memotestGridInstance = memotestGridRender!.root

        const grid = memotestGridInstance.findByType(FlatList)
        const simpleModal = memotestGridInstance.findByType(SimpleModal)

        expect(grid).toBeDefined()
        expect(grid.props.data.length).toEqual(DEFAULT_GRID_SIZE)
        expect(grid.props.data[0].length).toEqual(DEFAULT_GRID_SIZE)
        expect(simpleModal).toBeDefined()
        expect(simpleModal.props.isModalVisible).toBeFalsy()
    })
})