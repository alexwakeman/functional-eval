import { Lazy } from '../lazy.class';
import { isEqual } from 'lodash';

describe('Lazy', () => {
	describe('add', () => {
		let computation: Lazy;
		beforeEach(() => {
			computation = new Lazy();
		});
		it('should return the Lazy instance to chain method calls', () => {
			const lazyInst = computation.add(() => {});
			expect(lazyInst.add).toBeDefined();
		});
	});

	describe('evaluate', () => {
		let computation: Lazy;
		const timesTwo = (a: number) =>  a * 2;
		const plus = (a: number, b: number) => a + b;
		beforeEach(() => {
			computation = new Lazy();
		});
		it('should apply a given function to data', () => {
			const result = computation
				.add(timesTwo)
				.evaluate([1, 2, 3]);
			expect(isEqual(result, [2, 4, 6])).toBe(true);
		});
		it('should apply a series of functions', () => {
			const result = computation
                .add(timesTwo)
                .add(timesTwo)
                .evaluate([1, 2, 3]);
			expect(isEqual(result, [4, 8, 12])).toBe(true);
		});
		it('should apply a series of functions to data with specified arguments', () => {
			const result = computation
                .add(timesTwo)
                .add(plus, 1)
                .evaluate([1, 2, 3]);
			expect(isEqual(result, [3, 5, 7])).toBe(true);
		});
		it('should handle passing Math.sqrt as process function', () => {
			const result = computation
                .add(timesTwo)
                .add(plus, 1)
                .add(Math.sqrt)
                .evaluate([1, 2, 3]);
			expect(isEqual(result, [Math.sqrt(3), Math.sqrt(5), Math.sqrt(7)])).toBe(true);
		});
		it('should throw if the arguments to an added function are missing', () => {
			computation
                .add(timesTwo)
                .add(plus)
                .evaluate([1, 2, 3]);
			expect(computation.evaluate).toThrow();
		});
	});
});