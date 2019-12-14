import React from 'react';
import { mount } from 'enzyme';

import Day from './Day';

/* eslint-disable jsx-a11y/mouse-events-have-key-events */

const tileProps = {
  activeStartDate: new Date(2018, 0, 1),
  classes: ['react-calendar__tile'],
  currentMonthIndex: 0,
  date: new Date(2018, 0, 1),
};

describe('Day', () => {
  it('applies given classNames properly', () => {
    const component = mount(
      <Day
        {...tileProps}
        classes={['react-calendar__tile', 'react-calendar__tile--flag']}
        tileClassName={() => 'testFunctionClassName'}
      />,
    );

    const wrapperClassName = component.find('.react-calendar__tile').prop('className');

    expect(wrapperClassName.includes('react-calendar__tile')).toBe(true);
    expect(wrapperClassName.includes('react-calendar__tile--flag')).toBe(true);
    expect(wrapperClassName.includes('react-calendar__month-view__days__day')).toBe(true);
    expect(wrapperClassName.includes('testFunctionClassName')).toBe(true);
  });

  it('applies additional classNames for weekends', () => {
    const component = mount(
      <Day
        {...tileProps}
        date={new Date(2018, 0, 6)} // Saturday
      />,
    );

    const wrapperClassName = component.find('.react-calendar__tile').prop('className');

    expect(wrapperClassName.includes('react-calendar__month-view__days__day--weekend')).toBe(true);
  });

  it('applies additional classNames for neighboring months', () => {
    const component = mount(
      <Day
        {...tileProps}
        date={new Date(2018, 1, 2)}
      />,
    );

    const wrapperClassName = component.find('.react-calendar__tile').prop('className');

    expect(wrapperClassName.includes('react-calendar__month-view__days__day--neighboringMonth')).toBe(true);
  });

  it('renders component with proper abbreviation', () => {
    const component = mount(
      <Day
        {...tileProps}
        date={new Date(2018, 0, 1)}
      />,
    );

    const abbr = component.find('abbr');

    expect(abbr).toHaveLength(1);
    expect(abbr.prop('aria-label')).toBe('January 1, 2018');
    expect(component.text()).toBe('1');
  });

  it('is disabled when date is before beginning of minDate\'s day', () => {
    const component = mount(
      <Day
        {...tileProps}
        date={new Date(2018, 0, 1)}
        minDate={new Date(2018, 0, 2)}
      />,
    );

    expect(component.find('.react-calendar__tile').prop('disabled')).toBeTruthy();
  });

  it('is not disabled when date is after beginning of minDate\'s day', () => {
    const component = mount(
      <Day
        {...tileProps}
        date={new Date(2018, 0, 1)}
        minDate={new Date(2018, 0, 1)}
      />,
    );

    expect(component.find('.react-calendar__tile').prop('disabled')).toBeFalsy();
  });

  it('is disabled when date is after end of maxDate\'s day', () => {
    const component = mount(
      <Day
        {...tileProps}
        date={new Date(2018, 0, 2)}
        maxDate={new Date(2018, 0, 1)}
      />,
    );

    expect(component.find('.react-calendar__tile').prop('disabled')).toBeTruthy();
  });

  it('is not disabled when date is before end of maxDate\'s day', () => {
    const component = mount(
      <Day
        {...tileProps}
        date={new Date(2018, 0, 1)}
        maxDate={new Date(2018, 0, 1)}
      />,
    );

    expect(component.find('.react-calendar__tile').prop('disabled')).toBeFalsy();
  });

  it('calls onClick callback when clicked and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onClick = jest.fn();

    const component = mount(
      <Day
        {...tileProps}
        date={date}
        onClick={onClick}
      />,
    );

    component.find('.react-calendar__tile').simulate('click');

    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledWith(date, expect.any(Object));
  });

  it('calls onMouseOver callback when hovered and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onMouseOver = jest.fn();

    const component = mount(
      <Day
        {...tileProps}
        date={date}
        onMouseOver={onMouseOver}
      />,
    );

    component.find('.react-calendar__tile').simulate('mouseOver');

    expect(onMouseOver).toHaveBeenCalled();
    expect(onMouseOver).toHaveBeenCalledWith(date);
  });

  it('calls onMouseOver callback when focused and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onMouseOver = jest.fn();

    const component = mount(
      <Day
        {...tileProps}
        date={date}
        onMouseOver={onMouseOver}
      />,
    );

    component.find('.react-calendar__tile').simulate('focus');

    expect(onMouseOver).toHaveBeenCalled();
    expect(onMouseOver).toHaveBeenCalledWith(date);
  });

  it('renders tileContent properly', () => {
    const component = mount(
      <Day
        {...tileProps}
        tileContent={<div className="testContent" />}
      />,
    );

    const testContent = component.find('.testContent');

    expect(testContent).toHaveLength(1);
  });

  it('renders tileContent function result properly and sends proper arguments to it', () => {
    const date = new Date(2018, 0, 1);
    const tileContent = jest.fn();
    tileContent.mockReturnValue(<div className="testContent" />);

    const component = mount(
      <Day
        {...tileProps}
        date={date}
        tileContent={tileContent}
      />,
    );

    const testContent = component.find('.testContent');

    expect(tileContent).toHaveBeenCalled();
    expect(tileContent).toHaveBeenCalledWith({
      activeStartDate: tileProps.activeStartDate,
      date,
      view: 'month',
    });
    expect(testContent).toHaveLength(1);
  });

  it('uses formatLongDate if given', () => {
    const locale = 'en-US';
    const date = new Date(2018, 0, 1);
    const formatLongDate = jest.fn();
    formatLongDate.mockReturnValue('Mock format');

    const component = mount(
      <Day
        {...tileProps}
        date={date}
        formatLongDate={formatLongDate}
        locale={locale}
      />,
    );

    const abbr = component.find('abbr');

    expect(formatLongDate).toHaveBeenCalled();
    expect(formatLongDate).toHaveBeenCalledWith(locale, date);
    expect(abbr.prop('aria-label')).toBe('Mock format');
  });
});
