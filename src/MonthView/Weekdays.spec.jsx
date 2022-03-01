import React from 'react';
import { mount } from 'enzyme';

import Weekdays from './Weekdays';

describe('Weekdays', () => {
  const defaultProps = {
    calendarType: 'ISO 8601',
  };

  it('renders proper weekdays (ISO 8601)', () => {
    const component = mount(<Weekdays {...defaultProps} calendarType="ISO 8601" />);

    const weekdays = component.find('.react-calendar__month-view__weekdays__weekday');
    const firstWeekday = weekdays.first();
    const firstWeekdayAbbr = firstWeekday.find('abbr');

    expect(weekdays).toHaveLength(7);
    expect(firstWeekday.text()).toBe('Mon');
    expect(firstWeekdayAbbr.prop('aria-label')).toBe('Monday');
  });

  it('renders proper weekdays (US)', () => {
    const component = mount(<Weekdays {...defaultProps} calendarType="US" />);

    const weekdays = component.find('.react-calendar__month-view__weekdays__weekday');
    const firstWeekday = weekdays.first();
    const firstWeekdayAbbr = firstWeekday.find('abbr');

    expect(weekdays).toHaveLength(7);
    expect(firstWeekday.text()).toBe('Sun');
    expect(firstWeekdayAbbr.prop('aria-label')).toBe('Sunday');
  });

  it('renders weekdays with custom weekdays formatting', () => {
    const component = mount(<Weekdays {...defaultProps} formatShortWeekday={() => 'Weekday'} />);

    const weekdays = component.find('.react-calendar__month-view__weekdays__weekday');
    const firstWeekday = weekdays.first();

    expect(firstWeekday.text()).toBe('Weekday');
  });
});
