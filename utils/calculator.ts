export const DEFAULT_NUMBER_OF_CALCULATIONS = 5

export type CalculatorLevel = 'easy' | 'medium' | 'hard'

export type Operator = '+' | '-' | '*' | '/'

export interface Calculation {
	leftHandSideOperand: number
	rightHandSideOperand: number
	operator: Operator
}

export const AVAILABLE_LEVELS: CalculatorLevel[] = ['easy', 'medium', 'hard']

export const AVAILABLE_OPERATIONS: { [key in CalculatorLevel]: string[] } = {
	easy: ['+'],
	medium: ['+', '-'],
	hard: ['+', '-', '*', '/'],
}

export const generateCalculations = (
	level: CalculatorLevel,
	numberOfCalculations: number = DEFAULT_NUMBER_OF_CALCULATIONS,
): Calculation[] => {
	let calculations: Calculation[] = []
	for (let i = 1; i <= numberOfCalculations; i++) {
		let leftHandSideOperand = Math.floor(Math.random() * 10)
		let rightHandSideOperand = Math.floor(Math.random() * 10)
		const operator = AVAILABLE_OPERATIONS[level][
			Math.floor(Math.floor(Math.random() * AVAILABLE_OPERATIONS[level].length))
		] as Operator

		// Avoid duplicate calculations in the same set
		if (
			calculations.filter(
				(calculation) =>
					leftHandSideOperand == calculation.leftHandSideOperand &&
					rightHandSideOperand == calculation.rightHandSideOperand &&
					operator == calculation.operator,
			).length > 0
		) {
			i--
			continue
		}

		// Avoid non integer quotients and division by zero
		if (operator == '/') {
			if (rightHandSideOperand == 0) {
				rightHandSideOperand = 1
			}

			if (leftHandSideOperand % rightHandSideOperand !== 0) {
				leftHandSideOperand =
					Math.ceil(leftHandSideOperand / rightHandSideOperand) *
					rightHandSideOperand
			}
		}

		// Avoid negative numbers in results
		if (operator == '-' && leftHandSideOperand < rightHandSideOperand) {
			const tmp = leftHandSideOperand
			leftHandSideOperand = rightHandSideOperand
			rightHandSideOperand = tmp
		}

		calculations.push({
			leftHandSideOperand,
			rightHandSideOperand,
			operator,
		})
	}

	return calculations
}

export const generateEmptyCalculationInputs = (
	numberOfCalculations: number = DEFAULT_NUMBER_OF_CALCULATIONS,
): { [key in number]: string } => {
	let calculationInputs: { [key in number]: string } = {}

	for (let i = 1; i <= numberOfCalculations; i++) {
		calculationInputs[i] = ''
	}

	return calculationInputs
}
