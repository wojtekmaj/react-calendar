import React from 'react';
import { mount } from 'enzyme';

import Year from './Year';

/* eslint-disable jsx-a11y/mouse-events-have-key-events */

const tileProps = {
  activeStartDate: new Date(2018, 0, 1),
  classes: ['react-calendar__tile'],
  date: new Date(2018, 0, 1),
  point: 2018,
};

describe('Year', () => {
  it('applies given classNames properly', () => {
    const component = mount(
      <Year
        {...tileProps}
        classes={['react-calendar__tile', 'react-calendar__tile--flag']}
        tileClassName={() => 'testFunctionClassName'}
      />,
    );

    const wrapperClassName = component.find('.react-calendar__tile').prop('className');

    expect(wrapperClassName.includes('react-calendar__tile')).toBe(true);
    expect(wrapperClassName.includes('react-calendar__tile--flag')).toBe(true);
    expect(wrapperClassName.includes('react-calendar__decade-view__years__year')).toBe(true);
    expect(wrapperClassName.includes('testFunctionClassName')).toBe(true);
  });

  it('renders component without abbreviation', () => {
    const component = mount(
      <Year
        {...tileProps}
        date={new Date(2018, 0, 1)}
        year={2018}
      />,
    );

    const abbr = component.find('abbr');

    expect(abbr).toHaveLength(0);
    expect(component.text()).toBe('2018');
  });

  it('is disabled when date is before beginning of minDate\'s year', () => {
    const component = mount(
      <Year
        {...tileProps}
        date={new Date(2018, 0, 1)}
        minDate={new Date(2019, 0, 1)}
      />,
    );

    expect(component.find('.react-calendar__tile').prop('disabled')).toBeTruthy();
  });

  it('is not disabled when date is after beginning of minDate\'s year', () => {
    const component = mount(
      <Year
        {...tileProps}
        date={new Date(2018, 0, 1)}
        minDate={new Date(2018, 0, 1)}
      />,
    );

    expect(component.find('.react-calendar__tile').prop('disabled')).toBeFalsy();
  });

  it('is disabled when date is after end of maxDate\'s year', () => {
    const component = mount(
      <Year
        {...tileProps}
        date={new Date(2018, 0, 1)}
        maxDate={new Date(2017, 0, 1)}
      />,
    );

    expect(component.find('.react-calendar__tile').prop('disabled')).toBeTruthy();
  });

  it('is not disabled when date is before end of maxDate\'s year', () => {
    const component = mount(
      <Year
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
      <Year
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
      <Year
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
      <Year
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
      <Year
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
      <Year
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
      view: 'decade',
    });
    expect(testContent).toHaveLength(1);
  });

  it('uses formatYear if given', () => {
    const locale = 'en-US';
    const date = new Date(2018, 0, 1);
    const formatYear = jest.fn();
    formatYear.mockReturnValue('Mock format');

    const component = mount(
      <Year
        {...tileProps}
        date={date}
        formatYear={formatYear}
        locale={locale}
      />,
    );

    const tile = component.find('Tile');

    expect(formatYear).toHaveBeenCalled();
    expect(formatYear).toHaveBeenCalledWith(locale, date);
    expect(tile.text()).toBe('Mock format');
  });
});
