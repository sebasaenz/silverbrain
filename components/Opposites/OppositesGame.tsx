import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { WORDS_WITH_OPPOSITES } from '../../utils/opposites'
import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { getRandomlySortedArray } from '../../utils/common'
import SimpleModal from '../Common/SimpleModal'
import { useTranslation } from 'react-i18next'
import { AvailableLanguage } from '../../i18n'

const OppositesGame: React.FC<Record<string, never>> = () => {
	const { t, i18n } = useTranslation()
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)',
	})

	const leftSideWords = useRef(getRandomlySortedArray([
		...Object.keys(WORDS_WITH_OPPOSITES[i18n.language as AvailableLanguage]),
	]))
	const rightSideWords = useRef(getRandomlySortedArray([
		...Object.values(WORDS_WITH_OPPOSITES[i18n.language as AvailableLanguage]),
	]))

	const [selectedLeftSideWord, setSelectedLeftSideWord] = useState<string>()
	const [selectedRightSideWord, setSelectedRightSideWord] = useState<string>()
	const [correctlyGuessedWords, setCorrectlyGuessedWords] = useState<string[]>(
		[],
	)

	const [isGameOver, setIsGameOver] = useState<boolean>(false)

	useEffect(() => {
		if (
			selectedLeftSideWord &&
			selectedRightSideWord &&
			WORDS_WITH_OPPOSITES[i18n.language as AvailableLanguage][
				selectedLeftSideWord
			] == selectedRightSideWord
		) {
			setCorrectlyGuessedWords([
				...correctlyGuessedWords,
				selectedLeftSideWord,
				selectedRightSideWord,
			])
			setSelectedLeftSideWord(undefined)
			setSelectedRightSideWord(undefined)
		} else if (selectedLeftSideWord && selectedRightSideWord) {
			setTimeout(() => {
				setSelectedLeftSideWord(undefined)
				setSelectedRightSideWord(undefined)
			}, 800)
		}

		if (
			correctlyGuessedWords.length ==
			leftSideWords.current.length + rightSideWords.current.length
		) {
			setIsGameOver(true)
		}
	}, [selectedLeftSideWord, selectedRightSideWord])

	const resetGame = () => {
		setCorrectlyGuessedWords([])
		setSelectedLeftSideWord(undefined)
		setSelectedRightSideWord(undefined)
		setIsGameOver(false)
	}

	return (
		<View
			style={{
				...styles.container,
				maxWidth: isTabletOrMobileDevice ? 300 : 500,
			}}
		>
			<View style={{ display: 'flex', flexDirection: 'column' }}>
				{leftSideWords.current.map((word) => (
					<TouchableOpacity
						onPress={() => setSelectedLeftSideWord(word)}
						style={{
							...styles.wordWrapper,
							backgroundColor: correctlyGuessedWords.includes(word)
								? 'green'
								: selectedLeftSideWord == word
									? 'lightblue'
									: '#fff',
						}}
						key={word}
					>
						<Text
							style={{
								...styles.wordTextWrapper,
								color: correctlyGuessedWords.includes(word) ? '#fff' : '#000',
							}}
						>
							{_.capitalize(word)}
						</Text>
					</TouchableOpacity>
				))}
			</View>
			<View style={{ display: 'flex', flexDirection: 'column' }}>
				{rightSideWords.current.map((word) => (
					<TouchableOpacity
						onPress={() => setSelectedRightSideWord(word)}
						style={{
							...styles.wordWrapper,
							backgroundColor: correctlyGuessedWords.includes(word)
								? 'green'
								: selectedRightSideWord == word
									? 'lightblue'
									: '#fff',
						}}
						key={word}
					>
						<Text
							style={{
								...styles.wordTextWrapper,
								color: correctlyGuessedWords.includes(word) ? '#fff' : '#000',
							}}
						>
							{_.capitalize(word)}
						</Text>
					</TouchableOpacity>
				))}
			</View>
			<SimpleModal isModalVisible={isGameOver} onRequestClose={resetGame}>
				<View
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ fontSize: 20 }}>{t('common.well_done')}</Text>
					<TouchableOpacity onPress={resetGame} style={styles.playAgainButton}>
						<Text>{t('common.play_again')}</Text>
					</TouchableOpacity>
				</View>
			</SimpleModal>
		</View>
	)
}

export default OppositesGame

const styles = StyleSheet.create({
	container: {
		minHeight: 550,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	wordWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
		padding: 20,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#E0E0E0',
		borderRadius: 5,
		textAlign: 'center',
		minWidth: 130,
	},
	wordTextWrapper: {
		fontSize: 20,
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
