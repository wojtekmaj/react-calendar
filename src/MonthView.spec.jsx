import React from 'react';
import { render } from '@testing-library/react';

import MonthView from './MonthView';
import { formatShortWeekday } from './shared/dateFormatter';

const { format } = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

describe('MonthView', () => {
  const defaultProps = {
    activeStartDate: new Date(2017, 0, 1),
  };

  it('renders proper view when given activeStartDate', () => {
    const activeStartDate = new Date(2017, 0, 1);

    const { container } = render(
      <MonthView
        {...defaultProps}
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
      />,
    );

    const firstDayTile = container.querySelector('.react-calendar__tile');
    const firstDayTileTimeAbbr = firstDayTile.querySelector('abbr');

    expect(firstDayTileTimeAbbr).toHaveAccessibleName(format(activeStartDate));
  });

  it('applies tileClassName to its tiles when given a string', () => {
    const tileClassName = 'testClassName';

    const { container } = render(
      <MonthView {...defaultProps} showNeighboringMonth={false} tileClassName={tileClassName} />,
    );

    const firstDayTile = container.querySelector('.react-calendar__tile');

    expect(firstDayTile).toHaveClass(tileClassName);
  });

  it('applies tileClassName to its tiles conditionally when given a function that returns a string', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const tileClassNameFn = ({ date }) => {
      if (date.getTime() === activeStartDate.getTime()) {
        return 'firstDayOfTheMonth';
      }

      return null;
    };

    const { container } = render(
      <MonthView
        {...defaultProps}
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
        tileClassName={tileClassNameFn}
      />,
    );

    const tiles = container.querySelectorAll('.react-calendar__tile');
    const [firstDayTile, secondDayTile] = tiles;

    expect(firstDayTile).toHaveClass('firstDayOfTheMonth');
    expect(secondDayTile).not.toHaveClass('firstDayOfTheMonth');
  });

  it('renders tileContent in its tiles when given a node', () => {
    const tileContent = <div className="testContent" />;

    const { container } = render(
      <MonthView {...defaultProps} showNeighboringMonth={false} tileContent={tileContent} />,
    );

    const firstDayTile = container.querySelector('.react-calendar__tile');
    const firstDayTileContent = firstDayTile.querySelector('.testContent');

    expect(firstDayTileContent).toBeInTheDocument();
  });

  it('renders tileContent in its tiles conditionally when given a function that returns a node', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const tileContentFn = ({ date }) => {
      if (date.getTime() === activeStartDate.getTime()) {
        return <div className="testContent" />;
      }

      return null;
    };

    const { container } = render(
      <MonthView
        {...defaultProps}
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
        tileContent={tileContentFn}
      />,
    );

    const tiles = container.querySelectorAll('.react-calendar__tile');
    const [firstDayTile, secondDayTile] = tiles;

    const firstDayTileContent = firstDayTile.querySelector('.testContent');
    const secondDayTileContent = secondDayTile.querySelector('.testContent');

    expect(firstDayTileContent).toBeInTheDocument();
    expect(secondDayTileContent).not.toBeInTheDocument();
  });

  it('does not render WeekNumbers component by default', () => {
    const { container } = render(<MonthView {...defaultProps} />);

    const weekNumbers = container.querySelector('.react-calendar__month-view__weekNumbers');

    expect(weekNumbers).not.toBeInTheDocument();
  });

  it('renders WeekNumbers component by given showWeekNumbers flag', () => {
    const { container } = render(<MonthView {...defaultProps} showWeekNumbers />);

    const weekNumbers = container.querySelector('.react-calendar__month-view__weekNumbers');

    expect(weekNumbers).toBeInTheDocument();
  });

  it('passes calendarType to Weekdays component', () => {
    const calendarType = 'ISO 8601';

    const { container } = render(<MonthView {...defaultProps} calendarType={calendarType} />);

    const firstWeekday = container.querySelector('.react-calendar__month-view__weekdays__weekday');

    // ISO 8601 calendar week starts on Monday
    expect(firstWeekday).toHaveTextContent('Mon');
  });

  it('passes derived calendarType to Weekdays component if calendarType is not given', () => {
    const locale = 'en-US';

    const { container } = render(<MonthView {...defaultProps} locale={locale} />);

    const firstWeekday = container.querySelector('.react-calendar__month-view__weekdays__weekday');

    // US calendar week starts on Sunday
    expect(firstWeekday).toHaveTextContent('Sun');
  });

  it('passes formatShortWeekday to Weekdays component', () => {
    const formatShortWeekday = () => 'Wkdy';

    const { container } = render(
      <MonthView {...defaultProps} formatShortWeekday={formatShortWeekday} />,
    );

    const weekdays = container.querySelector('.react-calendar__month-view__weekdays');

    expect(weekdays).toHaveTextContent('Wkdy');
  });

  it('passes formatWeekday to Weekdays component', () => {
    const formatWeekday = () => 'Weekday';

    const { container } = render(<MonthView {...defaultProps} formatWeekday={formatWeekday} />);

    const weekday = container.querySelector('.react-calendar__month-view__weekdays__weekday');
    const abbr = weekday.querySelector('abbr');

    expect(abbr).toHaveAccessibleName('Weekday');
  });

  it('passes calendarType to Days component', () => {
    const calendarType = 'ISO 8601';

    const { container } = render(
      <MonthView
        {...defaultProps}
        calendarType={calendarType}
        formatDay={formatShortWeekday}
        showNeighboringMonth
      />,
    );

    const firstDay = container.querySelector('.react-calendar__month-view__days__day');

    // ISO 8601 calendar week starts on Monday
    expect(firstDay).toHaveTextContent('Mon');
  });

  it('passes derived calendarType to Days component if calendarType is not given', () => {
    const locale = 'en-US';

    const { container } = render(
      <MonthView
        {...defaultProps}
        formatDay={formatShortWeekday}
        locale={locale}
        showNeighboringMonth
      />,
    );

    const firstDay = container.querySelector('.react-calendar__month-view__days__day');

    // US calendar week starts on Sunday
    expect(firstDay).toHaveTextContent('Sun');
  });

  it('displays month view with custom day formatting', () => {
    const formatDay = () => 'Day';

    const { container } = render(<MonthView {...defaultProps} formatDay={formatDay} />);

    const day = container.querySelector('.react-calendar__month-view__days__day');

    expect(day).toHaveTextContent('Day');
  });
});
