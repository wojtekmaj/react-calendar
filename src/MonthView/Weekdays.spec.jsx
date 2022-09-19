import React from 'react';
import { render } from '@testing-library/react';

import Weekdays from './Weekdays';

describe('Weekdays', () => {
  const defaultProps = {
    calendarType: 'ISO 8601',
  };

  it('renders proper weekdays (ISO 8601)', () => {
    const { container } = render(<Weekdays {...defaultProps} calendarType="ISO 8601" />);

    const weekdays = container.querySelectorAll('.react-calendar__month-view__weekdays__weekday');
    const firstWeekday = weekdays[0];
    const firstWeekdayAbbr = firstWeekday.querySelector('abbr');

    expect(weekdays).toHaveLength(7);
    expect(firstWeekday).toHaveTextContent('Mon');
    expect(firstWeekdayAbbr).toHaveAccessibleName('Monday');
  });

  it('renders proper weekdays (US)', () => {
    const { container } = render(<Weekdays {...defaultProps} calendarType="US" />);

    const weekdays = container.querySelectorAll('.react-calendar__month-view__weekdays__weekday');
    const firstWeekday = weekdays[0];
    const firstWeekdayAbbr = firstWeekday.querySelector('abbr');

    expect(weekdays).toHaveLength(7);
    expect(firstWeekday).toHaveTextContent('Sun');
    expect(firstWeekdayAbbr).toHaveAccessibleName('Sunday');
  });

  it('renders weekdays with custom weekdays formatting', () => {
    const { container } = render(<Weekdays {...defaultProps} formatShortWeekday={() => 'Wkdy'} />);

    const weekdays = container.querySelectorAll('.react-calendar__month-view__weekdays__weekday');
    const firstWeekday = weekdays[0];

    expect(firstWeekday).toHaveTextContent('Wkdy');
  });

  it('renders weekdays with custom weekdays formatting', () => {
    const { container } = render(<Weekdays {...defaultProps} formatWeekday={() => 'Weekday'} />);

    const weekdays = container.querySelectorAll('.react-calendar__month-view__weekdays__weekday');
    const firstWeekday = weekdays[0];
    const abbr = firstWeekday.querySelector('abbr');

    expect(abbr).toHaveAccessibleName('Weekday');
  });
});
