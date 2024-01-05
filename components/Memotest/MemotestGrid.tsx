import { useEffect, useRef, useState } from 'react'
import {  FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { generateMemotestGridData } from '../../utils/memotest'
import { ItemData, MEMOTEST_DUMMY_DATA } from '../../constants/memotest'
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next'
import SimpleModal from '../Common/modals/SimpleModal'

interface ItemProps {
	item: ItemData
	onPress: (selectedItem: number) => void
	selectedItems: number[]
	guessedItems: number[]
	disabled: boolean
	isTabletOrMobileDevice: boolean
}

interface RowProps {
	row: ItemData[]
	handleItemPress: (selectedItem: number) => void
	selectedItems: number[]
	guessedItems: number[]
	disabled: boolean
	isTabletOrMobileDevice: boolean
}

const Row: React.FC<RowProps> = ({
	row,
	handleItemPress,
	selectedItems,
	guessedItems,
	disabled,
	isTabletOrMobileDevice,
}) => {
	return (
		<View style={styles.row}>
			{row.map((item) => (
				<Item
					item={item}
					onPress={handleItemPress}
					selectedItems={selectedItems}
					guessedItems={guessedItems}
					disabled={disabled}
					isTabletOrMobileDevice={isTabletOrMobileDevice}
					key={item.key}
				/>
			))}
		</View>
	)
}

const Item: React.FC<ItemProps> = ({
	item,
	onPress,
	selectedItems,
	guessedItems,
	disabled,
	isTabletOrMobileDevice,
}) => {
	const backgroundColor = guessedItems.includes(item.key!)
		? 'green'
		: selectedItems.includes(item.key!)
			? '#3e9ed7'
			: '#9dd5f7'

	const textColor = [...selectedItems, ...guessedItems].includes(item.key!) ? '#fff' : '#000'

	return (
		<TouchableOpacity
			onPress={() => !disabled && onPress(item.key!)}
			style={[
				styles.item,
				{ backgroundColor },
				{
					width: isTabletOrMobileDevice ? 80 : 110,
					height: isTabletOrMobileDevice ? 80 : 110,
				},
			]}
		>
			<Text
				style={[
					styles.title,
					{ color: textColor },
					{
						display: [...selectedItems, ...guessedItems].includes(item.key!) ? undefined : 'none',
					},
				]}
			>
				{item.title}
			</Text>
		</TouchableOpacity>
	)
}

const MemotestGrid: React.FC<Record<string, never>> = () => {
	const { t } = useTranslation()
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)',
	})

	const [isGameOver, setIsGameOver] = useState<boolean>(false)

	const [selectedItems, setSelectedItems] = useState<number[]>([])
	const [guessedItems, setGuessedItems] = useState<number[]>([])
	const [disabled, setDisabled] = useState<boolean>(false)

	const [startTime, setStartTime] = useState<number>()
	const [duration, setDuration] = useState<number>(0)
	const [rightGuesses, setRightGuesses] = useState<number>(0)
	const [wrongGuesses, setWrongGuesses] = useState<number>(0)

	const dataWithKeys = useRef(generateMemotestGridData(MEMOTEST_DUMMY_DATA))

	useEffect(() => {
		if (!startTime) {
			setStartTime(Date.now())
		}

		if (selectedItems.length == 2) {
			const firstSelectedTitle =
				dataWithKeys.current[Math.ceil(selectedItems[0] / 4 - 1)][(selectedItems[0] - 1) % 4].title
			const secondSelectedTitle =
				dataWithKeys.current[Math.ceil(selectedItems[1] / 4 - 1)][(selectedItems[1] - 1) % 4].title

			if (firstSelectedTitle == secondSelectedTitle) {
				if (
					selectedItems.length + guessedItems.length ==
					dataWithKeys.current
						.map((el: ItemData[]): number => el.length)
						.reduce((el: number, acc: number) => acc + el)
				) {
					setDuration(Date.now() - startTime!)
					setIsGameOver(true)
				}

				setRightGuesses(rightGuesses + 1)
				setGuessedItems([...guessedItems, ...selectedItems])
				setSelectedItems([])
			} else {
				setWrongGuesses(wrongGuesses + 1)
				setDisabled(true)
				setTimeout(() => {
					setSelectedItems([])
					setDisabled(false)
				}, 800)
			}
		}
	}, [selectedItems])

	const handleItemPress = (selectedItem: number) => {
		if (selectedItems.length == 0 || !selectedItems.includes(selectedItem)) {
			setSelectedItems([...selectedItems, selectedItem])
		}
	}

	const renderRow = ({ item }: { item: ItemData[] }) => {
		return (
			<Row
				row={item}
				handleItemPress={handleItemPress}
				selectedItems={selectedItems}
				guessedItems={guessedItems}
				disabled={disabled}
				isTabletOrMobileDevice={isTabletOrMobileDevice}
			/>
		)
	}

	const formatDuration = (duration: number) => {
		const totalSeconds = Math.round(duration / 1000)
		const minutes = Math.floor(totalSeconds / 60)
		const seconds = totalSeconds - minutes * 60

		return `${minutes}m ${seconds}s`
	}

	const resetGame = () => {
		setSelectedItems([])
		setGuessedItems([])
		setStartTime(0)
		setDuration(0)
		setRightGuesses(0)
		setWrongGuesses(0)
		setIsGameOver(false)
	}

	return (
		<View style={styles.container}>
			<FlatList data={dataWithKeys.current} renderItem={renderRow} style={styles.flatList} />
			<SimpleModal isModalVisible={isGameOver} onRequestClose={resetGame}>
				<View>
					<Text style={{ fontSize: 20 }}>
						<strong>{t('memotest.duration')}:</strong> {formatDuration(duration)}
					</Text>
					<Text style={{ fontSize: 20 }}>
						<strong>{t('memotest.right_guesses')}:</strong> {rightGuesses} /{' '}
						{rightGuesses + wrongGuesses}
					</Text>
					<TouchableOpacity onPress={resetGame} style={styles.playAgainButton}>
						<Text>{t('common.play_again')}</Text>
					</TouchableOpacity>
				</View>
			</SimpleModal>
		</View>
	)
}

export default MemotestGrid

const styles = StyleSheet.create({
	container: {
		minHeight: 550,
	},
	item: {
		padding: 20,
		marginRight: 10,
		marginBottom: 10,
		display: 'flex',
		justifyContent: 'center',
		borderRadius: 5,
	},
	title: {
		fontSize: 32,
		textAlign: 'center',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
	},
	flatList: {
		flexGrow: 0,
		marginBottom: 0.5,
	},
	playAgainButton: {
		marginTop: 30,
		borderWidth: 1,
		borderColor: '#e0e0e0',
		borderRadius: 5,
		padding: 10,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
