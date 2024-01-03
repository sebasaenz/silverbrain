import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { WORDS_WITH_OPPOSITES } from '../../utils/opposites'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const LEFT_SIDE_WORDS = [...Object.keys(WORDS_WITH_OPPOSITES)].sort(
	() => 0.5 - Math.random(),
)
const RIGHT_SIDE_WORDS = [...Object.values(WORDS_WITH_OPPOSITES)].sort(
	() => 0.5 - Math.random(),
)

const OppositesGame: React.FC<Record<string, never>> = () => {
    const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)',
	})
    
	const [selectedLeftSideWord, setSelectedLeftSideWord] = useState<string>()
	const [selectedRightSideWord, setSelectedRightSideWord] = useState<string>()
	const [correctlyGuessedWords, setCorrectlyGuessedWords] = useState<string[]>(
		[],
	)

	useEffect(() => {
		if (
			selectedLeftSideWord &&
			selectedRightSideWord &&
			WORDS_WITH_OPPOSITES[selectedLeftSideWord] == selectedRightSideWord
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
	}, [selectedLeftSideWord, selectedRightSideWord])

	return (
		<View style={{ ...styles.container, maxWidth: isTabletOrMobileDevice ? 300 : 500 }}>
			<View style={{ display: 'flex', flexDirection: 'column' }}>
				{LEFT_SIDE_WORDS.map((word) => (
					<TouchableOpacity
                        onPress={() => setSelectedLeftSideWord(word)}
                        style={{
                            ...styles.wordWrapper,
                            backgroundColor: correctlyGuessedWords.includes(word)
                                ? 'green'
                                : selectedLeftSideWord == word
                                    ? 'lightblue'
                                    : '#fff',
                        }}>
						<Text style={{color: correctlyGuessedWords.includes(word) ? '#fff' : '#000'}}>
							{_.capitalize(word)}
						</Text>
					</TouchableOpacity>
				))}
			</View>
			<View style={{ display: 'flex', flexDirection: 'column' }}>
				{RIGHT_SIDE_WORDS.map((word) => (
					<TouchableOpacity
                        onPress={() => setSelectedRightSideWord(word)}
                        style={{
                            ...styles.wordWrapper,
                            backgroundColor: correctlyGuessedWords.includes(word)
                                ? 'green'
                                : selectedRightSideWord == word
                                    ? 'lightblue'
                                    : '#fff',
                        }}>
						<Text style={{color: correctlyGuessedWords.includes(word) ? '#fff' : '#000'}}>
							{_.capitalize(word)}
						</Text>
					</TouchableOpacity>
				))}
			</View>
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
		fontSize: 20,
		marginBottom: 10,
		padding: 20,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#E0E0E0',
		borderRadius: 5,
        textAlign: 'center',
        minWidth: 130
	},
})
