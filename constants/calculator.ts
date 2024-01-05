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
