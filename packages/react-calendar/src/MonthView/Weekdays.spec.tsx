import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

import Weekdays from './Weekdays.js';

describe('Weekdays', () => {
  const defaultProps = {
    calendarType: 'iso8601',
  } satisfies React.ComponentProps<typeof Weekdays>;

  it('renders proper weekdays (ISO 8601)', async () => {
    const { container } = await render(<Weekdays {...defaultProps} calendarType="iso8601" />);

    const weekdays = container.querySelectorAll('.react-calendar__month-view__weekdays__weekday');
    const [firstWeekday] = weekdays as unknown as [HTMLDivElement];
    const firstWeekdayAbbr = firstWeekday.querySelector('abbr');

    expect(weekdays).toHaveLength(7);
    expect(firstWeekday).toHaveTextContent('Mon');
    expect(firstWeekdayAbbr).toHaveAccessibleName('Monday');
  });

  it('renders proper weekdays (US)', async () => {
    const { container } = await render(<Weekdays {...defaultProps} calendarType="gregory" />);

    const weekdays = container.querySelectorAll('.react-calendar__month-view__weekdays__weekday');
    const [firstWeekday] = weekdays as unknown as [HTMLDivElement];
    const firstWeekdayAbbr = firstWeekday.querySelector('abbr');

    expect(weekdays).toHaveLength(7);
    expect(firstWeekday).toHaveTextContent('Sun');
    expect(firstWeekdayAbbr).toHaveAccessibleName('Sunday');
  });

  it('renders weekdays with custom weekdays formatting', async () => {
    const { container } = await render(
      <Weekdays {...defaultProps} formatShortWeekday={() => 'Wkdy'} />,
    );

    const firstWeekday = container.querySelector('.react-calendar__month-view__weekdays__weekday');

    expect(firstWeekday).toHaveTextContent('Wkdy');
  });

  it('renders weekdays with custom weekdays formatting', async () => {
    const { container } = await render(
      <Weekdays {...defaultProps} formatWeekday={() => 'Weekday'} />,
    );

    const firstWeekday = container.querySelector(
      '.react-calendar__month-view__weekdays__weekday',
    ) as HTMLDivElement;
    const firstWeekdayAbbr = firstWeekday.querySelector('abbr');

    expect(firstWeekdayAbbr).toHaveAccessibleName('Weekday');
  });
});
