import React from 'react';
import { mount } from 'enzyme';

import WeekNumbers from '../WeekNumbers';

/* eslint-disable comma-dangle */

describe('WeekNumbers', () => {
  it('renders proper weekNumbers for a year that starts on Monday (ISO 8601)', () => {
    const component = mount(
      <WeekNumbers
        activeStartDate={new Date(2007, 0, 1)}
        calendarType="ISO 8601"
      />
    );

    const children = component.children();

    expect(children).toHaveLength(5);
    expect(children.first().text()).toBe('1');
  });

  it('renders proper weekNumbers for a year that starts on Sunday (US)', () => {
    const component = mount(
      <WeekNumbers
        activeStartDate={new Date(2017, 0, 1)}
        calendarType="US"
      />
    );

    const children = component.children();

    expect(children).toHaveLength(5);
    expect(children.first().text()).toBe('1');
  });

  it('renders proper weekNumbers for a year that does not start on Monday (ISO 8601)', () => {
    const component = mount(
      <WeekNumbers
        activeStartDate={new Date(2017, 0, 1)}
        calendarType="ISO 8601"
      />
    );

    const children = component.children();

    expect(children).toHaveLength(6);
    expect(children.first().text()).toBe('52');
  });

  it('renders proper weekNumbers for a year that does not start on Sunday (US)', () => {
    const component = mount(
      <WeekNumbers
        activeStartDate={new Date(2016, 0, 1)}
        calendarType="US"
      />
    );

    const children = component.children();

    expect(children).toHaveLength(6);
    expect(children.first().text()).toBe('52');
  });
});
