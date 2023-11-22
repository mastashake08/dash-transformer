const assert = require('assert');
const main = require('..');

describe('dash-transformer', () => {
  it('returns with placeholder', () => {
    assert.equal(main(), 'dash-transformer');
  });
});
