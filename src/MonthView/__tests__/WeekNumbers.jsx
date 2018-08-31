import React from 'react';
import { mount } from 'enzyme';

import WeekNumbers from '../WeekNumbers';

/* eslint-disable comma-dangle */

describe('WeekNumbers', () => {
  it('renders proper weekNumbers for a year that starts in week 1 (ISO 8601)', () => {
    const component = mount(
      <WeekNumbers
        activeStartDate={new Date(2018, 0, 1)}
        calendarType="ISO 8601"
      />
    );

    const weekNumbers = component.find('WeekNumber');

    expect(weekNumbers).toHaveLength(5);
    expect(weekNumbers.first().text()).toBe('1');
  });

  it('renders proper weekNumbers for a year that starts on week 52 (ISO 8601)', () => {
    const component = mount(
      <WeekNumbers
        activeStartDate={new Date(2017, 0, 1)}
        calendarType="ISO 8601"
      />
    );

    const weekNumbers = component.find('WeekNumber');

    expect(weekNumbers).toHaveLength(6);
    expect(weekNumbers.first().text()).toBe('52');
  });

  it('renders proper weekNumbers for a year that starts on week 53 (ISO 8601)', () => {
    const component = mount(
      <WeekNumbers
        activeStartDate={new Date(2016, 0, 1)}
        calendarType="ISO 8601"
      />
    );

    const weekNumbers = component.find('WeekNumber');

    expect(weekNumbers).toHaveLength(5);
    expect(weekNumbers.first().text()).toBe('53');
  });

  it('renders proper weekNumbers for a year that starts in week 1 (US)', () => {
    const component = mount(
      <WeekNumbers
        activeStartDate={new Date(2017, 0, 1)}
        calendarType="US"
      />
    );

    const weekNumbers = component.find('WeekNumber');

    expect(weekNumbers).toHaveLength(5);
    expect(weekNumbers.first().text()).toBe('1');
  });

  it('renders proper weekNumbers given showFixedNumberOfWeeks flag', () => {
    // Same config as in first test which gives 5 weeks, except for the flag
    const component = mount(
      <WeekNumbers
        activeStartDate={new Date(2018, 0, 1)}
        calendarType="ISO 8601"
        showFixedNumberOfWeeks
      />
    );

    const weekNumbers = component.find('WeekNumber');

    expect(weekNumbers).toHaveLength(6);
    expect(weekNumbers.first().text()).toBe('1');
  });

  it('renders static divs as children when not given onClickWeekNumber', () => {
    const component = mount(
      <WeekNumbers
        activeStartDate={new Date(2017, 0, 1)}
        calendarType="ISO 8601"
      />
    );

    const children = component.find('div.react-calendar__tile');

    expect(children).toHaveLength(6);
  });

  it('renders buttons as children when given onClickWeekNumber', () => {
    const component = mount(
      <WeekNumbers
        activeStartDate={new Date(2017, 0, 1)}
        calendarType="ISO 8601"
        onClickWeekNumber={jest.fn()}
      />
    );

    const children = component.find('button.react-calendar__tile');

    expect(children).toHaveLength(6);
  });

  it('calls onClickWeekNumber function with proper arguments when clicked a week number (ISO 8601)', () => {
    const onClickWeekNumber = jest.fn();
    const component = mount(
      <WeekNumbers
        activeStartDate={new Date(2017, 0, 1)}
        calendarType="ISO 8601"
        onClickWeekNumber={onClickWeekNumber}
      />
    );

    const children = component.find('button.react-calendar__tile');

    children.first().simulate('click');
    expect(onClickWeekNumber).toHaveBeenCalledWith(52, new Date(2016, 11, 26));
  });

  it('calls onClickWeekNumber function with proper arguments when clicked a week number (US)', () => {
    const onClickWeekNumber = jest.fn();
    const component = mount(
      <WeekNumbers
        activeStartDate={new Date(2017, 0, 1)}
        calendarType="US"
        onClickWeekNumber={onClickWeekNumber}
      />
    );

    const children = component.find('button.react-calendar__tile');

    children.first().simulate('click');
    expect(onClickWeekNumber).toHaveBeenCalledWith(1, new Date(2017, 0, 1));
  });
});
