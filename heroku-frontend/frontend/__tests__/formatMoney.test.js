import formatMoney from '../lib/formatMoney';

describe('formatMoney function', () => {
  test('fractional dollar inputs----------', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(40)).toEqual('$0.40');
    expect(formatMoney(45.6)).toEqual('$0.46')
  })
  test('whole dollar inputs---------------', () => {
    expect(formatMoney(5000)).toEqual('$50');
    expect(formatMoney(100)).toEqual('$1');
    expect(formatMoney(5000000)).toEqual('$50,000');
  });
  test('whole and fractional dollar inputs', () => {
    expect(formatMoney(6789)).toEqual('$67.89');
    expect(formatMoney(101)).toEqual('$1.01');
  });
});