import React from 'react';
import { mount } from 'enzyme';

import Days from '../Days';

/* eslint-disable comma-dangle */

describe('Days', () => {
  it('renders proper days', () => {
    const component = mount(
      <Days
        activeStartDate={new Date(2019, 7, 1)}
        calendarType="ISO 8601"
        showNeighboringMonth={false}
      />
    );

    const days = component.find('.react-calendar__tile');
    const firstDay = days.first();

    expect(days).toHaveLength(31);
    expect(firstDay.prop('style')).toHaveProperty('marginLeft');
  });

  it('should render days in ltr mode', () => {
    const component = mount(
      <Days
        activeStartDate={new Date(2019, 7, 1)}
        calendarType="ISO 8601"
        showNeighboringMonth={false}
      />
    );

    const days = component.find('.react-calendar__tile');
    const firstDay = days.first();

    expect(firstDay.prop('style')).toHaveProperty('marginLeft');
  });

  describe('right-to-left support', () => {
    it('should render days in rtl mode', () => {
      const component = mount(
        <Days
          activeStartDate={new Date(2019, 7, 1)}
          calendarType="Hebrew"
          showNeighboringMonth={false}
        />
      );

      const days = component.find('.react-calendar__tile');
      const firstDay = days.first();

      expect(firstDay.prop('style')).toHaveProperty('marginRight');
    });
  });
});
