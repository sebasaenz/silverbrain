export interface ItemData {
    key?: number
    title: string
    backImage: string
}

export const MEMOTEST_DUMMY_DATA: ItemData[] = [
    {
        title: 'A',
        backImage: 'A.png'
    },
    {
        title: 'B',
        backImage: 'B.png'
    },
    {
        title: 'C',
        backImage: 'C.png'
    },
    {
        title: 'D',
        backImage: 'D.png'
    },
    {
        title: 'E',
        backImage: 'E.png'
    },
    {
        title: 'F',
        backImage: 'F.png'
    },
    {
        title: 'G',
        backImage: 'G.png'
    },
    {
        title: 'H',
        backImage: 'H.png'
    }
]

export const generateMemotestGridData = (data: ItemData[], gridSize: number = 4) => {
    let duplicatedRandomizedData = [...data, ...data].sort(() => 0.5 - Math.random())
    let gridData: ItemData[][] = []

    let dataCounter = 0
    for (let i = 0; i < gridSize; i++) {
        let row: ItemData[] = []
        for (let j = 0; j < gridSize; j++) {
            row.push({
                key: dataCounter + 1,
                ...duplicatedRandomizedData[dataCounter]
            })
            dataCounter++
        }
        gridData.push(row)
    }

    return gridData
}