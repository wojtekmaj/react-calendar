import { beforeEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import Navigation from './Navigation.js';

const allViews = ['century', 'decade', 'year', 'month'];

describe('Navigation', () => {
  const defaultProps = {
    activeStartDate: new Date(2017, 0, 1),
    drillUp: () => {
      // Intentionally empty
    },
    setActiveStartDate: () => {
      // Intentionally empty
    },
    views: allViews,
    view: 'month',
  } satisfies React.ComponentProps<typeof Navigation>;

  it('renders prev2, prev, drill up, next and next2 buttons', async () => {
    const { container } = await render(<Navigation {...defaultProps} view="month" />);

    const wrapper = container.firstElementChild as HTMLDivElement;
    const children = wrapper.children;

    const prev2 = children[0];
    const prev = children[1];
    const drillUp = children[2];
    const next = children[3];
    const next2 = children[4];

    expect(children).toHaveLength(5);
    expect(prev2).toHaveAttribute('type', 'button');
    expect(prev).toHaveAttribute('type', 'button');
    expect(drillUp).toHaveAttribute('type', 'button');
    expect(next).toHaveAttribute('type', 'button');
    expect(next2).toHaveAttribute('type', 'button');
  });

  it('renders prev, drill up, next and buttons only for century view', async () => {
    const { container } = await render(<Navigation {...defaultProps} view="century" />);

    const wrapper = container.firstElementChild as HTMLDivElement;
    const children = wrapper.children;

    const prev = children[0];
    const drillUp = children[1];
    const next = children[2];

    expect(children).toHaveLength(3);
    expect(prev).toHaveAttribute('type', 'button');
    expect(drillUp).toHaveAttribute('type', 'button');
    expect(next).toHaveAttribute('type', 'button');
  });

  it('displays proper title for month view', async () => {
    const { container } = await render(<Navigation {...defaultProps} view="month" />);

    const drillUp = container.querySelector('.react-calendar__navigation__label');

    expect(drillUp).toHaveTextContent('January 2017');
  });

  it('displays proper title for year view', async () => {
    const { container } = await render(<Navigation {...defaultProps} view="year" />);

    const drillUp = container.querySelector('.react-calendar__navigation__label');

    expect(drillUp).toHaveTextContent('2017');
  });

  it('displays proper title for decade view', async () => {
    const { container } = await render(<Navigation {...defaultProps} view="decade" />);

    const drillUp = container.querySelector('.react-calendar__navigation__label');

    expect(drillUp).toHaveTextContent('2011 – 2020');
  });

  it('displays proper title for century view', async () => {
    const { container } = await render(<Navigation {...defaultProps} view="century" />);

    const drillUp = container.querySelector('.react-calendar__navigation__label');

    expect(drillUp).toHaveTextContent('2001 – 2100');
  });

  it('displays proper title for month view given showDouble flags is set to true', async () => {
    const { container } = await render(
      <Navigation {...defaultProps} showDoubleView view="month" />,
    );

    const drillUp = container.querySelector('.react-calendar__navigation__label');

    expect(drillUp).toHaveTextContent('January 2017 – February 2017');
  });

  it('displays proper user-defined labels on prev2, prev, next and next2 buttons', async () => {
    const { container } = await render(
      <Navigation
        {...defaultProps}
        next2Label="next2Label"
        nextLabel="nextLabel"
        prev2Label="prev2Label"
        prevLabel="prevLabel"
        view="month"
      />,
    );

    const wrapper = container.firstElementChild as HTMLDivElement;
    const children = wrapper.children;

    const prev2 = children[0];
    const prev = children[1];
    const next = children[3];
    const next2 = children[4];

    expect(prev2).toHaveTextContent('prev2Label');
    expect(prev).toHaveTextContent('prevLabel');
    expect(next).toHaveTextContent('nextLabel');
    expect(next2).toHaveTextContent('next2Label');
  });

  it('uses proper user-defined ARIA live on navigation button', async () => {
    const { container } = await render(
      <Navigation {...defaultProps} navigationAriaLive="polite" view="month" />,
    );

    const wrapper = container.firstElementChild as HTMLDivElement;
    const children = wrapper.children;

    const navigation = children[2];

    expect(navigation).toHaveAttribute('aria-live', 'polite');
  });

  it('displays proper user-defined ARIA labels on prev2, prev, navigation, next and next2 buttons', async () => {
    const { container } = await render(
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

    const wrapper = container.firstElementChild as HTMLDivElement;
    const children = wrapper.children;

    const prev2 = children[0];
    const prev = children[1];
    const navigation = children[2];
    const next = children[3];
    const next2 = children[4];

    expect(prev2).toHaveAccessibleName('prev2AriaLabel');
    expect(prev).toHaveAccessibleName('prevAriaLabel');
    expect(navigation).toHaveAccessibleName('navigationAriaLabel');
    expect(next).toHaveAccessibleName('nextAriaLabel');
    expect(next2).toHaveAccessibleName('next2AriaLabel');
  });

  it('calls drillUp function on drill up button click', async () => {
    const drillUpFn = vi.fn();

    const { container } = await render(
      <Navigation {...defaultProps} drillUp={drillUpFn} view="month" />,
    );

    const button = container.querySelector(
      'button.react-calendar__navigation__label',
    ) as HTMLButtonElement;

    await userEvent.click(button);

    expect(drillUpFn).toHaveBeenCalledTimes(1);
  });

  it('calls setActiveStartDate on prev2, prev, next and next2 buttons click', async () => {
    const setActiveStartDateFn = vi.fn();

    const { container } = await render(
      <Navigation {...defaultProps} setActiveStartDate={setActiveStartDateFn} view="month" />,
    );

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const prev2 = arrows[0] as HTMLButtonElement;
    const prev = arrows[1] as HTMLButtonElement;
    const next = arrows[2] as HTMLButtonElement;
    const next2 = arrows[3] as HTMLButtonElement;

    await userEvent.click(prev2);
    await userEvent.click(prev);
    await userEvent.click(next);
    await userEvent.click(next2);

    expect(setActiveStartDateFn).toHaveBeenCalledTimes(4);
  });

  describe('month navigation', () => {
    const monthSetActiveStartDateFn = vi.fn();
    let monthViewArrows: NodeListOf<HTMLButtonElement>;

    beforeEach(async () => {
      const { container: monthContainer } = await render(
        <Navigation
          {...defaultProps}
          setActiveStartDate={monthSetActiveStartDateFn}
          view="month"
        />,
      );

      monthViewArrows = monthContainer.querySelectorAll('button.react-calendar__navigation__arrow');
    });

    it('jumps 12 months back on prev2 button click for month view', async () => {
      const prev2 = monthViewArrows[0] as HTMLButtonElement;

      await userEvent.click(prev2);

      expect(monthSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2016, 0, 1), 'prev2');
    });

    it('jumps 1 month back on prev button click for month view', async () => {
      const prev = monthViewArrows[1] as HTMLButtonElement;

      await userEvent.click(prev);

      expect(monthSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2016, 11, 1), 'prev');
    });

    it('jumps 1 month forward on next button click for month view', async () => {
      const next = monthViewArrows[2] as HTMLButtonElement;

      await userEvent.click(next);

      expect(monthSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2017, 1, 1), 'next');
    });

    it('jumps 12 months forward on next2 button click for month view', async () => {
      const next2 = monthViewArrows[3] as HTMLButtonElement;

      await userEvent.click(next2);

      expect(monthSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2018, 0, 1), 'next2');
    });
  });

  describe('year navigation', () => {
    const yearSetActiveStartDateFn = vi.fn();
    let yearViewArrows: NodeListOf<HTMLButtonElement>;

    beforeEach(async () => {
      const { container: yearContainer } = await render(
        <Navigation {...defaultProps} setActiveStartDate={yearSetActiveStartDateFn} view="year" />,
      );

      yearViewArrows = yearContainer.querySelectorAll('button.react-calendar__navigation__arrow');
    });

    it('jumps 10 years back on prev2 button click for year view', async () => {
      const prev2 = yearViewArrows[0] as HTMLButtonElement;

      await userEvent.click(prev2);

      expect(yearSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2007, 0, 1), 'prev2');
    });

    it('jumps 1 year back on prev button click for year view', async () => {
      const prev2 = yearViewArrows[1] as HTMLButtonElement;

      await userEvent.click(prev2);

      expect(yearSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2016, 0, 1), 'prev');
    });

    it('jumps 1 year forward on next button click for year view', async () => {
      const next = yearViewArrows[2] as HTMLButtonElement;

      await userEvent.click(next);

      expect(yearSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2018, 0, 1), 'next');
    });

    it('jumps 10 years forward on next2 button click for year view', async () => {
      const next2 = yearViewArrows[3] as HTMLButtonElement;

      await userEvent.click(next2);

      expect(yearSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2027, 0, 1), 'next2');
    });
  });

  describe('decade navigation', () => {
    const decadeSetActiveStartDateFn = vi.fn();
    let decadeViewArrows: NodeListOf<HTMLButtonElement>;

    beforeEach(async () => {
      const { container: decadeContainer } = await render(
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

    it('jumps 10 decades back on prev2 button click for decade view', async () => {
      const prev2 = decadeViewArrows[0] as HTMLButtonElement;

      await userEvent.click(prev2);

      expect(decadeSetActiveStartDateFn).toHaveBeenCalledWith(new Date(1911, 0, 1), 'prev2');
    });

    it('jumps 1 decade back on prev button click for decade view', async () => {
      const prev = decadeViewArrows[1] as HTMLButtonElement;

      await userEvent.click(prev);

      expect(decadeSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2001, 0, 1), 'prev');
    });

    it('jumps 1 decade forward on next button click for decade view', async () => {
      const next = decadeViewArrows[2] as HTMLButtonElement;

      await userEvent.click(next);

      expect(decadeSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2021, 0, 1), 'next');
    });

    it('jumps 10 decades forward on next2 button click for decade view', async () => {
      const next2 = decadeViewArrows[3] as HTMLButtonElement;

      await userEvent.click(next2);

      expect(decadeSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2111, 0, 1), 'next2');
    });
  });

  describe('century navigation', () => {
    const centurySetActiveStartDateFn = vi.fn();
    let centuryViewArrows: NodeListOf<HTMLButtonElement>;

    beforeEach(async () => {
      const { container: centuryContainer } = await render(
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

    it('jumps 1 century back on prev button click for century view', async () => {
      const prev = centuryViewArrows[0] as HTMLButtonElement;

      await userEvent.click(prev);

      expect(centurySetActiveStartDateFn).toHaveBeenCalledWith(new Date(1901, 0, 1), 'prev');
    });

    it('jumps 1 century forward on next button click for century view', async () => {
      const next = centuryViewArrows[1] as HTMLButtonElement;

      await userEvent.click(next);

      expect(centurySetActiveStartDateFn).toHaveBeenCalledWith(new Date(2101, 0, 1), 'next');
    });
  });

  it('correctly marks drillUp button as disabled when already on top allowed view', async () => {
    const { container } = await render(<Navigation {...defaultProps} view="century" />);

    const button = container.querySelector('button.react-calendar__navigation__label');

    expect(button).toBeDisabled();
  });

  it('disallows navigating before minDate', async () => {
    const { container } = await render(
      <Navigation {...defaultProps} minDate={new Date(2017, 0, 1)} view="month" />,
    );

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const prev2 = arrows[0];
    const prev = arrows[1];

    expect(prev2).toBeDisabled();
    expect(prev).toBeDisabled();
  });

  it('disallows navigating before dynamically set minDate', async () => {
    const { container, rerender } = await render(<Navigation {...defaultProps} view="month" />);

    await rerender(<Navigation {...defaultProps} minDate={new Date(2017, 0, 1)} view="month" />);

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const prev2 = arrows[0];
    const prev = arrows[1];

    expect(prev2).toBeDisabled();
    expect(prev).toBeDisabled();
  });

  it('disallows navigating after maxDate', async () => {
    const { container } = await render(
      <Navigation {...defaultProps} maxDate={new Date(2017, 0, 31)} view="month" />,
    );

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const next = arrows[2];
    const next2 = arrows[3];

    expect(next).toBeDisabled();
    expect(next2).toBeDisabled();
  });

  it('does not disallow navigating to next month when maxDate is set to first day of the next month', async () => {
    const { container } = await render(
      <Navigation {...defaultProps} maxDate={new Date(2017, 1, 1)} view="month" />,
    );

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const next = arrows[2];
    const next2 = arrows[3];

    expect(next).toBeEnabled();
    expect(next2).toBeDisabled();
  });

  it('does not disallow navigating to next year when maxDate is set to first day of the next year', async () => {
    const { container } = await render(
      <Navigation {...defaultProps} maxDate={new Date(2018, 0, 1)} view="month" />,
    );

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const next = arrows[2];
    const next2 = arrows[3];

    expect(next).toBeEnabled();
    expect(next2).toBeEnabled();
  });

  it('disallows navigating after dynamically set maxDate', async () => {
    const { container, rerender } = await render(<Navigation {...defaultProps} view="month" />);

    await rerender(<Navigation {...defaultProps} maxDate={new Date(2017, 0, 31)} view="month" />);

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const next = arrows[2];
    const next2 = arrows[3];

    expect(next).toBeDisabled();
    expect(next2).toBeDisabled();
  });

  it('disallows navigating before the year 0', async () => {
    const activeStartDate = new Date();
    activeStartDate.setFullYear(0, 0, 1);

    const { container } = await render(
      <Navigation {...defaultProps} activeStartDate={activeStartDate} view="year" />,
    );

    const arrows = container.querySelectorAll('button.react-calendar__navigation__arrow');

    const prev2 = arrows[0];
    const prev = arrows[1];

    expect(prev2).toBeDisabled();
    expect(prev).toBeDisabled();
  });

  it('renders custom navigation label when given navigationLabel prop', async () => {
    const date = new Date(2017, 0, 1);
    const label = 'Custom label';
    const view = 'month';
    const locale = 'de-DE';

    const navigationLabel = vi.fn().mockReturnValue(label);

    const { container } = await render(
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
    it('displays calendar with custom month year navigation label', async () => {
      const { container } = await render(
        <Navigation {...defaultProps} formatMonthYear={() => 'MonthYear'} view="month" />,
      );

      const navigationLabel = container.querySelector('.react-calendar__navigation__label');

      expect(navigationLabel).toHaveTextContent('MonthYear');
    });

    it('displays calendar with custom year navigation label', async () => {
      const { container } = await render(
        <Navigation {...defaultProps} formatYear={() => 'Year'} view="year" />,
      );

      const navigationLabel = container.querySelector('.react-calendar__navigation__label');

      expect(navigationLabel).toHaveTextContent('Year');
    });

    it('displays calendar with custom decade navigation label', async () => {
      const { container } = await render(
        <Navigation {...defaultProps} formatYear={() => 'Year'} view="decade" />,
      );

      const navigationLabel = container.querySelector('.react-calendar__navigation__label');

      expect(navigationLabel).toHaveTextContent('Year – Year');
    });

    it('displays calendar with custom century navigation label', async () => {
      const { container } = await render(
        <Navigation {...defaultProps} formatYear={() => 'Year'} view="century" />,
      );

      const navigationLabel = container.querySelector('.react-calendar__navigation__label');

      expect(navigationLabel).toHaveTextContent('Year – Year');
    });
  });
});
