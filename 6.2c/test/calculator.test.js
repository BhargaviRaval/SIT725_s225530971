const { expect } = require('chai');
const { add } = require('../utils/calculator');

describe('Calculator - add function', () => {

  it('should add two positive numbers', () => {
    expect(add(2, 3)).to.equal(5);
  });

  it('should handle negative numbers', () => {
    expect(add(-2, -3)).to.equal(-5);
  });

});
