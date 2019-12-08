import React from 'react';
import { mount, shallow } from 'enzyme';

import DecadeView from './DecadeView';

/* eslint-disable react/prop-types */

describe('DecadeView', () => {
  const defaultProps = {
    activeStartDate: new Date(2017, 0, 1),
  };

  it('renders proper view when given activeStartDate', () => {
    const activeStartDate = new Date(2011, 0, 1);
    const component = mount(
      <DecadeView
        {...defaultProps}
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
      />,
    );

    const firstDayTile = component.find('.react-calendar__tile').first();

    expect(firstDayTile.text()).toBe(`${activeStartDate.getFullYear()}`);
  });

  it('applies tileClassName to its tiles when given a string', () => {
    const tileClassName = 'testClassName';
    const component = mount(
      <DecadeView
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
    const activeStartDate = new Date(2011, 0, 1);
    const tileClassNameFn = ({ date }) => {
      if (date.getTime() === activeStartDate.getTime()) {
        return 'firstDayOfTheMonth';
      }

      return null;
    };
    const component = mount(
      <DecadeView
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
      <DecadeView
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
    const activeStartDate = new Date(2011, 0, 1);
    const tileContentFn = ({ date }) => {
      if (date.getTime() === activeStartDate.getTime()) {
        return (
          <div className="testContent" />
        );
      }

      return null;
    };
    const component = mount(
      <DecadeView
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

  it('passes formatYear flag to Years component', () => {
    const formatYear = () => 'Year';

    const component = shallow(
      <DecadeView
        {...defaultProps}
        formatYear={formatYear}
      />,
    );

    const years = component.find('Years');

    expect(years.prop('formatYear')).toBe(formatYear);
  });
});
