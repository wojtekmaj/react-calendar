import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WeekNumbers from '../WeekNumbers';

configure({ adapter: new Adapter() });

/* eslint-disable comma-dangle */

describe('WeekNumbers', () => {
  it('renders proper weekNumbers for a year that starts in week 1 (ISO 8601)', () => {
    const component = shallow(
      <WeekNumbers
        activeStartDate={new Date(2018, 0, 1)}
        calendarType="ISO 8601"
      />
    );

    const children = component.children();

    expect(children.length).toBe(5);
    expect(children.first().text()).toBe('1');
  });

  it('renders proper weekNumbers for a year that starts on week 52 (ISO 8601)', () => {
    const component = shallow(
      <WeekNumbers
        activeStartDate={new Date(2017, 0, 1)}
        calendarType="ISO 8601"
      />
    );

    const children = component.children();

    expect(children.length).toBe(6);
    expect(children.first().text()).toBe('52');
  });

  it('renders proper weekNumbers for a year that starts on week 53 (ISO 8601)', () => {
    const component = shallow(
      <WeekNumbers
        activeStartDate={new Date(2016, 0, 1)}
        calendarType="ISO 8601"
      />
    );

    const children = component.children();

    expect(children.length).toBe(5);
    expect(children.first().text()).toBe('53');
  });

  it('renders proper weekNumbers for a year that starts in week 1 (US)', () => {
    const component = shallow(
      <WeekNumbers
        activeStartDate={new Date(2017, 0, 1)}
        calendarType="US"
      />
    );

    const children = component.children();

    expect(children.length).toBe(5);
    expect(children.first().text()).toBe('1');
  });
});
