import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import { generateCalculations, generateEmptyCalculationInputs } from '../../utils/calculator'
import {
	Calculation,
	CalculatorLevel,
	Operator,
	DEFAULT_NUMBER_OF_CALCULATIONS,
} from '../../constants/calculator'
import { useEffect, useState } from 'react'
import SimpleModal from '../Common/SimpleModal'
import { useMediaQuery } from 'react-responsive'

interface CalculatorProps {
	level: CalculatorLevel
}

const Calculator: React.FC<CalculatorProps> = ({ level }) => {
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)',
	})

	const { t } = useTranslation()

	const [calculations, setCalculations] = useState<Calculation[]>(generateCalculations(level))

	const [calculationNumber, setCalculationNumber] = useState<number>(1)
	const [calculationInputs, setCalculationInputs] = useState<{
		[key in number]: string
	}>(generateEmptyCalculationInputs())
	const [rightGuesses, setRightGuesses] = useState<number[]>([])

	const [isGameOver, setIsGameOver] = useState<boolean>(false)

	const formatCalculation = (calculation: Calculation, forRender: boolean = true) =>
		`${calculation.leftHandSideOperand} ${
			forRender ? formatOperator(calculation.operator) : calculation.operator
		} ${calculation.rightHandSideOperand}`

	const onChangeCalculationInput = (calculationIndex: number, newVal: string) => {
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
			: indexOneBased < calculationNumber && rightGuesses.includes(indexOneBased)
				? 'green'
				: 'red'

	useEffect(() => {
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
		<View
			style={{
				...styles.container,
				marginLeft: isTabletOrMobileDevice ? 20 : 60,
			}}
		>
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
							marginRight: isTabletOrMobileDevice ? 0 : 10,
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
							borderColor: idx + 1 < calculationNumber ? 'transparent' : '#e0e0e0',
						}}
						onChangeText={(val) => onChangeCalculationInput(idx + 1, val)}
						value={calculationInputs[idx + 1]}
						keyboardType="numeric"
						caretHidden
					/>
					<TouchableOpacity
						onPress={evaluateCalculation}
						style={{
							...styles.validateButton,
							transform:
								Platform.OS == 'web' && idx + 1 == calculationNumber ? 'none' : [{ scale: 0.01 }],
						}}
					>
						<Text>{t('calculator.validate')}</Text>
					</TouchableOpacity>
				</View>
			))}
			<SimpleModal isModalVisible={isGameOver} onRequestClose={resetGame}>
				<View>
					<Text style={{ fontSize: 20 }}>
						<Text style={{ fontWeight: 'bold' }}>{t('memotest.right_guesses')}:</Text>{' '}
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
	},
	calculation: {
		fontSize: 40,
		width: 155,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	input: {
		borderWidth: 1,
		borderColor: '#e0e0e0',
		borderStyle: 'solid',
		borderRadius: 5,
		paddingHorizontal: 20,
		textAlign: 'center',
		fontSize: 40,
		width: 100,
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
