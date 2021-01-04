import chai from 'chai';
const {expect} = chai;

import { parseColor } from '../src/index.js';
import testCases from './cases.test.js';

describe('parseColor', function () {
	for (const model of ['rgb', 'hsl', 'hsv', 'hwb']) {
		const modelCases = testCases.filter(
			({ value: [, caseModel] }) => caseModel === model
		);
		it(`parses ${model} colors (${modelCases.length} cases)`, function () {
			for (const { input, value } of modelCases) {
				expect(parseColor(input)).to.deep.equal(value);
			}
		});
	}
	const invalidCases = testCases.filter(
		({ value: [, caseModel] }) => caseModel === null
	);
	it(`returns undefined for invalid colors (${invalidCases.length} cases)`, function () {
		for (const { input } of invalidCases) {
			expect(parseColor(input)).to.deep.equal([undefined, undefined]);
		}
	});
	it('throws an error if the argument is not a string', function () {
		expect(function () {
			parseColor(1);
		}).to.throw(TypeError, 'is not a string');
	});
});
