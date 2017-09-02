import {
  mergeFunctions,
  isValueWithinRange,
  isRangeWithinRange,
  doRangesOverlap,
  getTileActivityFlags,
} from '../utils';

describe('mergeFunctions', () => {
  it('returns a function when called', () => {
    const testFunction1 = jest.fn();
    const testFunction2 = jest.fn();

    const mergedFunctions = mergeFunctions(testFunction1, testFunction2);

    expect(mergedFunctions).toBeInstanceOf(Function);
  });

  it('calls all functions passed to it upon creation of a merged function exactly once', () => {
    const testFunction1 = jest.fn();
    const testFunction2 = jest.fn();

    const mergedFunctions = mergeFunctions(testFunction1, testFunction2);

    mergedFunctions();

    expect(testFunction1).toHaveBeenCalledTimes(1);
    expect(testFunction2).toHaveBeenCalledTimes(1);
  });

  it('passes the same arguments to all functions passed to it upon creation of a merged function', () => {
    const arg1 = 'hello';
    const arg2 = null;
    const arg3 = 42;

    const testFunction1 = jest.fn();
    const testFunction2 = jest.fn();

    const mergedFunctions = mergeFunctions(testFunction1, testFunction2);

    mergedFunctions(arg1, arg2, arg3);

    expect(testFunction1).toHaveBeenCalledWith(arg1, arg2, arg3);
    expect(testFunction2).toHaveBeenCalledWith(arg1, arg2, arg3);
  });
});

describe('isValueWithinRange', () => {
  it('returns true for a value between range bonduaries', () => {
    const value = new Date(2017, 6, 1);
    const range = [new Date(2017, 0, 1), new Date(2018, 0, 1)];

    const valueWithin = isValueWithinRange(value, range);

    expect(valueWithin).toBe(true);
  });

  it('returns true for a value on the first range bonduary', () => {
    const value = new Date(2017, 0, 1);
    const range = [new Date(2017, 0, 1), new Date(2018, 0, 1)];

    const valueWithin = isValueWithinRange(value, range);

    expect(valueWithin).toBe(true);
  });

  it('returns true for a value on the last range bonduary', () => {
    const value = new Date(2018, 0, 1);
    const range = [new Date(2017, 0, 1), new Date(2018, 0, 1)];

    const valueWithin = isValueWithinRange(value, range);

    expect(valueWithin).toBe(true);
  });

  it('returns true for a value smaller than both range bonduaries', () => {
    const value = new Date(2016, 0, 1);
    const range = [new Date(2017, 0, 1), new Date(2018, 0, 1)];

    const valueWithin = isValueWithinRange(value, range);

    expect(valueWithin).toBe(false);
  });

  it('returns true for a value larger than both range bonduaries', () => {
    const value = new Date(2019, 0, 1);
    const range = [new Date(2017, 0, 1), new Date(2018, 0, 1)];

    const valueWithin = isValueWithinRange(value, range);

    expect(valueWithin).toBe(false);
  });
});

describe('isRangeWithinRange', () => {
  it('returns true for range fitting within another range', () => {
    const greaterRange = [new Date(2011, 0, 1), new Date(2020, 0, 1)];
    const smallerRange = [new Date(2016, 0, 1), new Date(2017, 0, 1)];

    const rangeWithin = isRangeWithinRange(greaterRange, smallerRange);

    expect(rangeWithin).toBe(true);
  });

  it('returns true for a range identical with another range', () => {
    const greaterRange = [new Date(2016, 0, 1), new Date(2017, 0, 1)];
    const smallerRange = [new Date(2016, 0, 1), new Date(2017, 0, 1)];

    const rangeWithin = isRangeWithinRange(greaterRange, smallerRange);

    expect(rangeWithin).toBe(true);
  });

  it('returns false for a range that starts outside of another range', () => {
    const greaterRange = [new Date(2011, 0, 1), new Date(2020, 0, 1)];
    const smallerRange = [new Date(2010, 0, 1), new Date(2017, 0, 1)];

    const rangeWithin = isRangeWithinRange(greaterRange, smallerRange);

    expect(rangeWithin).toBe(false);
  });

  it('returns false for a range that ends outside of another range', () => {
    const greaterRange = [new Date(2011, 0, 1), new Date(2020, 0, 1)];
    const smallerRange = [new Date(2016, 0, 1), new Date(2021, 0, 1)];

    const rangeWithin = isRangeWithinRange(greaterRange, smallerRange);

    expect(rangeWithin).toBe(false);
  });
});

describe('doRangesOverlap', () => {
  it('returns true for overlapping ranges', () => {
    const range1 = [new Date(2016, 0, 1), new Date(2017, 0, 1)];
    const range2 = [new Date(2016, 6, 1), new Date(2017, 6, 1)];

    const rangesOverlap = doRangesOverlap(range1, range2);
    const rangesOverlapReversed = doRangesOverlap(range2, range1);

    expect(rangesOverlap).toBe(true);
    expect(rangesOverlapReversed).toBe(true);
  });

  it('returns true for touching ranges', () => {
    const range1 = [new Date(2016, 0, 1), new Date(2017, 0, 1)];
    const range2 = [new Date(2017, 0, 1), new Date(2018, 0, 1)];

    const rangesOverlap = doRangesOverlap(range1, range2);
    const rangesOverlapReversed = doRangesOverlap(range2, range1);

    expect(rangesOverlap).toBe(true);
    expect(rangesOverlapReversed).toBe(true);
  });

  it('returns false for ranges that do not overlap', () => {
    const range1 = [new Date(2006, 0, 1), new Date(2007, 0, 1)];
    const range2 = [new Date(2016, 0, 1), new Date(2017, 0, 1)];

    const rangesOverlap = doRangesOverlap(range1, range2);
    const rangesOverlapReversed = doRangesOverlap(range2, range1);

    expect(rangesOverlap).toBe(false);
    expect(rangesOverlapReversed).toBe(false);
  });
});

describe('getTileActivityFlags', () => {
  it('returns all flags set to false when given no value', () => {
    const result = getTileActivityFlags();

    expect(result.active).toBe(false);
    expect(result.hasActive).toBe(false);
  });

  it('throws an error when given value but not given other parameters ', () => {
    expect(
      () => getTileActivityFlags(new Date(2017, 0, 1)),
    ).toThrow();
  });

  it('returns active flag set to true when passed a value equal to date', () => {
    const result = getTileActivityFlags(
      new Date(2017, 0, 1), 'month', new Date(2017, 0, 1), 'month',
    );

    expect(result.active).toBe(true);
    expect(result.hasActive).toBe(false);
  });

  it('returns active flag set to true when passed a value array equal to date array', () => {
    const result = getTileActivityFlags(
      [new Date(2017, 0, 1), new Date(2017, 0, 31)],
      undefined,
      [new Date(2017, 0, 1), new Date(2017, 0, 31)],
      undefined,
    );

    expect(result.active).toBe(true);
    expect(result.hasActive).toBe(false);
  });

  it('returns hasActive flag set to true when passed a value covering date', () => {
    const result = getTileActivityFlags(
      new Date(2017, 6, 1), 'month', new Date(2017, 0, 1), 'year',
    );

    expect(result.active).toBe(false);
    expect(result.hasActive).toBe(true);
  });

  it('returns all flags set to false when given value completely unrelated to date', () => {
    const result = getTileActivityFlags(
      new Date(2017, 6, 1), 'month', new Date(2016, 0, 1), 'month',
    );

    expect(result.active).toBe(false);
    expect(result.hasActive).toBe(false);
  });
});
