import {
  between,
  isValueWithinRange,
  isRangeWithinRange,
  doRangesOverlap,
  getTileClasses,
} from './utils';

describe('between', () => {
  it('returns value when value is within set boundaries', () => {
    const value = new Date(2017, 6, 1);
    const min = new Date(2017, 0, 1);
    const max = new Date(2017, 11, 1);
    const result = between(value, min, max);

    expect(result).toBe(value);
  });

  it('returns min when value is smaller than min', () => {
    const value = new Date(2017, 0, 1);
    const min = new Date(2017, 6, 1);
    const max = new Date(2017, 11, 1);
    const result = between(value, min, max);

    expect(result).toBe(min);
  });

  it('returns max when value is larger than max', () => {
    const value = new Date(2017, 11, 1);
    const min = new Date(2017, 0, 1);
    const max = new Date(2017, 6, 1);
    const result = between(value, min, max);

    expect(result).toBe(max);
  });

  it('returns value when min and max are not provided', () => {
    const value = new Date(2017, 6, 1);
    const result = between(value, null, undefined);

    expect(result).toBe(value);
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

describe('getTileClasses', () => {
  it('returns all flags set to false when given no value', () => {
    const result = getTileClasses();

    expect(result.includes('react-calendar__tile--active')).toBe(false);
    expect(result.includes('react-calendar__tile--hasActive')).toBe(false);
    expect(result.includes('react-calendar__tile--hover')).toBe(false);
  });

  it('throws an error when given date but not given dateType parameter ', () => {
    expect(
      () => getTileClasses({ date: new Date(2017, 0, 1) }),
    ).toThrow();
  });

  it('throws an error when given date and value but not given valueType parameter ', () => {
    expect(
      () => getTileClasses({
        date: new Date(2017, 0, 1),
        dateType: 'month',
        value: new Date(2017, 0, 1),
      }),
    ).toThrow();
  });

  it('returns active flag set to true when passed a value equal to date', () => {
    const result = getTileClasses({
      value: new Date(2017, 0, 1),
      valueType: 'month',
      date: new Date(2017, 0, 1),
      dateType: 'month',
    });

    expect(result.includes('react-calendar__tile--active')).toBe(true);
    expect(result.includes('react-calendar__tile--hasActive')).toBe(false);
    expect(result.includes('react-calendar__tile--hover')).toBe(false);
  });

  it('returns active flag set to true when passed a value array equal to date array', () => {
    const result = getTileClasses({
      value: [new Date(2017, 0, 1), new Date(2017, 0, 31)],
      date: [new Date(2017, 0, 1), new Date(2017, 0, 31)],
    });

    expect(result.includes('react-calendar__tile--active')).toBe(true);
    expect(result.includes('react-calendar__tile--hasActive')).toBe(false);
    expect(result.includes('react-calendar__tile--hover')).toBe(false);
  });

  it('returns hasActive flag set to true when passed a value covering date', () => {
    const result = getTileClasses({
      value: new Date(2017, 6, 1),
      valueType: 'month',
      date: new Date(2017, 0, 1),
      dateType: 'year',
    });

    expect(result.includes('react-calendar__tile--active')).toBe(false);
    expect(result.includes('react-calendar__tile--hasActive')).toBe(true);
    expect(result.includes('react-calendar__tile--hover')).toBe(false);
  });

  it('returns all flags set to false when given value completely unrelated to date', () => {
    const result = getTileClasses({
      value: new Date(2017, 6, 1),
      valueType: 'month',
      date: new Date(2016, 0, 1),
      dateType: 'month',
    });

    expect(result.includes('react-calendar__tile--active')).toBe(false);
    expect(result.includes('react-calendar__tile--hasActive')).toBe(false);
  });

  describe('range classes', () => {
    it('returns range flag set to true when passed a date within value array', () => {
      const result = getTileClasses({
        value: [new Date(2017, 0, 1), new Date(2017, 6, 1)],
        valueType: 'month',
        date: new Date(2017, 3, 1),
        dateType: 'month',
      });

      expect(result.includes('react-calendar__tile--range')).toBe(true);
      expect(result.includes('react-calendar__tile--rangeStart')).toBe(false);
      expect(result.includes('react-calendar__tile--rangeEnd')).toBe(false);
    });

    it('returns range & rangeStart flags set to true when passed a date equal to value start', () => {
      const result = getTileClasses({
        value: [new Date(2017, 0, 1), new Date(2017, 6, 1)],
        valueType: 'month',
        date: new Date(2017, 0, 1),
        dateType: 'month',
      });

      expect(result.includes('react-calendar__tile--range')).toBe(true);
      expect(result.includes('react-calendar__tile--rangeStart')).toBe(true);
      expect(result.includes('react-calendar__tile--rangeEnd')).toBe(false);
    });

    it('returns range & rangeEnd flags set to true when passed a date equal to value end', () => {
      const result = getTileClasses({
        value: [new Date(2017, 0, 1), new Date(2017, 6, 1)],
        valueType: 'month',
        date: new Date(2017, 6, 1),
        dateType: 'month',
      });

      expect(result.includes('react-calendar__tile--range')).toBe(true);
      expect(result.includes('react-calendar__tile--rangeStart')).toBe(false);
      expect(result.includes('react-calendar__tile--rangeEnd')).toBe(true);
    });
  });

  describe('hover classes', () => {
    it('returns hover flag set to true when passed a date between value and hover (1)', () => {
      const result = getTileClasses({
        value: new Date(2017, 6, 1),
        valueType: 'month',
        date: new Date(2017, 3, 1),
        dateType: 'month',
        hover: new Date(2017, 0, 1),
      });

      expect(result.includes('react-calendar__tile--hover')).toBe(true);
      expect(result.includes('react-calendar__tile--hoverStart')).toBe(false);
      expect(result.includes('react-calendar__tile--hoverEnd')).toBe(false);
    });

    it('returns hover flag set to true when passed a date between value and hover (2)', () => {
      const result = getTileClasses({
        value: new Date(2017, 0, 1),
        valueType: 'month',
        date: new Date(2017, 3, 1),
        dateType: 'month',
        hover: new Date(2017, 6, 1),
      });

      expect(result.includes('react-calendar__tile--hover')).toBe(true);
      expect(result.includes('react-calendar__tile--hoverStart')).toBe(false);
      expect(result.includes('react-calendar__tile--hoverEnd')).toBe(false);
    });

    it('returns hover & hoverStart flags set to true when passed a date equal to hover', () => {
      const result = getTileClasses({
        value: new Date(2017, 0, 1),
        valueType: 'month',
        date: new Date(2017, 0, 1),
        dateType: 'month',
        hover: new Date(2017, 6, 1),
      });

      expect(result.includes('react-calendar__tile--hover')).toBe(true);
      expect(result.includes('react-calendar__tile--hoverStart')).toBe(true);
      expect(result.includes('react-calendar__tile--hoverEnd')).toBe(false);
    });

    it('returns hover & hoverEnd flags set to true when passed a date equal to hover', () => {
      const result = getTileClasses({
        value: new Date(2017, 0, 1),
        valueType: 'month',
        date: new Date(2017, 6, 1),
        dateType: 'month',
        hover: new Date(2017, 6, 1),
      });

      expect(result.includes('react-calendar__tile--hover')).toBe(true);
      expect(result.includes('react-calendar__tile--hoverStart')).toBe(false);
      expect(result.includes('react-calendar__tile--hoverEnd')).toBe(true);
    });
  });
});
