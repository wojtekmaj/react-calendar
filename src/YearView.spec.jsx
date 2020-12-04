import React from 'react';
import { mount, shallow } from 'enzyme';

import YearView from './YearView';

const { format } = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

describe('YearView', () => {
  const defaultProps = {
    activeStartDate: new Date(2017, 0, 1),
  };

  it('renders proper view when given activeStartDate', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const component = mount(
      <YearView
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
      <YearView
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
      <YearView
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
      <YearView
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
      <YearView
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

  it('displays year view with custom month formatting', () => {
    const component = mount(
      <YearView
        {...defaultProps}
        formatMonth={() => 'Month'}
      />,
    );

    const month = component.find('.react-calendar__year-view__months__month').first();

    expect(month.text()).toBe('Month');
  });

  it('passes formatMonth flag to Days component', () => {
    const formatMonth = () => 'Month';

    const component = shallow(
      <YearView
        {...defaultProps}
        formatMonth={formatMonth}
      />,
    );

    const months = component.find('Months');

    expect(months.prop('formatMonth')).toBe(formatMonth);
  });
});
