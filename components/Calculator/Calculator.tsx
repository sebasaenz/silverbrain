import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import {
	Calculation,
	CalculatorLevel,
	Operator,
	generateCalculations,
	generateEmptyCalculationInputs,
	DEFAULT_NUMBER_OF_CALCULATIONS,
} from '../../utils/calculator'
import { useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SimpleModal from '../Common/SimpleModal'

interface CalculatorProps {
	level: CalculatorLevel
}

const Calculator: React.FC<CalculatorProps> = ({ level }) => {
	const { t } = useTranslation()

	const [calculations, setCalculations] = useState<Calculation[]>(
		generateCalculations(level),
	)

	const [calculationNumber, setCalculationNumber] = useState<number>(1)
	const [calculationInputs, setCalculationInputs] = useState<{
		[key in number]: string
	}>(generateEmptyCalculationInputs())
	const [rightGuesses, setRightGuesses] = useState<number[]>([])

	const [isGameOver, setIsGameOver] = useState<boolean>(false)

	const formatCalculation = (
		calculation: Calculation,
		forRender: boolean = true,
	) =>
		`${calculation.leftHandSideOperand} ${
			forRender ? formatOperator(calculation.operator) : calculation.operator
		} ${calculation.rightHandSideOperand}`

	const onChangeCalculationInput = (
		calculationIndex: number,
		newVal: string,
	) => {
		setCalculationInputs({
			...calculationInputs,
			[calculationIndex]: newVal,
		})
	}

	const formatOperator = (operator: Operator) =>
		operator == '*' ? '×' : operator == '/' ? '÷' : operator

	const evaluateCalculation = () => {
		const correct =
			parseInt(calculationInputs[calculationNumber]) ==
			eval(formatCalculation(calculations[calculationNumber - 1], false))

		if (correct) {
			setRightGuesses([...rightGuesses, calculationNumber])
		}

		setCalculationNumber(calculationNumber + 1)
	}

	const getCalculationColor = (indexOneBased: number) =>
		indexOneBased == calculationNumber
			? '#000'
			: indexOneBased < calculationNumber &&
				  rightGuesses.includes(indexOneBased)
				? 'green'
				: 'red'

	useEffect(() => {
		console.log(calculationNumber)
		if (calculationNumber == DEFAULT_NUMBER_OF_CALCULATIONS + 1) {
			setIsGameOver(true)
		}
	}, [calculationNumber])

	const resetGame = () => {
		setCalculationNumber(1)
		setCalculationInputs(generateEmptyCalculationInputs())
		setRightGuesses([])
		setCalculations(generateCalculations(level))
		setIsGameOver(false)
	}

	return (
		<View style={styles.container}>
			{calculations.map((calculation, idx) => (
				<View
					style={{
						display: idx + 1 > calculationNumber ? 'none' : 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
					key={idx}
				>
					<Text
						style={{
							...styles.calculation,
							color: getCalculationColor(idx + 1),
						}}
					>
						<Text>{formatCalculation(calculation)}</Text>
						<Text> = </Text>
					</Text>
					<TextInput
						style={{
							...styles.input,
							color: getCalculationColor(idx + 1),
							borderColor:
								idx + 1 < calculationNumber ? 'transparent' : '#e0e0e0',
						}}
						onChangeText={(val) => onChangeCalculationInput(idx + 1, val)}
						value={calculationInputs[idx + 1]}
						keyboardType="numeric"
					/>
					<TouchableOpacity
						onPress={evaluateCalculation}
						style={{
							...styles.validateButton,
							transform: idx + 1 == calculationNumber ? 'none' : [{ scale: 0 }],
						}}
					>
						<Text>{t('calculator.validate')}</Text>
					</TouchableOpacity>
				</View>
			))}
			<SimpleModal isModalVisible={isGameOver} onRequestClose={resetGame}>
				<View>
					<Text style={{ fontSize: 20 }}>
						<strong>{t('memotest.right_guesses')}:</strong>{' '}
						{rightGuesses.length} / {DEFAULT_NUMBER_OF_CALCULATIONS}
					</Text>
					<TouchableOpacity onPress={resetGame} style={styles.playAgainButton}>
						<Text>{t('common.play_again')}</Text>
					</TouchableOpacity>
				</View>
			</SimpleModal>
		</View>
	)
}

export default Calculator

const styles = StyleSheet.create({
	container: {
		minHeight: 550,
		marginLeft: 60,
	},
	calculation: {
		fontSize: 40,
		width: 155,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginRight: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: '#e0e0e0',
		borderStyle: 'solid',
		padding: 5,
		textAlign: 'right',
		fontSize: 40,
		maxWidth: 200,
	},
	validateButton: {
		fontSize: 20,
		padding: 10,
		borderWidth: 1,
		borderColor: '#e0e0e0',
		borderStyle: 'solid',
		marginLeft: 10,
		borderRadius: 5,
		backgroundColor: '#e4f8ff',
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
