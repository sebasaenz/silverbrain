import { generateCalculations } from '../calculator'

describe('calculator', () => {
	describe('generateCalculations', () => {
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
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0.7)

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
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0.25)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0.5)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0.75)

			// Act
			const calculations = generateCalculations('hard', 4)

			// Assert
			expect(calculations[0].operator).toBe('+')
			expect(calculations[1].operator).toBe('-')
			expect(calculations[2].operator).toBe('*')
			expect(calculations[3].operator).toBe('/')
		})

		it('should retrieve calculations where the combination of left-hand side operand, right-hand side operand and operator is distinct', () => {
			// Arrange
			jest
				.spyOn(Math, 'random')
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(0)

			const numberOfCalculations = 3

			// Act
			const calculations = generateCalculations('hard', numberOfCalculations)

			// Assert
			expect(
				[
					...new Set(
						calculations.map(
							(c) =>
								`${c.leftHandSideOperand}${c.operator}${c.rightHandSideOperand}`,
						),
					),
				].length,
			).toBe(numberOfCalculations)
		})
	})
})
