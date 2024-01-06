import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import CalculatorSubcomponent from '../components/Calculator/Calculator'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { CalculatorLevel, AVAILABLE_LEVELS } from '../constants/calculator'
import _ from 'lodash'

const Calculator: React.FC<Record<string, never>> = () => {
	const { t } = useTranslation()

	const [hasGameStarted, setHasGameStarted] = useState<boolean>(false)
	const [level, setLevel] = useState<CalculatorLevel>()

	return (
		<View style={styles.container}>
			<Text style={styles.header}>{t('common.calculator')}</Text>
			{!hasGameStarted && (
				<View style={styles.innerContainer}>
					<View style={{ marginBottom: 30 }}>
						<Text style={{ fontSize: 25, textAlign: 'center' }}>{t('common.choose_a_level')}</Text>
					</View>
					{AVAILABLE_LEVELS.map((availableLevel) => (
						<TouchableOpacity
							onPress={() => setLevel(availableLevel)}
							style={{
								...styles.levelSelector,
								backgroundColor: availableLevel == level ? 'lightblue' : 'transparent',
							}}
							key={availableLevel}
						>
							<Text style={styles.levelText}>{_.capitalize(t(`common.${availableLevel}`))}</Text>
						</TouchableOpacity>
					))}
					{!!level && (
						<TouchableOpacity
							onPress={() => setHasGameStarted(true)}
							style={{ ...styles.startGameButton, alignSelf: 'center' }}
						>
							<Text style={styles.startGameButtonText}>{t('common.start')}</Text>
						</TouchableOpacity>
					)}
				</View>
			)}
			{hasGameStarted && <CalculatorSubcomponent level={level || 'easy'} />}
		</View>
	)
}

export default Calculator

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff8f2',
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerContainer: {
		minHeight: 400,
		width: 250,
	},
	header: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 30,
	},
	levelSelector: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15,
		borderWidth: 1,
		borderColor: '#e0e0e0',
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 20,
		width: '100%',
	},
	levelText: {
		fontSize: 20,
	},
	startGameButton: {
		borderRadius: 5,
		padding: 20,
		width: 140,
		marginTop: 25,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2296d0',
	},
	startGameButtonText: {
		fontSize: 20,
		color: '#fff',
		fontWeight: 'bold',
	},
})
