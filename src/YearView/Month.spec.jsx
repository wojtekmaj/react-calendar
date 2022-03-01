import React from 'react';
import { mount } from 'enzyme';

import Month from './Month';

const tileProps = {
  activeStartDate: new Date(2018, 0, 1),
  classes: ['react-calendar__tile'],
  date: new Date(2018, 0, 1),
};

describe('Month', () => {
  it('applies given classNames properly', () => {
    const component = mount(
      <Month
        {...tileProps}
        classes={['react-calendar__tile', 'react-calendar__tile--flag']}
        tileClassName={() => 'testFunctionClassName'}
      />,
    );

    const wrapperClassName = component.find('.react-calendar__tile').prop('className');

    expect(wrapperClassName.includes('react-calendar__tile')).toBe(true);
    expect(wrapperClassName.includes('react-calendar__tile--flag')).toBe(true);
    expect(wrapperClassName.includes('react-calendar__year-view__months__month')).toBe(true);
    expect(wrapperClassName.includes('testFunctionClassName')).toBe(true);
  });

  it('renders component with proper abbreviation', () => {
    const component = mount(<Month {...tileProps} date={new Date(2018, 0, 1)} month={2018} />);

    const abbr = component.find('abbr');

    expect(abbr).toHaveLength(1);
    expect(abbr.prop('aria-label')).toBe('January 2018');
    expect(component.text()).toBe('January');
  });

  it("is disabled when date is before beginning of minDate's month", () => {
    const component = mount(
      <Month {...tileProps} date={new Date(2018, 6, 1)} minDate={new Date(2018, 7, 1)} />,
    );

    expect(component.find('.react-calendar__tile').prop('disabled')).toBeTruthy();
  });

  it("is not disabled when date is after beginning of minDate's month", () => {
    const component = mount(
      <Month {...tileProps} date={new Date(2018, 0, 1)} minDate={new Date(2018, 0, 1)} />,
    );

    expect(component.find('.react-calendar__tile').prop('disabled')).toBeFalsy();
  });

  it("is disabled when date is after end of maxDate's month", () => {
    const component = mount(
      <Month {...tileProps} date={new Date(2018, 6, 1)} maxDate={new Date(2018, 5, 1)} />,
    );

    expect(component.find('.react-calendar__tile').prop('disabled')).toBeTruthy();
  });

  it("is not disabled when date is before end of maxDate's month", () => {
    const component = mount(
      <Month {...tileProps} date={new Date(2018, 0, 1)} maxDate={new Date(2018, 0, 1)} />,
    );

    expect(component.find('.react-calendar__tile').prop('disabled')).toBeFalsy();
  });

  it('calls onClick callback when clicked and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onClick = jest.fn();

    const component = mount(<Month {...tileProps} date={date} onClick={onClick} />);

    component.find('.react-calendar__tile').simulate('click');

    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledWith(date, expect.any(Object));
  });

  it('calls onMouseOver callback when hovered and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onMouseOver = jest.fn();

    const component = mount(<Month {...tileProps} date={date} onMouseOver={onMouseOver} />);

    component.find('.react-calendar__tile').simulate('mouseOver');

    expect(onMouseOver).toHaveBeenCalled();
    expect(onMouseOver).toHaveBeenCalledWith(date);
  });

  it('calls onMouseOver callback when focused and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onMouseOver = jest.fn();

    const component = mount(<Month {...tileProps} date={date} onMouseOver={onMouseOver} />);

    component.find('.react-calendar__tile').simulate('focus');

    expect(onMouseOver).toHaveBeenCalled();
    expect(onMouseOver).toHaveBeenCalledWith(date);
  });

  it('renders tileContent properly', () => {
    const component = mount(<Month {...tileProps} tileContent={<div className="testContent" />} />);

    const testContent = component.find('.testContent');

    expect(testContent).toHaveLength(1);
  });

  it('renders tileContent function result properly and sends proper arguments to it', () => {
    const date = new Date(2018, 0, 1);
    const tileContent = jest.fn();
    tileContent.mockReturnValue(<div className="testContent" />);

    const component = mount(<Month {...tileProps} date={date} tileContent={tileContent} />);

    const testContent = component.find('.testContent');

    expect(tileContent).toHaveBeenCalled();
    expect(tileContent).toHaveBeenCalledWith({
      activeStartDate: tileProps.activeStartDate,
      date,
      view: 'year',
    });
    expect(testContent).toHaveLength(1);
  });

  it('uses formatMonth if given', () => {
    const locale = 'en-US';
    const date = new Date(2018, 0, 1);
    const formatMonth = jest.fn();
    formatMonth.mockReturnValue('Mock format');

    const component = mount(
      <Month {...tileProps} date={date} formatMonth={formatMonth} locale={locale} />,
    );

    const tile = component.find('Tile');

    expect(formatMonth).toHaveBeenCalled();
    expect(formatMonth).toHaveBeenCalledWith(locale, date);
    expect(tile.text()).toBe('Mock format');
  });

  it('uses formatMonthYear if given', () => {
    const locale = 'en-US';
    const date = new Date(2018, 0, 1);
    const formatMonthYear = jest.fn();
    formatMonthYear.mockReturnValue('Mock format');

    const component = mount(
      <Month {...tileProps} date={date} formatMonthYear={formatMonthYear} locale={locale} />,
    );

    const abbr = component.find('abbr');

    expect(formatMonthYear).toHaveBeenCalled();
    expect(formatMonthYear).toHaveBeenCalledWith(locale, date);
    expect(abbr.prop('aria-label')).toBe('Mock format');
  });
});
