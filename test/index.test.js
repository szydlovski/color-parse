const {expect} = require('chai');

const {parseColor} = require('../src');
const testCases = require('./cases.test.js');
console.log(testCases);

describe('parseColor', function() {
  for (const model of ['hex', 'rgb', 'hsl', 'hsv', 'hwb']) {
    const modelCases = testCases.filter(testCase => testCase.value.model === model);
    it(`parses ${model} colors (${modelCases.length} cases)`, function() {
      for (const {input, value} of modelCases) {
        expect(parseColor(input)).to.deep.equal(value);
      }
    })
  }
  const invalidCases = testCases.filter(testCase => testCase.value.model === undefined);
  it(`returns undefined for invalid colors (${invalidCases.length} cases)`, function() {
    for (const {input} of invalidCases) {
      expect(parseColor(input)).to.equal(undefined);
    }
  })
  it('throws an error if the argument is not a string', function() {
    expect(function() {
      parseColor(1)
    }).to.throw(TypeError, 'is not a string')
  })
})