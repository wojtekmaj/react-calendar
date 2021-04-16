import React from 'react';
import { mount, shallow } from 'enzyme';

import MonthView from './MonthView';

const { format } = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

describe('MonthView', () => {
  const defaultProps = {
    activeStartDate: new Date(2017, 0, 1),
  };

  it('renders proper view when given activeStartDate', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const component = mount(
      <MonthView
        {...defaultProps}
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
      />,
    );

    const firstDayTile = component.find('.react-calendar__tile').first();
    const firstDayTileTimeAbbr = firstDayTile.find('abbr').prop('aria-label');

    expect(firstDayTileTimeAbbr).toBe(format(activeStartDate));
  });

  it('applies tileClassName to its tiles when given a string', () => {
    const tileClassName = 'testClassName';
    const component = mount(
      <MonthView
        {...defaultProps}
        showNeighboringMonth={false}
        tileClassName={tileClassName}
      />,
    );

    const firstDayTile = component.find('.react-calendar__tile').first();
    const firstDayTileClassName = firstDayTile.prop('className');

    expect(firstDayTileClassName.includes(tileClassName)).toBe(true);
  });

  it('applies tileClassName to its tiles conditionally when given a function that returns a string', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const tileClassNameFn = ({ date }) => {
      if (date.getTime() === activeStartDate.getTime()) {
        return 'firstDayOfTheMonth';
      }

      return null;
    };
    const component = mount(
      <MonthView
        {...defaultProps}
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
        tileClassName={tileClassNameFn}
      />,
    );

    const tiles = component.find('.react-calendar__tile');

    const firstDayTile = tiles.first();
    const firstDayTileClassName = firstDayTile.prop('className');
    const secondDayTile = tiles.at(1);
    const secondDayTileClassName = secondDayTile.prop('className');

    expect(firstDayTileClassName.includes('firstDayOfTheMonth')).toBe(true);
    expect(secondDayTileClassName.includes('firstDayOfTheMonth')).toBe(false);
  });

  it('renders tileContent in its tiles when given a node', () => {
    const tileContent = (
      <div className="testContent" />
    );
    const component = mount(
      <MonthView
        {...defaultProps}
        showNeighboringMonth={false}
        tileContent={tileContent}
      />,
    );

    const tiles = component.find('.react-calendar__tile');

    const firstDayTile = tiles.first();
    const firstDayTileContent = firstDayTile.find('.testContent');

    expect(firstDayTileContent).toHaveLength(1);
  });

  it('renders tileContent in its tiles conditionally when given a function that returns a node', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const tileContentFn = ({ date }) => {
      if (date.getTime() === activeStartDate.getTime()) {
        return (
          <div className="testContent" />
        );
      }

      return null;
    };

    const component = mount(
      <MonthView
        {...defaultProps}
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
        tileContent={tileContentFn}
      />,
    );

    const tiles = component.find('.react-calendar__tile');

    const firstDayTile = tiles.first();
    const firstDayTileContent = firstDayTile.find('.testContent');
    const secondDayTile = tiles.at(1);
    const secondDayTileContent = secondDayTile.find('.testContent');

    expect(firstDayTileContent).toHaveLength(1);
    expect(secondDayTileContent).toHaveLength(0);
  });

  it('does not render WeekNumbers component by default', () => {
    const component = mount(
      <MonthView
        {...defaultProps}
      />,
    );

    expect(component.find('WeekNumbers')).toHaveLength(0);
  });

  it('renders WeekNumbers component by given showWeekNumbers flag', () => {
    const component = mount(
      <MonthView
        {...defaultProps}
        showWeekNumbers
      />,
    );

    expect(component.find('WeekNumbers')).toHaveLength(1);
  });

  it('passes calendarType to Weekdays component', () => {
    const calendarType = 'ISO 8601';

    const component = shallow(
      <MonthView
        {...defaultProps}
        calendarType={calendarType}
      />,
    );

    const weekdays = component.find('Weekdays');

    expect(weekdays.prop('calendarType')).toBe(calendarType);
  });

  it('passes derived calendarType to Weekdays component if calendarType is not given', () => {
    const locale = 'en-US';

    const component = shallow(
      <MonthView
        {...defaultProps}
        locale={locale}
      />,
    );

    const weekdays = component.find('Weekdays');

    expect(weekdays.prop('calendarType')).toBe('US');
  });

  it('passes formatShortWeekday flag to Weekdays component', () => {
    const formatShortWeekday = () => 'Weekday';

    const component = shallow(
      <MonthView
        {...defaultProps}
        formatShortWeekday={formatShortWeekday}
      />,
    );

    const weekdays = component.find('Weekdays');

    expect(weekdays.prop('formatShortWeekday')).toBe(formatShortWeekday);
  });

  it('passes calendarType to Days component', () => {
    const calendarType = 'ISO 8601';

    const component = shallow(
      <MonthView
        {...defaultProps}
        calendarType={calendarType}
      />,
    );

    const days = component.find('Days');

    expect(days.prop('calendarType')).toBe(calendarType);
  });

  it('passes derived calendarType to Days component if calendarType is not given', () => {
    const locale = 'en-US';

    const component = shallow(
      <MonthView
        {...defaultProps}
        locale={locale}
      />,
    );

    const days = component.find('Days');

    expect(days.prop('calendarType')).toBe('US');
  });

  it('passes formatDay flag to Days component', () => {
    const formatDay = () => 'Day';

    const component = shallow(
      <MonthView
        {...defaultProps}
        formatDay={formatDay}
      />,
    );

    const days = component.find('Days');

    expect(days.prop('formatDay')).toBe(formatDay);
  });

  it('passes formatLongDate flag to Days component', () => {
    const formatLongDate = () => 'Long date';

    const component = shallow(
      <MonthView
        {...defaultProps}
        formatLongDate={formatLongDate}
      />,
    );

    const days = component.find('Days');

    expect(days.prop('formatLongDate')).toBe(formatLongDate);
  });
});
