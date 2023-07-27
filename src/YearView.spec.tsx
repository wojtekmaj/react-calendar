import { describe, expect, it } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import YearView from './YearView.js';

const { format } = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

describe('YearView', () => {
  const defaultProps = {
    activeStartDate: new Date(2017, 0, 1),
    valueType: 'month',
  } satisfies React.ComponentProps<typeof YearView>;

  it('renders proper view when given activeStartDate', () => {
    const activeStartDate = new Date(2017, 0, 1);

    const { container } = render(<YearView {...defaultProps} activeStartDate={activeStartDate} />);

    const firstDayTile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
    const firstDayTileTimeAbbr = firstDayTile.querySelector('abbr');

    expect(firstDayTileTimeAbbr).toHaveAccessibleName(format(activeStartDate));
  });

  it('applies tileClassName to its tiles when given a string', () => {
    const tileClassName = 'testClassName';

    const { container } = render(<YearView {...defaultProps} tileClassName={tileClassName} />);

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
      <YearView
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

    const { container } = render(<YearView {...defaultProps} tileContent={tileContent} />);

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
      <YearView {...defaultProps} activeStartDate={activeStartDate} tileContent={tileContentFn} />,
    );

    const tiles = container.querySelectorAll('.react-calendar__tile');

    const firstDayTile = tiles[0] as HTMLDivElement;
    const secondDayTile = tiles[1] as HTMLDivElement;

    const firstDayTileContent = firstDayTile.querySelector('.testContent');
    const secondDayTileContent = secondDayTile.querySelector('.testContent');

    expect(firstDayTileContent).toBeInTheDocument();
    expect(secondDayTileContent).not.toBeInTheDocument();
  });

  it('displays year view with custom month formatting', () => {
    const { container } = render(<YearView {...defaultProps} formatMonth={() => 'Month'} />);

    const month = container.querySelector('.react-calendar__year-view__months__month');

    expect(month).toHaveTextContent('Month');
  });
});
