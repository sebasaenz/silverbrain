import {
	generateCalculations,
	generateEmptyCalculationInputs,
} from '../calculator'
import { DEFAULT_NUMBER_OF_CALCULATIONS } from '../../constants/calculator'

describe('calculator', () => {
	describe('generateCalculations', () => {
		it('should retrieve the default amount of calculations', () => {
			// Act
			const calculations = generateCalculations('easy')

			// Asert
			expect(calculations.length).toBe(DEFAULT_NUMBER_OF_CALCULATIONS)
		})

		it('should retrieve the amount of calculations specified in the function parameter', () => {
			// Arrange
			const numberOfCalculations = 10

			// Act
			const calculations = generateCalculations('easy', numberOfCalculations)

			// Asert
			expect(calculations.length).toBe(numberOfCalculations)
		})

		it('should only retrieve additions if the level is set to easy', () => {
			// Act
			const calculations = generateCalculations('easy', 10)

			// Assert
			for (const calculation of calculations) {
				expect(calculation.operator).toBe('+')
			}
		})

		it('should retrieve additions or subtractions if the level is set to medium', () => {
			// Arrange
			jest
				.spyOn(Math, 'random')
				// First calculation
				.mockReturnValueOnce(0) // Left-hand side operand: 0
				.mockReturnValueOnce(0) // Right-hand side operand: 0
				.mockReturnValueOnce(0) // Operator: "+"
				// Second calculation
				.mockReturnValueOnce(0) // Left-hand side operand: 0
				.mockReturnValueOnce(0) // Right-hand side operand: 0
				.mockReturnValueOnce(0.7) // Operator: "-"

			// Act
			const calculations = generateCalculations('medium', 2)

			// Assert
			expect(calculations[0].operator).toBe('+')
			expect(calculations[1].operator).toBe('-')
		})

		it('should retrieve any of the available operators if the level is set to hard', () => {
			// Arrange
			jest
				.spyOn(Math, 'random')
				// First calculation
				.mockReturnValueOnce(0) // Left-hand side operand: 0
				.mockReturnValueOnce(0) // Right-hand side operand: 0
				.mockReturnValueOnce(0) // Operator: "+"
				// Second calculation
				.mockReturnValueOnce(0) // Left-hand side operand: 0
				.mockReturnValueOnce(0) // Right-hand side operand: 0
				.mockReturnValueOnce(0.25) // Operator: "-"
				// Third calculation
				.mockReturnValueOnce(0) // Left-hand side operand: 0
				.mockReturnValueOnce(0) // Right-hand side operand: 0
				.mockReturnValueOnce(0.5) // Operator: "*"
				// Fourth calculation
				.mockReturnValueOnce(0) // Left-hand side operand: 0
				.mockReturnValueOnce(0) // Right-hand side operand: 0
				.mockReturnValueOnce(0.75) // Operator: "/"

			// Act
			const calculations = generateCalculations('hard', 4)

			// Assert
			expect(calculations[0].operator).toBe('+')
			expect(calculations[1].operator).toBe('-')
			expect(calculations[2].operator).toBe('*')
			expect(calculations[3].operator).toBe('/')
		})

		it('should retrieve calculations that are distinct combinations of left-hand side operand, right-hand side operand and operator', () => {
			// Arrange
			jest
				.spyOn(Math, 'random')
				// First calculation
				.mockReturnValueOnce(0) // Left-hand side operand: 0
				.mockReturnValueOnce(0) // Right-hand side operand: 0
				.mockReturnValueOnce(0) // Operator: "+"
				// Second calculation
				.mockReturnValueOnce(0) // Left-hand side operand: 0
				.mockReturnValueOnce(0) // Right-hand side operand: 0
				.mockReturnValueOnce(0) // Operator: "+"

			const numberOfCalculations = 3

			// Act
			const calculations = generateCalculations('easy', numberOfCalculations)

			// Assert
			expect(
				[
					...new Set(
						calculations.map(
							(c) => `${c.leftHandSideOperand}${c.operator}${c.rightHandSideOperand}`,
						),
					),
				].length,
			).toBe(numberOfCalculations)
		})

		it('should not retrieve a division by zero or a division with remainder even if such combination gets randomly selected at the beginning', () => {
			// Arrange
			jest
				.spyOn(Math, 'random')
				// First calculation
				.mockReturnValueOnce(0) // Left-hand side operand: 0
				.mockReturnValueOnce(0) // Right-hand side operand: 0
				.mockReturnValueOnce(0.75) // Operator: "/"
				// Second calculation
				.mockReturnValueOnce(0.7) // Left-hand side operand: 7
				.mockReturnValueOnce(0.8) // Right-hand side operand: 8
				.mockReturnValueOnce(0.75) // Operator: "/"

			// Act
			const calculations = generateCalculations('hard', 2)

			// Assert
			expect(calculations[0].leftHandSideOperand).toBe(0)
			expect(calculations[0].rightHandSideOperand).toBe(1)
			expect(calculations[0].operator).toBe('/')

			expect(calculations[1].leftHandSideOperand).toBe(8)
			expect(calculations[1].rightHandSideOperand).toBe(8)
			expect(calculations[1].operator).toBe('/')
		})

		it('should retrieve subtractions that do not result in negative numbers even if such combination gets randomly selected at the beginning', () => {
			// Arrange
			jest
				.spyOn(Math, 'random')
				.mockReturnValueOnce(0.5) // Left-hand side operand: 5
				.mockReturnValueOnce(0.9) // Right-hand side operand: 9
				.mockReturnValueOnce(0.5) // Operator: "-"

			// Act
			const calculations = generateCalculations('medium', 1)

			// Assert
			expect(calculations[0].leftHandSideOperand).toBe(9)
			expect(calculations[0].rightHandSideOperand).toBe(5)
			expect(calculations[0].operator).toBe('-')
		})
	})

	describe('generateEmptyCalculationInputs', () => {
		it('should generate an object with as many keys as the default amount of calculations if no numberOfCalculations is specified', () => {
			// Act
			const calculationInputs = generateEmptyCalculationInputs()

			// Assert
			expect(calculationInputs).toEqual({
				1: '',
				2: '',
				3: '',
				4: '',
				5: '',
			})
		})

		it('should generate an object with the specified amount of numbered keys', () => {
			// Act
			const calculationInputs = generateEmptyCalculationInputs(1)

			// Assert
			expect(calculationInputs).toEqual({ 1: '' })
		})
	})
})
