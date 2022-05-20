import React from 'react';
import { render } from '@testing-library/react';
import { getDecadeStart, getDecadeEnd } from '@wojtekmaj/date-utils';

import CenturyView from './CenturyView';

describe('CenturyView', () => {
  const defaultProps = {
    activeStartDate: new Date(2017, 0, 1),
  };

  it('renders proper view when given activeStartDate', () => {
    const activeStartDate = new Date(2001, 0, 1);

    const { container } = render(
      <CenturyView
        {...defaultProps}
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
      />,
    );

    const firstDayTile = container.querySelector('.react-calendar__tile');

    expect(firstDayTile).toHaveTextContent(
      `${getDecadeStart(activeStartDate).getFullYear()} – ${getDecadeEnd(
        activeStartDate,
      ).getFullYear()}`,
    );
  });

  it('applies tileClassName to its tiles when given a string', () => {
    const tileClassName = 'testClassName';

    const { container } = render(
      <CenturyView {...defaultProps} showNeighboringMonth={false} tileClassName={tileClassName} />,
    );

    const firstDayTile = container.querySelector('.react-calendar__tile');

    expect(firstDayTile).toHaveClass(tileClassName);
  });

  it('applies tileClassName to its tiles conditionally when given a function that returns a string', () => {
    const activeStartDate = new Date(2001, 0, 1);
    const tileClassNameFn = ({ date }) => {
      if (date.getTime() === activeStartDate.getTime()) {
        return 'firstDayOfTheMonth';
      }

      return null;
    };

    const { container } = render(
      <CenturyView
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
      <CenturyView {...defaultProps} showNeighboringMonth={false} tileContent={tileContent} />,
    );

    const tiles = container.querySelectorAll('.react-calendar__tile');
    const [firstDayTile] = tiles;

    const firstDayTileContent = firstDayTile.querySelector('.testContent');

    expect(firstDayTileContent).toBeInTheDocument();
  });

  it('renders tileContent in its tiles conditionally when given a function that returns a node', () => {
    const activeStartDate = new Date(2001, 0, 1);
    const tileContentFn = ({ date }) => {
      if (date.getTime() === activeStartDate.getTime()) {
        return <div className="testContent" />;
      }

      return null;
    };

    const { container } = render(
      <CenturyView
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

  it('displays century view with custom year formatting', () => {
    const formatYear = () => 'Year';

    const { container } = render(<CenturyView {...defaultProps} formatYear={formatYear} />);

    const year = container.querySelector('.react-calendar__century-view__decades');

    expect(year).toHaveTextContent('Year');
  });
});
