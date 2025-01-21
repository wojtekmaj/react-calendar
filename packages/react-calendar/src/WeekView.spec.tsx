import { describe, expect, it } from 'vitest';

import { render } from '@testing-library/react';

import WeekView from './WeekView.js';
import { formatShortWeekday } from './shared/dateFormatter.js';

const { format } = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

describe('WeekView', () => {
  const defaultProps = {
    activeStartDate: new Date(2017, 0, 1),
    valueType: 'day',
  } satisfies React.ComponentProps<typeof WeekView>;

  it('renders proper view when given activeStartDate', () => {
    const activeStartDate = new Date(2017, 0, 1);

    const { container } = render(
      <WeekView
        {...defaultProps}
        activeStartDate={activeStartDate}
      />,
    );

    const firstDayTile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
    const firstDayTileTimeAbbr = firstDayTile.querySelector('abbr');

    expect(firstDayTileTimeAbbr).toHaveAccessibleName(format(activeStartDate));
  });

  it('applies tileClassName to its tiles when given a string', () => {
    const tileClassName = 'testClassName';

    const { container } = render(
      <WeekView {...defaultProps} tileClassName={tileClassName} />,
    );

    const firstDayTile = container.querySelector('.react-calendar__tile');

    expect(firstDayTile).toHaveClass(tileClassName);
  });

  it('applies tileClassName to its tiles conditionally when given a function that returns a string', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const tileClassNameFn = ({ date }: { date: Date }) => {
      if (date.getTime() === activeStartDate.getTime()) {
        return 'firstDayOfTheMonth';
      }

      return null;
    };

    const { container } = render(
      <WeekView
        {...defaultProps}
        activeStartDate={activeStartDate}
        tileClassName={tileClassNameFn}
      />,
    );

    const tiles = container.querySelectorAll('.react-calendar__tile');

    const firstDayTile = tiles[0];
    const secondDayTile = tiles[1];

    expect(firstDayTile).toHaveClass('firstDayOfTheMonth');
    expect(secondDayTile).not.toHaveClass('firstDayOfTheMonth');
  });

  it('renders tileContent in its tiles when given a node', () => {
    const tileContent = <div className="testContent" />;

    const { container } = render(
      <WeekView {...defaultProps} tileContent={tileContent} />,
    );

    const firstDayTile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
    const firstDayTileContent = firstDayTile.querySelector('.testContent');

    expect(firstDayTileContent).toBeInTheDocument();
  });

  it('renders tileContent in its tiles conditionally when given a function that returns a node', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const tileContentFn = ({ date }: { date: Date }) => {
      if (date.getTime() === activeStartDate.getTime()) {
        return <div className="testContent" />;
      }

      return null;
    };

    const { container } = render(
      <WeekView
        {...defaultProps}
        activeStartDate={activeStartDate}
        tileContent={tileContentFn}
      />,
    );

    const tiles = container.querySelectorAll('.react-calendar__tile');

    const firstDayTile = tiles[0] as HTMLDivElement;
    const secondDayTile = tiles[1] as HTMLDivElement;

    const firstDayTileContent = firstDayTile.querySelector('.testContent');
    const secondDayTileContent = secondDayTile.querySelector('.testContent');

    expect(firstDayTileContent).toBeInTheDocument();
    expect(secondDayTileContent).not.toBeInTheDocument();
  });

  it('does not render WeekNumbers component by default', () => {
    const { container } = render(<WeekView {...defaultProps} />);

    const weekNumbers = container.querySelector('.react-calendar__month-view__weekNumbers');

    expect(weekNumbers).not.toBeInTheDocument();
  });

  it('renders WeekNumbers component by given showWeekNumbers flag', () => {
    const { container } = render(<WeekView {...defaultProps} showWeekNumbers />);

    const weekNumbers = container.querySelector('.react-calendar__month-view__weekNumbers');

    expect(weekNumbers).toBeInTheDocument();
  });

  it('passes calendarType to Weekdays component', () => {
    const calendarType = 'iso8601';

    const { container } = render(<WeekView {...defaultProps} calendarType={calendarType} />);

    const firstWeekday = container.querySelector('.react-calendar__month-view__weekdays__weekday');

    // ISO 8601 calendar week starts on Monday
    expect(firstWeekday).toHaveTextContent('Mon');
  });

  it('passes derived calendarType to Weekdays component if calendarType is not given', () => {
    const locale = 'en-US';

    const { container } = render(<WeekView {...defaultProps} locale={locale} />);

    const firstWeekday = container.querySelector('.react-calendar__month-view__weekdays__weekday');

    // US calendar week starts on Sunday
    expect(firstWeekday).toHaveTextContent('Sun');
  });

  it('passes formatShortWeekday to Weekdays component', () => {
    const formatShortWeekday = () => 'Wkdy';

    const { container } = render(
      <WeekView {...defaultProps} formatShortWeekday={formatShortWeekday} />,
    );

    const weekdays = container.querySelector('.react-calendar__month-view__weekdays');

    expect(weekdays).toHaveTextContent('Wkdy');
  });

  it('passes formatWeekday to Weekdays component', () => {
    const formatWeekday = () => 'Weekday';

    const { container } = render(<WeekView {...defaultProps} formatWeekday={formatWeekday} />);

    const weekday = container.querySelector(
      '.react-calendar__month-view__weekdays__weekday',
    ) as HTMLDivElement;
    const abbr = weekday.querySelector('abbr');

    expect(abbr).toHaveAccessibleName('Weekday');
  });

  it('passes calendarType to Days component', () => {
    const calendarType = 'iso8601';

    const { container } = render(
      <WeekView
        {...defaultProps}
        calendarType={calendarType}
        formatDay={formatShortWeekday}
      />,
    );

    const firstDay = container.querySelector('.react-calendar__month-view__days__day');

    // ISO 8601 calendar week starts on Monday
    expect(firstDay).toHaveTextContent('Mon');
  });

  it('passes derived calendarType to Days component if calendarType is not given', () => {
    const locale = 'en-US';

    const { container } = render(
      <WeekView
        {...defaultProps}
        formatDay={formatShortWeekday}
        locale={locale}
      />,
    );

    const firstDay = container.querySelector('.react-calendar__month-view__days__day');

    // US calendar week starts on Sunday
    expect(firstDay).toHaveTextContent('Sun');
  });

  it('displays month view with custom day formatting', () => {
    const formatDay = () => 'Day';

    const { container } = render(<WeekView {...defaultProps} formatDay={formatDay} />);

    const day = container.querySelector('.react-calendar__month-view__days__day');

    expect(day).toHaveTextContent('Day');
  });
});
