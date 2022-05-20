import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Navigation from './Navigation';

const allViews = ['century', 'decade', 'year', 'month'];

describe('Navigation', () => {
  const defaultProps = {
    activeStartDate: new Date(2017, 0, 1),
    drillUp: () => {},
    setActiveStartDate: () => {},
    views: allViews,
  };

  it('renders prev2, prev, drill up, next and next2 buttons', () => {
    const { container } = render(<Navigation {...defaultProps} view="month" />);

    const children = [...container.firstChild.children];

    const [prev2, prev, drillUp, next, next2] = children;

    expect(children).toHaveLength(5);
    expect(prev2.type).toBe('button');
    expect(prev.type).toBe('button');
    expect(drillUp.type).toBe('button');
    expect(next.type).toBe('button');
    expect(next2.type).toBe('button');
  });

  it('renders prev, drill up, next and buttons only for century view', () => {
    const { container } = render(<Navigation {...defaultProps} view="century" />);

    const children = [...container.firstChild.children];

    const [prev, drillUp, next] = children;

    expect(children).toHaveLength(3);
    expect(prev.type).toBe('button');
    expect(drillUp.type).toBe('button');
    expect(next.type).toBe('button');
  });

  it('displays proper title for month view', () => {
    const { container } = render(<Navigation {...defaultProps} view="month" />);

    const drillUp = container.querySelector('.react-calendar__navigation__label');

    expect(drillUp).toHaveTextContent('January 2017');
  });

  it('displays proper title for year view', () => {
    const { container } = render(<Navigation {...defaultProps} view="year" />);

    const drillUp = container.querySelector('.react-calendar__navigation__label');

    expect(drillUp).toHaveTextContent('2017');
  });

  it('displays proper title for decade view', () => {
    const { container } = render(<Navigation {...defaultProps} view="decade" />);

    const drillUp = container.querySelector('.react-calendar__navigation__label');

    expect(drillUp).toHaveTextContent('2011 – 2020');
  });

  it('displays proper title for century view', () => {
    const { container } = render(<Navigation {...defaultProps} view="century" />);

    const drillUp = container.querySelector('.react-calendar__navigation__label');

    expect(drillUp).toHaveTextContent('2001 – 2100');
  });

  it('displays proper title for month view given showDouble flags is set to true', () => {
    const { container } = render(<Navigation {...defaultProps} showDoubleView view="month" />);

    const drillUp = container.querySelector('.react-calendar__navigation__label');

    expect(drillUp).toHaveTextContent('January 2017 – February 2017');
  });

  it('displays proper user-defined labels on prev2, prev, next and next2 buttons', () => {
    const { container } = render(
      <Navigation
        {...defaultProps}
        next2Label="next2Label"
        nextLabel="nextLabel"
        prev2Label="prev2Label"
        prevLabel="prevLabel"
        view="month"
      />,
    );

    const [prev2, prev, , next, next2] = [...container.firstChild.children];

    expect(prev2).toHaveTextContent('prev2Label');
    expect(prev).toHaveTextContent('prevLabel');
    expect(next).toHaveTextContent('nextLabel');
    expect(next2).toHaveTextContent('next2Label');
  });

  it('uses proper user-defined ARIA live on navigation button', () => {
    const { container } = render(
      <Navigation {...defaultProps} navigationAriaLive="polite" view="month" />,
    );

    const [, , navigation] = [...container.firstChild.children];

    expect(navigation).toHaveAttribute('aria-live', 'polite');
  });

  it('displays proper user-defined ARIA labels on prev2, prev, navigation, next and next2 buttons', () => {
    const { container } = render(
      <Navigation
        {...defaultProps}
        navigationAriaLabel="navigationAriaLabel"
        next2AriaLabel="next2AriaLabel"
        nextAriaLabel="nextAriaLabel"
        prev2AriaLabel="prev2AriaLabel"
        prevAriaLabel="prevAriaLabel"
        view="month"
      />,
    );

    const [prev2, prev, navigation, next, next2] = [...container.firstChild.children];

    expect(prev2).toHaveAccessibleName('prev2AriaLabel');
    expect(prev).toHaveAccessibleName('prevAriaLabel');
    expect(navigation).toHaveAccessibleName('navigationAriaLabel');
    expect(next).toHaveAccessibleName('nextAriaLabel');
    expect(next2).toHaveAccessibleName('next2AriaLabel');
  });

  it('calls drillUp function on drill up button click', () => {
    const drillUpFn = jest.fn();

    const { container } = render(<Navigation {...defaultProps} drillUp={drillUpFn} view="month" />);

    const button = container.querySelector('button.react-calendar__navigation__label');

    fireEvent.click(button);

    expect(drillUpFn).toHaveBeenCalledTimes(1);
  });

  it('calls setActiveStartDate on prev2, prev, next and next2 buttons click', () => {
    const setActiveStartDateFn = jest.fn();

    const { container } = render(
      <Navigation {...defaultProps} setActiveStartDate={setActiveStartDateFn} view="month" />,
    );

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const prev2 = arrows[0];
    const prev = arrows[1];
    const next = arrows[2];
    const next2 = arrows[3];

    fireEvent.click(prev2);
    fireEvent.click(prev);
    fireEvent.click(next);
    fireEvent.click(next2);

    expect(setActiveStartDateFn).toHaveBeenCalledTimes(4);
  });

  describe('month navigation', () => {
    const monthSetActiveStartDateFn = jest.fn();
    let monthViewArrows;

    beforeEach(() => {
      const { container: monthContainer } = render(
        <Navigation
          {...defaultProps}
          setActiveStartDate={monthSetActiveStartDateFn}
          view="month"
        />,
      );

      monthViewArrows = monthContainer.querySelectorAll('button.react-calendar__navigation__arrow');
    });

    it('jumps 12 months back on prev2 button click for month view', () => {
      const prev2 = monthViewArrows[0];

      fireEvent.click(prev2);

      expect(monthSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2016, 0, 1), 'prev2');
    });

    it('jumps 1 month back on prev button click for month view', () => {
      const prev = monthViewArrows[1];

      fireEvent.click(prev);

      expect(monthSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2016, 11, 1), 'prev');
    });

    it('jumps 1 month forward on next button click for month view', () => {
      const next = monthViewArrows[2];

      fireEvent.click(next);

      expect(monthSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2017, 1, 1), 'next');
    });

    it('jumps 12 months forward on next2 button click for month view', () => {
      const next2 = monthViewArrows[3];

      fireEvent.click(next2);

      expect(monthSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2018, 0, 1), 'next2');
    });
  });

  describe('year navigation', () => {
    const yearSetActiveStartDateFn = jest.fn();
    let yearViewArrows;

    beforeEach(() => {
      const { container: yearContainer } = render(
        <Navigation {...defaultProps} setActiveStartDate={yearSetActiveStartDateFn} view="year" />,
      );

      yearViewArrows = yearContainer.querySelectorAll('button.react-calendar__navigation__arrow');
    });

    it('jumps 10 years back on prev2 button click for year view', () => {
      const prev2 = yearViewArrows[0];

      fireEvent.click(prev2);

      expect(yearSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2007, 0, 1), 'prev2');
    });

    it('jumps 1 year back on prev button click for year view', () => {
      const prev2 = yearViewArrows[1];

      fireEvent.click(prev2);

      expect(yearSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2016, 0, 1), 'prev');
    });

    it('jumps 1 year forward on next button click for year view', () => {
      const next = yearViewArrows[2];

      fireEvent.click(next);

      expect(yearSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2018, 0, 1), 'next');
    });

    it('jumps 10 years forward on next2 button click for year view', () => {
      const next2 = yearViewArrows[3];

      fireEvent.click(next2);

      expect(yearSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2027, 0, 1), 'next2');
    });
  });

  describe('decade navigation', () => {
    const decadeSetActiveStartDateFn = jest.fn();
    let decadeViewArrows;

    beforeEach(() => {
      const { container: decadeContainer } = render(
        <Navigation
          {...defaultProps}
          setActiveStartDate={decadeSetActiveStartDateFn}
          view="decade"
        />,
      );

      decadeViewArrows = decadeContainer.querySelectorAll(
        'button.react-calendar__navigation__arrow',
      );
    });

    it('jumps 10 decades back on prev2 button click for decade view', () => {
      const prev2 = decadeViewArrows[0];

      fireEvent.click(prev2);

      expect(decadeSetActiveStartDateFn).toHaveBeenCalledWith(new Date(1911, 0, 1), 'prev2');
    });

    it('jumps 1 decade back on prev button click for decade view', () => {
      const prev = decadeViewArrows[1];

      fireEvent.click(prev);

      expect(decadeSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2001, 0, 1), 'prev');
    });

    it('jumps 1 decade forward on next button click for decade view', () => {
      const next = decadeViewArrows[2];

      fireEvent.click(next);

      expect(decadeSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2021, 0, 1), 'next');
    });

    it('jumps 10 decades forward on next2 button click for decade view', () => {
      const next2 = decadeViewArrows[3];

      fireEvent.click(next2);

      expect(decadeSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2111, 0, 1), 'next2');
    });
  });

  describe('century navigation', () => {
    const centurySetActiveStartDateFn = jest.fn();
    let centuryViewArrows;

    beforeEach(() => {
      const { container: centuryContainer } = render(
        <Navigation
          {...defaultProps}
          setActiveStartDate={centurySetActiveStartDateFn}
          view="century"
        />,
      );

      centuryViewArrows = centuryContainer.querySelectorAll(
        'button.react-calendar__navigation__arrow',
      );
    });

    it('jumps 1 century back on prev button click for century view', () => {
      const prev = centuryViewArrows[0];

      fireEvent.click(prev);

      expect(centurySetActiveStartDateFn).toHaveBeenCalledWith(new Date(1901, 0, 1), 'prev');
    });

    it('jumps 1 century forward on next button click for century view', () => {
      const next = centuryViewArrows[1];

      fireEvent.click(next);

      expect(centurySetActiveStartDateFn).toHaveBeenCalledWith(new Date(2101, 0, 1), 'next');
    });
  });

  it('correctly marks drillUp button as disabled when already on top allowed view', () => {
    const { container } = render(<Navigation {...defaultProps} view="century" />);

    const button = container.querySelector('button.react-calendar__navigation__label');

    expect(button).toBeDisabled();
  });

  it('disallows navigating before minDate', () => {
    const { container } = render(
      <Navigation {...defaultProps} minDate={new Date(2017, 0, 1)} view="month" />,
    );

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const prev2 = arrows[0];
    const prev = arrows[1];

    expect(prev2).toBeDisabled();
    expect(prev).toBeDisabled();
  });

  it('disallows navigating before dynamically set minDate', () => {
    const { container, rerender } = render(<Navigation {...defaultProps} view="month" />);

    rerender(<Navigation {...defaultProps} minDate={new Date(2017, 0, 1)} view="month" />);

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const prev2 = arrows[0];
    const prev = arrows[1];

    expect(prev2).toBeDisabled();
    expect(prev).toBeDisabled();
  });

  it('disallows navigating after maxDate', () => {
    const { container } = render(
      <Navigation {...defaultProps} maxDate={new Date(2017, 0, 31)} view="month" />,
    );

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const next = arrows[2];
    const next2 = arrows[3];

    expect(next).toBeDisabled();
    expect(next2).toBeDisabled();
  });

  it('does not disallow navigating to next month when maxDate is set to first day of the next month', () => {
    const { container } = render(
      <Navigation {...defaultProps} maxDate={new Date(2017, 1, 1)} view="month" />,
    );

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const next = arrows[2];
    const next2 = arrows[3];

    expect(next).toBeEnabled();
    expect(next2).toBeDisabled();
  });

  it('does not disallow navigating to next year when maxDate is set to first day of the next year', () => {
    const { container } = render(
      <Navigation {...defaultProps} maxDate={new Date(2018, 0, 1)} view="month" />,
    );

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const next = arrows[2];
    const next2 = arrows[3];

    expect(next).toBeEnabled();
    expect(next2).toBeEnabled();
  });

  it('disallows navigating after dynamically set maxDate', () => {
    const { container, rerender } = render(<Navigation {...defaultProps} view="month" />);

    rerender(<Navigation {...defaultProps} maxDate={new Date(2017, 0, 31)} view="month" />);

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const next = arrows[2];
    const next2 = arrows[3];

    expect(next).toBeDisabled();
    expect(next2).toBeDisabled();
  });

  it('disallows navigating before the year 0', () => {
    const activeStartDate = new Date();
    activeStartDate.setFullYear(0, 0, 1);

    const { container } = render(
      <Navigation {...defaultProps} activeStartDate={activeStartDate} view="year" />,
    );

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const prev2 = arrows[0];
    const prev = arrows[1];

    expect(prev2).toBeDisabled();
    expect(prev).toBeDisabled();
  });

  it('renders custom navigation label when given navigationLabel prop', () => {
    const date = new Date(2017, 0, 1);
    const label = 'Custom label';
    const view = 'month';
    const locale = 'de-DE';

    const navigationLabel = jest.fn().mockReturnValue(label);

    const { container } = render(
      <Navigation
        {...defaultProps}
        activeStartDate={date}
        locale={locale}
        navigationLabel={navigationLabel}
        view={view}
      />,
    );

    const drillUp = container.querySelector('.react-calendar__navigation__label');

    expect(navigationLabel).toHaveBeenCalledWith({
      locale,
      date,
      view,
      label: 'Januar 2017',
    });
    expect(drillUp).toHaveTextContent(label);
  });

  describe('formats navigation label properly', () => {
    it('displays calendar with custom month year navigation label', () => {
      const { container } = render(
        <Navigation {...defaultProps} formatMonthYear={() => 'MonthYear'} view="month" />,
      );

      const navigationLabel = container.querySelector('.react-calendar__navigation__label');

      expect(navigationLabel).toHaveTextContent('MonthYear');
    });

    it('displays calendar with custom year navigation label', () => {
      const { container } = render(
        <Navigation {...defaultProps} formatYear={() => 'Year'} view="year" />,
      );

      const navigationLabel = container.querySelector('.react-calendar__navigation__label');

      expect(navigationLabel).toHaveTextContent('Year');
    });

    it('displays calendar with custom decade navigation label', () => {
      const { container } = render(
        <Navigation {...defaultProps} formatYear={() => 'Year'} view="decade" />,
      );

      const navigationLabel = container.querySelector('.react-calendar__navigation__label');

      expect(navigationLabel).toHaveTextContent('Year – Year');
    });

    it('displays calendar with custom century navigation label', () => {
      const { container } = render(
        <Navigation {...defaultProps} formatYear={() => 'Year'} view="century" />,
      );

      const navigationLabel = container.querySelector('.react-calendar__navigation__label');

      expect(navigationLabel).toHaveTextContent('Year – Year');
    });
  });
});
