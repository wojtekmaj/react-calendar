import { describe, expect, it, vi } from 'vitest';
import React, { createRef } from 'react';
import { act, render } from '@testing-library/react';
import { getMonthStart } from '@wojtekmaj/date-utils';

import Calendar from './Calendar.js';

import type { Action, Value, View } from './shared/types.js';

type CalendarImperativeHandle = {
  activeStartDate: Date;
  drillDown: (nextActiveStartDate: Date, event: React.MouseEvent<HTMLButtonElement>) => void;
  drillUp: () => void;
  onChange: (rawNextValue: Date, event: React.MouseEvent<HTMLButtonElement>) => void;
  setActiveStartDate: (nextActiveStartDate: Date, action: Action) => void;
  value: Value;
  view: View;
};

const { format } = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const event = new Event('click', {
  bubbles: true,
}) as unknown as React.MouseEvent<HTMLButtonElement>;
event.persist = () => {
  // Intentionally empty
};

describe('Calendar', () => {
  it('applies className to its wrapper when given a string', () => {
    const className = 'testClassName';

    const { container } = render(<Calendar className={className} />);

    const wrapper = container.querySelector('.react-calendar');

    expect(wrapper).toHaveClass(className);
  });

  it('passes container element to inputRef properly', () => {
    const inputRef = createRef<HTMLDivElement>();

    render(<Calendar inputRef={inputRef} />);

    expect(inputRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders Navigation by default', () => {
    const { container } = render(<Calendar />);

    const navigation = container.querySelector('.react-calendar__navigation');

    expect(navigation).toBeInTheDocument();
  });

  it('does not render Navigation when showNavigation flag is set to false', () => {
    const { container } = render(<Calendar showNavigation={false} />);

    const navigation = container.querySelector('.react-calendar__navigation');

    expect(navigation).not.toBeInTheDocument();
  });

  it('uses given value when passed value using value prop', () => {
    const instance = createRef<CalendarImperativeHandle>();

    render(<Calendar value={new Date(2019, 0, 1)} ref={instance} />);

    if (!instance.current) {
      throw new Error('Calendar ref is not set');
    }

    expect(instance.current.value).toEqual(new Date(2019, 0, 1));
  });

  it('uses given value when passed value using defaultValue prop', () => {
    const instance = createRef<CalendarImperativeHandle>();

    render(<Calendar defaultValue={new Date(2019, 0, 1)} ref={instance} />);

    if (!instance.current) {
      throw new Error('Calendar ref is not set');
    }

    expect(instance.current.value).toEqual(new Date(2019, 0, 1));
  });

  it('renders given view when passed view using view prop', () => {
    const instance = createRef<CalendarImperativeHandle>();

    render(<Calendar view="century" ref={instance} />);

    if (!instance.current) {
      throw new Error('Calendar ref is not set');
    }

    expect(instance.current.view).toBe('century');
  });

  it('renders given view when passed view using defaultView prop', () => {
    const instance = createRef<CalendarImperativeHandle>();

    render(<Calendar defaultView="century" ref={instance} />);

    if (!instance.current) {
      throw new Error('Calendar ref is not set');
    }

    expect(instance.current.view).toBe('century');
  });

  it('renders given active start date when passed active start date using activeStartDate prop', () => {
    const instance = createRef<CalendarImperativeHandle>();

    render(<Calendar activeStartDate={new Date(2019, 0, 1)} ref={instance} />);

    if (!instance.current) {
      throw new Error('Calendar ref is not set');
    }

    expect(instance.current.activeStartDate).toEqual(new Date(2019, 0, 1));
  });

  it('renders given active start date when passed active start date using activeStartDate prop', () => {
    const instance = createRef<CalendarImperativeHandle>();

    render(<Calendar defaultActiveStartDate={new Date(2019, 0, 1)} ref={instance} />);

    if (!instance.current) {
      throw new Error('Calendar ref is not set');
    }

    expect(instance.current.activeStartDate).toEqual(new Date(2019, 0, 1));
  });

  it('changes activeStartDate when updating value via props change', () => {
    const value = new Date(2018, 1, 15);
    const newValue = new Date(2018, 0, 15);
    const newActiveStartDate = new Date(2018, 0, 1);
    const instance = createRef<CalendarImperativeHandle>();

    const { rerender } = render(<Calendar value={value} ref={instance} />);

    rerender(<Calendar value={newValue} ref={instance} />);

    if (!instance.current) {
      throw new Error('Calendar ref is not set');
    }

    expect(instance.current.activeStartDate).toEqual(newActiveStartDate);
  });

  it('changes activeStartDate when updating value via onChange', () => {
    const value = new Date(2018, 1, 15);
    const newValue = new Date(2018, 0, 15);
    const newActiveStartDate = new Date(2018, 0, 1);
    const instance = createRef<CalendarImperativeHandle>();

    render(<Calendar value={value} ref={instance} />);

    act(() => {
      if (!instance.current) {
        throw new Error('Calendar ref is not set');
      }

      instance.current.onChange(newValue, event);
    });

    if (!instance.current) {
      throw new Error('Calendar ref is not set');
    }

    expect(instance.current.activeStartDate).toEqual(newActiveStartDate);
  });

  it('changes Calendar view given new activeStartDate value', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const newActiveStartDate = new Date(2018, 0, 1);
    const instance = createRef<CalendarImperativeHandle>();

    const { rerender } = render(<Calendar activeStartDate={activeStartDate} ref={instance} />);

    rerender(<Calendar activeStartDate={newActiveStartDate} ref={instance} />);

    if (!instance.current) {
      throw new Error('Calendar ref is not set');
    }

    expect(instance.current.activeStartDate).toEqual(newActiveStartDate);
  });

  describe('renders views properly', () => {
    it('renders MonthView by default', () => {
      const { container } = render(<Calendar />);

      const monthView = container.querySelector('.react-calendar__month-view');

      expect(monthView).toBeInTheDocument();
    });

    it('renders MonthView when given view = "month"', () => {
      const { container } = render(<Calendar view="month" />);

      const monthView = container.querySelector('.react-calendar__month-view');

      expect(monthView).toBeInTheDocument();
    });

    it('renders YearView when given view = "year"', () => {
      const { container } = render(<Calendar view="year" />);

      const yearView = container.querySelector('.react-calendar__year-view');

      expect(yearView).toBeInTheDocument();
    });

    it('renders DecadeView when given view = "decade"', () => {
      const { container } = render(<Calendar view="decade" />);

      const decadeView = container.querySelector('.react-calendar__decade-view');

      expect(decadeView).toBeInTheDocument();
    });

    it('renders CenturyView when given view = "century"', () => {
      const { container } = render(<Calendar view="century" />);

      const centuryView = container.querySelector('.react-calendar__century-view');

      expect(centuryView).toBeInTheDocument();
    });

    it('renders maximum allowed view when given maxDetail', () => {
      const { container } = render(<Calendar maxDetail="year" />);

      const yearView = container.querySelector('.react-calendar__year-view');

      expect(yearView).toBeInTheDocument();
    });

    it('renders maximum allowed view when given view that is not allowed', () => {
      const { container } = render(<Calendar maxDetail="year" view="month" />);

      const yearView = container.querySelector('.react-calendar__year-view');

      expect(yearView).toBeInTheDocument();
    });

    it('renders maximum allowed view when attempting to externally switch to a view that is not allowed', () => {
      const { container, rerender } = render(<Calendar maxDetail="year" view="year" />);

      rerender(<Calendar maxDetail="year" view="month" />);

      const yearView = container.querySelector('.react-calendar__year-view');

      expect(yearView).toBeInTheDocument();
    });

    it('renders maximum allowed view when given changed maxDetail', () => {
      const { container, rerender } = render(<Calendar maxDetail="month" view="month" />);

      rerender(<Calendar maxDetail="year" view="month" />);

      const yearView = container.querySelector('.react-calendar__year-view');

      expect(yearView).toBeInTheDocument();
    });
  });

  it('does not render WeekNumbers component by default', () => {
    const { container } = render(<Calendar view="month" />);

    const weekNumbers = container.querySelector('.react-calendar__month-view__weekNumbers');

    expect(weekNumbers).not.toBeInTheDocument();
  });

  it('renders WeekNumbers component given showWeekNumbers flag', () => {
    const { container } = render(<Calendar showWeekNumbers view="month" />);

    const weekNumbers = container.querySelector('.react-calendar__month-view__weekNumbers');

    expect(weekNumbers).toBeInTheDocument();
  });

  it('passes showNeighboringMonth flag to MonthView component given showNeighboringMonth flag', () => {
    const activeStartDate = new Date(2017, 0, 1);

    const { container } = render(
      <Calendar activeStartDate={activeStartDate} showNeighboringMonth view="month" />,
    );

    const firstDayTile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
    const firstDayTileTimeAbbr = firstDayTile.querySelector('abbr');

    // The first date that this calendar should show is December 26, 2016.
    expect(firstDayTileTimeAbbr).toHaveAccessibleName(format(new Date(2016, 11, 26)));
  });

  describe('displays initial view properly', () => {
    it('displays a view with a given value when defaultValue is given', () => {
      const defaultValue = new Date(2017, 0, 15);

      const { container } = render(
        <Calendar defaultValue={defaultValue} showNeighboringMonth={false} />,
      );

      const firstDayTile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
      const firstDayTileTimeAbbr = firstDayTile.querySelector('abbr');

      expect(firstDayTileTimeAbbr).toHaveAccessibleName(format(new Date(2017, 0, 1)));
    });

    it('displays a view with a given value when value is given', () => {
      const value = new Date(2017, 0, 15);

      const { container } = render(<Calendar value={value} showNeighboringMonth={false} />);

      const firstDayTile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
      const firstDayTileTimeAbbr = firstDayTile.querySelector('abbr');

      expect(firstDayTileTimeAbbr).toHaveAccessibleName(format(new Date(2017, 0, 1)));
    });

    it('displays a view with defaultActiveStartDate when value is given and defaultActiveStartDate is given', () => {
      const defaultActiveStartDate = new Date(2017, 0, 1);
      const value = new Date(2018, 0, 15);

      const { container } = render(
        <Calendar
          defaultActiveStartDate={defaultActiveStartDate}
          showNeighboringMonth={false}
          value={value}
        />,
      );

      const firstDayTile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
      const firstDayTileTimeAbbr = firstDayTile.querySelector('abbr');

      expect(firstDayTileTimeAbbr).toHaveAccessibleName(format(defaultActiveStartDate));
    });

    it('displays a view with defaultActiveStartDate when no value is given and defaultActiveStartDate is given', () => {
      const defaultActiveStartDate = new Date(2017, 0, 1);

      const { container } = render(
        <Calendar defaultActiveStartDate={defaultActiveStartDate} showNeighboringMonth={false} />,
      );

      const firstDayTile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
      const firstDayTileTimeAbbr = firstDayTile.querySelector('abbr');

      expect(firstDayTileTimeAbbr).toHaveAccessibleName(format(defaultActiveStartDate));
    });

    it('displays a view with activeStartDate when no value is given and activeStartDate is given', () => {
      const activeStartDate = new Date(2017, 0, 1);

      const { container } = render(
        <Calendar activeStartDate={activeStartDate} showNeighboringMonth={false} />,
      );

      const firstDayTile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
      const firstDayTileTimeAbbr = firstDayTile.querySelector('abbr');

      expect(firstDayTileTimeAbbr).toHaveAccessibleName(format(activeStartDate));
    });

    it("displays a view with today's date when no value and no activeStartDate is given", () => {
      const today = new Date();
      const beginOfCurrentMonth = getMonthStart(today);

      const { container } = render(<Calendar showNeighboringMonth={false} />);

      const firstDayTile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
      const firstDayTileTimeAbbr = firstDayTile.querySelector('abbr');

      expect(firstDayTileTimeAbbr).toHaveAccessibleName(format(beginOfCurrentMonth));
    });

    it('displays days on the correct weekdays when given a defaultActiveStartDate', () => {
      const defaultActiveStartDate = new Date(2012, 5, 6);

      const { container } = render(<Calendar defaultActiveStartDate={defaultActiveStartDate} />);

      const firstDayTile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
      const firstDayTileTimeAbbr = firstDayTile.querySelector('abbr');

      // The date of the first Monday that this calendar should show is May 28, 2012.
      expect(firstDayTileTimeAbbr).toHaveAccessibleName(format(new Date(2012, 4, 28)));
    });

    it('displays days on the correct weekdays when given an activeStartDate', () => {
      const activeStartDate = new Date(2012, 5, 6);

      const { container } = render(<Calendar activeStartDate={activeStartDate} />);

      const firstDayTile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
      const firstDayTileTimeAbbr = firstDayTile.querySelector('abbr');

      // The date of the first Monday that this calendar should show is May 28, 2012.
      expect(firstDayTileTimeAbbr).toHaveAccessibleName(format(new Date(2012, 4, 28)));
    });
  });

  describe('handles drill up properly', () => {
    it('drills up properly', () => {
      const activeStartDate = new Date(2017, 0, 1);

      const { container } = render(
        <Calendar activeStartDate={activeStartDate} defaultView="month" />,
      );

      const drillUpButton = container.querySelector(
        '.react-calendar__navigation__label',
      ) as HTMLButtonElement;

      act(() => {
        drillUpButton.click();
      });

      const label = container.querySelector(
        '.react-calendar__navigation__label',
      ) as HTMLButtonElement;

      expect(label).toHaveAccessibleName('2017');
    });

    it('calls onDrillUp on drill up properly given view prop', () => {
      const activeStartDate = new Date(2017, 0, 1);
      const onDrillUp = vi.fn();

      const { container } = render(
        <Calendar activeStartDate={activeStartDate} onDrillUp={onDrillUp} view="month" />,
      );

      const drillUpButton = container.querySelector(
        '.react-calendar__navigation__label',
      ) as HTMLButtonElement;

      act(() => {
        drillUpButton.click();
      });

      expect(onDrillUp).toHaveBeenCalledWith({
        action: 'drillUp',
        activeStartDate: new Date(2017, 0, 1),
        value: null,
        view: 'year',
      });
    });

    it('calls onDrillUp on drill up properly when not given view prop', () => {
      const activeStartDate = new Date(2017, 0, 1);
      const onDrillUp = vi.fn();

      const { container } = render(
        <Calendar activeStartDate={activeStartDate} onDrillUp={onDrillUp} defaultView="month" />,
      );

      const drillUpButton = container.querySelector(
        '.react-calendar__navigation__label',
      ) as HTMLButtonElement;

      act(() => {
        drillUpButton.click();
      });

      expect(onDrillUp).toHaveBeenCalledWith({
        action: 'drillUp',
        activeStartDate: new Date(2017, 0, 1),
        value: null,
        view: 'year',
      });
    });

    it('refuses to drill up when already on minimum allowed detail', () => {
      const onDrillUp = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(<Calendar onDrillUp={onDrillUp} view="century" ref={instance} />);

      act(() => {
        if (!instance.current) {
          throw new Error('Calendar ref is not set');
        }

        instance.current.drillUp();
      });

      expect(onDrillUp).not.toHaveBeenCalled();
    });
  });

  describe('handles drill down properly', () => {
    it('drills down properly', () => {
      const activeStartDate = new Date(2011, 0, 1);

      const { container } = render(
        <Calendar activeStartDate={activeStartDate} defaultView="century" />,
      );

      const tile = container.querySelector('.react-calendar__tile') as HTMLButtonElement;

      act(() => {
        tile.click();
      });

      const label = container.querySelector(
        '.react-calendar__navigation__label',
      ) as HTMLButtonElement;

      expect(label).toHaveAccessibleName('2011 – 2020');
    });

    it('calls onDrillDown on drill down properly given view prop', () => {
      const activeStartDate = new Date(2001, 0, 1);
      const onDrillDown = vi.fn();

      const { container } = render(
        <Calendar activeStartDate={activeStartDate} view="century" onDrillDown={onDrillDown} />,
      );

      const tile = container.querySelector('.react-calendar__tile') as HTMLButtonElement;

      act(() => {
        tile.click();
      });

      expect(onDrillDown).toHaveBeenCalledWith({
        action: 'drillDown',
        activeStartDate: new Date(2001, 0, 1),
        value: null,
        view: 'decade',
      });
    });

    it('calls onDrillDown on drill down when not given view prop', () => {
      const activeStartDate = new Date(2001, 0, 1);
      const onDrillDown = vi.fn();

      const { container } = render(
        <Calendar
          activeStartDate={activeStartDate}
          defaultView="century"
          onDrillDown={onDrillDown}
        />,
      );

      const tile = container.querySelector('.react-calendar__tile') as HTMLButtonElement;

      act(() => {
        tile.click();
      });

      expect(onDrillDown).toHaveBeenCalledWith({
        action: 'drillDown',
        activeStartDate: new Date(2001, 0, 1),
        value: null,
        view: 'decade',
      });
    });

    it('refuses to drill down when already on minimum allowed detail', () => {
      const onDrillDown = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(<Calendar onDrillDown={onDrillDown} view="month" ref={instance} />);

      act(() => {
        if (!instance.current) {
          throw new Error('Calendar ref is not set');
        }

        instance.current.drillUp();
      });

      expect(onDrillDown).not.toHaveBeenCalled();
    });
  });

  describe('handles active start date change properly', () => {
    it('changes active start date when allowed', () => {
      const instance = createRef<CalendarImperativeHandle>();

      render(<Calendar ref={instance} />);

      act(() => {
        if (!instance.current) {
          throw new Error('Calendar ref is not set');
        }

        instance.current.setActiveStartDate(new Date(2019, 0, 1), 'onChange');
      });

      if (!instance.current) {
        throw new Error('Calendar ref is not set');
      }

      expect(instance.current.activeStartDate).toEqual(new Date(2019, 0, 1));
    });

    it('calls onActiveStartDateChange on activeStartDate initial set', () => {
      const value = new Date(2019, 0, 15);
      const newActiveStartDate = new Date(2018, 0, 1);
      const onActiveStartDateChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(
        <Calendar
          onActiveStartDateChange={onActiveStartDateChange}
          value={value}
          view="year"
          ref={instance}
        />,
      );

      act(() => {
        if (!instance.current) {
          throw new Error('Calendar ref is not set');
        }

        instance.current.setActiveStartDate(newActiveStartDate, 'onChange');
      });

      expect(onActiveStartDateChange).toHaveBeenCalledWith({
        action: 'onChange',
        activeStartDate: newActiveStartDate,
        value,
        view: 'year',
      });
    });

    it('calls onActiveStartDateChange on activeStartDate change', () => {
      const value = new Date(2019, 0, 15);
      const activeStartDate = new Date(2017, 0, 1);
      const newActiveStartDate = new Date(2018, 0, 1);
      const onActiveStartDateChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(
        <Calendar
          activeStartDate={activeStartDate}
          onActiveStartDateChange={onActiveStartDateChange}
          value={value}
          view="year"
          ref={instance}
        />,
      );

      act(() => {
        if (!instance.current) {
          throw new Error('Calendar ref is not set');
        }

        instance.current.setActiveStartDate(newActiveStartDate, 'onChange');
      });

      expect(onActiveStartDateChange).toHaveBeenCalledWith({
        action: 'onChange',
        activeStartDate: newActiveStartDate,
        value,
        view: 'year',
      });
    });

    it('does not call onActiveStartDateChange on activeStartDate change if value is the same as before', () => {
      const activeStartDate = new Date(2017, 0, 1);
      const newActiveStartDate = new Date(2017, 0, 1);
      const onActiveStartDateChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(
        <Calendar
          activeStartDate={activeStartDate}
          onActiveStartDateChange={onActiveStartDateChange}
          view="year"
          ref={instance}
        />,
      );

      act(() => {
        if (!instance.current) {
          throw new Error('Calendar ref is not set');
        }

        instance.current.setActiveStartDate(newActiveStartDate, 'onChange');
      });

      expect(onActiveStartDateChange).not.toHaveBeenCalled();
    });

    it('does not call onActiveStartDateChange on activeStartDate change if value is the same as previously inherited', () => {
      const value = new Date(2017, 0, 1);
      const newActiveStartDate = new Date(2017, 0, 1);
      const onActiveStartDateChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(
        <Calendar
          onActiveStartDateChange={onActiveStartDateChange}
          value={value}
          view="year"
          ref={instance}
        />,
      );

      act(() => {
        if (!instance.current) {
          throw new Error('Calendar ref is not set');
        }

        instance.current.setActiveStartDate(newActiveStartDate, 'onChange');
      });

      expect(onActiveStartDateChange).not.toHaveBeenCalled();
    });
  });

  describe('handles view change properly', () => {
    it('calls onViewChange on drill up', () => {
      const activeStartDate = new Date(2017, 0, 1);
      const onViewChange = vi.fn();
      const value = new Date(2019, 0, 15);
      const view = 'month';

      const { container } = render(
        <Calendar
          activeStartDate={activeStartDate}
          onViewChange={onViewChange}
          value={value}
          view={view}
        />,
      );

      const drillUpButton = container.querySelector(
        'button.react-calendar__navigation__label',
      ) as HTMLButtonElement;

      act(() => {
        drillUpButton.click();
      });

      expect(onViewChange).toHaveBeenCalledWith({
        action: 'drillUp',
        activeStartDate,
        value,
        view: 'year',
      });
    });

    it('calls onViewChange on tile click', async () => {
      const activeStartDate = new Date(2017, 0, 1);
      const onViewChange = vi.fn();
      const value = new Date(2019, 0, 15);
      const view = 'year';

      const { container } = render(
        <Calendar
          activeStartDate={activeStartDate}
          onViewChange={onViewChange}
          value={value}
          view={view}
        />,
      );

      const tile = container.querySelector('button.react-calendar__tile') as HTMLButtonElement;

      act(() => {
        tile.click();
      });

      expect(onViewChange).toHaveBeenCalledWith({
        action: 'drillDown',
        activeStartDate,
        value,
        view: 'month',
      });
    });

    it('does not call onViewChange if value is the same as before', () => {
      const view = 'month';
      const onViewChange = vi.fn();

      const { container } = render(<Calendar onViewChange={onViewChange} view={view} />);

      const tile = container.querySelector('button.react-calendar__tile') as HTMLButtonElement;

      act(() => {
        tile.click();
      });

      expect(onViewChange).not.toHaveBeenCalled();
    });
  });

  describe('calls onChange properly', () => {
    it('calls onChange function returning the beginning of selected period by default', () => {
      const onChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(<Calendar onChange={onChange} view="month" ref={instance} />);

      if (!instance.current) {
        throw new Error('Calendar ref is not set');
      }

      const { onChange: onChangeInternal } = instance.current;

      act(() => {
        onChangeInternal(new Date(2017, 0, 1), event);
      });

      expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1), event);
    });

    it('calls onChange function returning the beginning of the selected period when returnValue is set to "start"', () => {
      const onChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(<Calendar onChange={onChange} returnValue="start" view="month" ref={instance} />);

      if (!instance.current) {
        throw new Error('Calendar ref is not set');
      }

      const { onChange: onChangeInternal } = instance.current;

      act(() => {
        onChangeInternal(new Date(2017, 0, 1), event);
      });

      expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1), event);
    });

    it('calls onChange function returning the end of the selected period when returnValue is set to "end"', () => {
      const onChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(<Calendar onChange={onChange} returnValue="end" view="month" ref={instance} />);

      if (!instance.current) {
        throw new Error('Calendar ref is not set');
      }

      const { onChange: onChangeInternal } = instance.current;

      act(() => {
        onChangeInternal(new Date(2017, 0, 1), event);
      });

      expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1, 23, 59, 59, 999), event);
    });

    it('calls onChange function returning the beginning of selected period when returnValue is set to "range"', () => {
      const onChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(<Calendar onChange={onChange} returnValue="range" view="month" ref={instance} />);

      if (!instance.current) {
        throw new Error('Calendar ref is not set');
      }

      const { onChange: onChangeInternal } = instance.current;

      act(() => {
        onChangeInternal(new Date(2017, 0, 1), event);
      });

      expect(onChange).toHaveBeenCalledWith(
        [new Date(2017, 0, 1), new Date(2017, 0, 1, 23, 59, 59, 999)],
        event,
      );
    });

    it('calls onChange function returning the beginning of selected period, but no earlier than minDate', () => {
      const onChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(
        <Calendar
          minDate={new Date(2017, 0, 1, 12)}
          onChange={onChange}
          returnValue="start"
          view="month"
          ref={instance}
        />,
      );

      if (!instance.current) {
        throw new Error('Calendar ref is not set');
      }

      const { onChange: onChangeInternal } = instance.current;

      act(() => {
        onChangeInternal(new Date(2017, 0, 1), event);
      });

      expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1, 12), event);
    });

    it('calls onChange function returning the beginning of selected period, but no later than maxDate', () => {
      const onChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(
        <Calendar
          maxDate={new Date(2017, 0, 1, 12)}
          onChange={onChange}
          returnValue="start"
          view="month"
          ref={instance}
        />,
      );

      if (!instance.current) {
        throw new Error('Calendar ref is not set');
      }

      const { onChange: onChangeInternal } = instance.current;

      act(() => {
        onChangeInternal(new Date(2017, 0, 2), event);
      });

      expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1, 12), event);
    });

    it('calls onChange function returning the end of selected period, but no earlier than minDate', () => {
      const onChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(
        <Calendar
          minDate={new Date(2017, 0, 2, 12)}
          onChange={onChange}
          returnValue="end"
          view="month"
          ref={instance}
        />,
      );

      if (!instance.current) {
        throw new Error('Calendar ref is not set');
      }

      const { onChange: onChangeInternal } = instance.current;

      act(() => {
        onChangeInternal(new Date(2017, 0, 1), event);
      });

      expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 2, 12), event);
    });

    it('calls onChange function returning the end of selected period, but no later than maxDate', () => {
      const onChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(
        <Calendar
          maxDate={new Date(2017, 0, 1, 12)}
          onChange={onChange}
          returnValue="end"
          view="month"
          ref={instance}
        />,
      );

      if (!instance.current) {
        throw new Error('Calendar ref is not set');
      }

      const { onChange: onChangeInternal } = instance.current;

      act(() => {
        onChangeInternal(new Date(2017, 0, 2), event);
      });

      expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1, 12), event);
    });

    it('does not call onChange function returning a range when selected one piece of a range by default', () => {
      const onChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(<Calendar onChange={onChange} selectRange view="month" ref={instance} />);

      if (!instance.current) {
        throw new Error('Calendar ref is not set');
      }

      const { onChange: onChangeInternal } = instance.current;

      act(() => {
        onChangeInternal(new Date(2018, 0, 1), event);
      });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not call onChange function returning a range when selected one piece of a range given allowPartialRange = false', () => {
      const onChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(
        <Calendar
          allowPartialRange={false}
          onChange={onChange}
          selectRange
          view="month"
          ref={instance}
        />,
      );

      if (!instance.current) {
        throw new Error('Calendar ref is not set');
      }

      const { onChange: onChangeInternal } = instance.current;

      act(() => {
        onChangeInternal(new Date(2018, 0, 1), event);
      });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('calls onChange function returning a partial range when selected one piece of a range given allowPartialRange = true', () => {
      const onChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(
        <Calendar allowPartialRange onChange={onChange} selectRange view="month" ref={instance} />,
      );

      if (!instance.current) {
        throw new Error('Calendar ref is not set');
      }

      const { onChange: onChangeInternal } = instance.current;

      act(() => {
        onChangeInternal(new Date(2018, 0, 1), event);
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([new Date(2018, 0, 1), null], event);
    });

    it('calls onChange function returning a range when selected two pieces of a range', async () => {
      const onChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(<Calendar onChange={onChange} selectRange view="month" ref={instance} />);

      if (!instance.current) {
        throw new Error('Calendar ref is not set');
      }

      const { onChange: onChangeInternal } = instance.current;

      act(() => {
        onChangeInternal(new Date(2018, 0, 1), event);
      });

      const { onChange: onChangeInternal2 } = instance.current;

      act(() => {
        onChangeInternal2(new Date(2018, 6, 1), event);
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        [new Date(2018, 0, 1), new Date(2018, 6, 1, 23, 59, 59, 999)],
        event,
      );
    });

    it('calls onChange function returning a range when selected reversed two pieces of a range', async () => {
      const onChange = vi.fn();
      const instance = createRef<CalendarImperativeHandle>();

      render(<Calendar onChange={onChange} selectRange view="month" ref={instance} />);

      if (!instance.current) {
        throw new Error('Calendar ref is not set');
      }

      const { onChange: onChangeInternal } = instance.current;

      act(() => {
        onChangeInternal(new Date(2018, 6, 1), event);
      });

      const { onChange: onChangeInternal2 } = instance.current;

      act(() => {
        onChangeInternal2(new Date(2018, 0, 1), event);
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        [new Date(2018, 0, 1), new Date(2018, 6, 1, 23, 59, 59, 999)],
        event,
      );
    });
  });

  it('passes formatMonthYear to Navigation component', () => {
    const formatMonthYear = () => 'Month year';

    const { container } = render(<Calendar formatMonthYear={formatMonthYear} />);

    const navigation = container.querySelector('.react-calendar__navigation');

    expect(navigation).toHaveTextContent('Month year');
  });

  it('passes formatYear to Navigation component', () => {
    const formatYear = () => 'Year';

    const { container } = render(<Calendar formatYear={formatYear} view="year" />);

    const navigation = container.querySelector('.react-calendar__navigation');

    expect(navigation).toHaveTextContent('Year');
  });

  it('passes formatDay to MonthView component', () => {
    const formatDay = () => 'Day';

    const { container } = render(<Calendar formatDay={formatDay} />);

    const monthView = container.querySelector('.react-calendar__month-view');

    expect(monthView).toHaveTextContent('Day');
  });

  it('passes formatLongDate to MonthView component', () => {
    const formatLongDate = () => 'Long date';

    const { container } = render(<Calendar formatLongDate={formatLongDate} />);

    const firstDayTile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
    const firstDayTileTimeAbbr = firstDayTile.querySelector('abbr');

    expect(firstDayTileTimeAbbr).toHaveAccessibleName('Long date');
  });

  it('passes formatShortWeekday to MonthView component', () => {
    const formatShortWeekday = () => 'Wkdy';

    const { container } = render(<Calendar formatShortWeekday={formatShortWeekday} />);

    const monthView = container.querySelector('.react-calendar__month-view');

    expect(monthView).toHaveTextContent('Wkdy');
  });

  it('passes formatWeekday to MonthView component', () => {
    const formatWeekday = () => 'Weekday';

    const { container } = render(<Calendar formatWeekday={formatWeekday} />);

    const weekday = container.querySelector(
      '.react-calendar__month-view__weekdays__weekday',
    ) as HTMLDivElement;
    const abbr = weekday.querySelector('abbr');

    expect(abbr).toHaveAccessibleName('Weekday');
  });

  it('passes formatMonth to YearView component', () => {
    const formatMonth = () => 'Month';

    const { container } = render(<Calendar formatMonth={formatMonth} view="year" />);

    const yearView = container.querySelector('.react-calendar__year-view');

    expect(yearView).toHaveTextContent('Month');
  });

  it('passes formatYear to DecadeView component', () => {
    const formatYear = () => 'Year';

    const { container } = render(<Calendar formatYear={formatYear} view="decade" />);

    const decadeView = container.querySelector('.react-calendar__decade-view');

    expect(decadeView).toHaveTextContent('Year');
  });

  it('passes formatYear to CenturyView component', () => {
    const formatYear = () => 'Year';

    const { container } = render(<Calendar formatYear={formatYear} view="century" />);

    const centuryView = container.querySelector('.react-calendar__century-view');

    expect(centuryView).toHaveTextContent('Year');
  });
});
