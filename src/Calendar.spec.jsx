import React from 'react';
import { mount, shallow } from 'enzyme';
import { getMonthStart } from '@wojtekmaj/date-utils';

import Calendar from './Calendar';

describe('Calendar', () => {
  it('renders Navigation by default', () => {
    const component = shallow(
      <Calendar />,
    );

    const navigation = component.find('Navigation');

    expect(navigation).toHaveLength(1);
  });

  it('does not render Navigation when showNavigation flag is set to false', () => {
    const component = shallow(
      <Calendar showNavigation={false} />,
    );

    const navigation = component.find('Navigation');

    expect(navigation).toHaveLength(0);
  });

  describe('renders views properly', () => {
    it('renders MonthView by default', () => {
      const component = shallow(
        <Calendar />,
      );

      const monthView = component.find('MonthView');

      expect(monthView).toHaveLength(1);
    });

    it('renders MonthView when given view = "month"', () => {
      const component = shallow(
        <Calendar view="month" />,
      );

      const monthView = component.find('MonthView');

      expect(monthView).toHaveLength(1);
    });

    it('renders YearView when given view = "year"', () => {
      const component = mount(
        <Calendar view="year" />,
      );

      const yearView = component.find('YearView');

      expect(yearView).toHaveLength(1);
    });

    it('renders DecadeView when given view = "decade"', () => {
      const component = mount(
        <Calendar view="decade" />,
      );

      const decadeView = component.find('DecadeView');

      expect(decadeView).toHaveLength(1);
    });

    it('renders CenturyView when given view = "century"', () => {
      const component = mount(
        <Calendar view="century" />,
      );

      const centuryView = component.find('CenturyView');

      expect(centuryView).toHaveLength(1);
    });

    it('renders maximum allowed view when given maxDetail', () => {
      const component = shallow(
        <Calendar maxDetail="year" />,
      );

      const yearView = component.find('YearView');

      expect(yearView).toHaveLength(1);
    });

    it('renders maximum allowed view when given view that is not allowed', () => {
      const component = shallow(
        <Calendar
          maxDetail="year"
          view="month"
        />,
      );

      const yearView = component.find('YearView');

      expect(yearView).toHaveLength(1);
    });

    it('renders maximum allowed view when attempting to externally switch to a view that is not allowed', () => {
      const component = shallow(
        <Calendar
          maxDetail="year"
          view="year"
        />,
      );

      component.setProps({ view: 'month' });
      component.update();

      const yearView = component.find('YearView');

      expect(yearView).toHaveLength(1);
    });

    it('renders maximum allowed view when given changed maxDetail', () => {
      const component = shallow(
        <Calendar
          maxDetail="month"
          view="month"
        />,
      );

      component.setProps({ maxDetail: 'year' });
      component.update();

      const yearView = component.find('YearView');

      expect(yearView).toHaveLength(1);
    });
  });

  it('does not pass showWeekNumbers flag to MonthView component by default', () => {
    const component = shallow(
      <Calendar
        view="month"
      />,
    );

    const monthView = component.find('MonthView');

    expect(monthView.prop('showWeekNumbers')).toBeFalsy();
  });

  it('passes showWeekNumbers flag to MonthView component given showWeekNumbers flag', () => {
    const component = shallow(
      <Calendar
        showWeekNumbers
        view="month"
      />,
    );

    const monthView = component.find('MonthView');

    expect(monthView.prop('showWeekNumbers')).toBeTruthy();
  });

  it('passes showNeighboringMonth flag to MonthView component given showNeighboringMonth flag', () => {
    const component = shallow(
      <Calendar
        showNeighboringMonth
        view="month"
      />,
    );

    const monthView = component.find('MonthView');

    expect(monthView.prop('showNeighboringMonth')).toBeTruthy();
  });

  it('displays a view with a given value when defaultValue is given', () => {
    const defaultValue = new Date(2017, 0, 15);
    const component = shallow(
      <Calendar
        defaultValue={defaultValue}
      />,
    );

    const monthView = component.find('MonthView');

    expect(monthView.prop('activeStartDate')).toEqual(new Date(2017, 0, 1));
  });

  it('displays a view with a given value when value is given', () => {
    const value = new Date(2017, 0, 15);
    const component = shallow(
      <Calendar
        value={value}
      />,
    );

    const monthView = component.find('MonthView');

    expect(monthView.prop('activeStartDate')).toEqual(new Date(2017, 0, 1));
  });

  it('displays a view with defaultActiveStartDate when value is given and defaultActiveStartDate is given', () => {
    const defaultActiveStartDate = new Date(2017, 0, 1);
    const value = new Date(2018, 0, 15);
    const component = shallow(
      <Calendar
        defaultActiveStartDate={defaultActiveStartDate}
        value={value}
      />,
    );

    const monthView = component.find('MonthView');

    expect(monthView.prop('activeStartDate')).toEqual(defaultActiveStartDate);
  });

  it('displays a view with defaultActiveStartDate when no value is given and defaultActiveStartDate is given', () => {
    const defaultActiveStartDate = new Date(2017, 0, 1);
    const component = shallow(
      <Calendar
        defaultActiveStartDate={defaultActiveStartDate}
      />,
    );

    const monthView = component.find('MonthView');

    expect(monthView.prop('activeStartDate')).toEqual(defaultActiveStartDate);
  });

  it('displays a view with activeStartDate when no value is given and activeStartDate is given', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const component = shallow(
      <Calendar
        activeStartDate={activeStartDate}
      />,
    );

    const monthView = component.find('MonthView');

    expect(monthView.prop('activeStartDate')).toEqual(activeStartDate);
  });

  it('displays a view with today\'s date when no value and no activeStartDate is given', () => {
    const today = new Date();
    const beginOfCurrentMonth = getMonthStart(today);
    const component = shallow(
      <Calendar />,
    );

    const monthView = component.find('MonthView');

    expect(monthView.prop('activeStartDate')).toEqual(beginOfCurrentMonth);
  });

  describe('handles drill up properly', () => {
    it('drills up when allowed', () => {
      const component = mount(
        <Calendar view="month" />,
      );

      component.instance().drillUp();

      expect(component.state().view).toBe('year');
    });

    it('calls onDrillUp on drill up', () => {
      const onDrillUp = jest.fn();

      const component = mount(
        <Calendar
          activeStartDate={new Date(2017, 6, 1)}
          onDrillUp={onDrillUp}
          view="month"
        />,
      );

      component.instance().drillUp();

      expect(onDrillUp).toHaveBeenCalledWith({
        activeStartDate: new Date(2017, 0, 1),
        view: 'year',
      });
    });

    it('refuses to drill up when already on minimum allowed detail', () => {
      const onDrillUp = jest.fn();

      const component = mount(
        <Calendar
          onDrillUp={onDrillUp}
          view="century"
        />,
      );

      component.instance().drillUp();

      expect(onDrillUp).not.toHaveBeenCalled();
    });
  });

  describe('handles drill down properly', () => {
    it('drills down when allowed', () => {
      const component = mount(
        <Calendar view="century" />,
      );

      component.instance().drillDown(new Date(2011, 0, 1));

      expect(component.state().view).toBe('decade');
    });

    it('calls onDrillDown on drill down', () => {
      const onDrillDown = jest.fn();

      const component = mount(
        <Calendar
          activeStartDate={new Date(2001, 0, 1)}
          onDrillDown={onDrillDown}
          view="century"
        />,
      );

      component.instance().drillDown(new Date(2011, 0, 1));

      expect(onDrillDown).toHaveBeenCalledWith({
        activeStartDate: new Date(2011, 0, 1),
        view: 'decade',
      });
    });

    it('refuses to drill down when already on minimum allowed detail', () => {
      const onDrillDown = jest.fn();

      const component = mount(
        <Calendar
          onDrillDown={onDrillDown}
          view="month"
        />,
      );

      component.instance().drillUp();

      expect(onDrillDown).not.toHaveBeenCalled();
    });
  });

  describe('calls onChange properly', () => {
    it('calls onChange function returning the beginning of selected period by default', () => {
      const onChange = jest.fn();
      const component = mount(
        <Calendar
          onChange={onChange}
          view="month"
        />,
      );

      component.instance().onChange(new Date(2017, 0, 1));

      expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1));
    });

    it('calls onChange function returning the beginning of the selected period when returnValue is set to "start"', () => {
      const onChange = jest.fn();
      const component = mount(
        <Calendar
          onChange={onChange}
          returnValue="start"
          view="month"
        />,
      );

      component.instance().onChange(new Date(2017, 0, 1));

      expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1));
    });

    it('calls onChange function returning the beginning of the selected period when returnValue is set to "start"', () => {
      const onChange = jest.fn();
      const component = mount(
        <Calendar
          onChange={onChange}
          returnValue="start"
          view="month"
        />,
      );

      component.instance().onChange(new Date(2017, 0, 1));

      expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1));
    });

    it('calls onChange function returning the end of the selected period when returnValue is set to "end"', () => {
      const onChange = jest.fn();
      const component = mount(
        <Calendar
          onChange={onChange}
          returnValue="end"
          view="month"
        />,
      );

      component.instance().onChange(new Date(2017, 0, 1));

      expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1, 23, 59, 59, 999));
    });

    it('calls onChange function returning the beginning of selected period when returnValue is set to "range"', () => {
      const onChange = jest.fn();
      const component = mount(
        <Calendar
          onChange={onChange}
          returnValue="range"
          view="month"
        />,
      );

      component.instance().onChange(new Date(2017, 0, 1));

      expect(onChange).toHaveBeenCalledWith([
        new Date(2017, 0, 1),
        new Date(2017, 0, 1, 23, 59, 59, 999),
      ]);
    });

    it('calls onChange function returning the beginning of selected period, but no earlier than minDate', () => {
      const onChange = jest.fn();
      const component = mount(
        <Calendar
          minDate={new Date(2017, 0, 1, 12)}
          onChange={onChange}
          returnValue="start"
          view="month"
        />,
      );

      component.instance().onChange(new Date(2017, 0, 1));

      expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1, 12));
    });

    it('calls onChange function returning the beginning of selected period, but no later than maxDate', () => {
      const onChange = jest.fn();
      const component = mount(
        <Calendar
          maxDate={new Date(2017, 0, 1, 12)}
          onChange={onChange}
          returnValue="start"
          view="month"
        />,
      );

      component.instance().onChange(new Date(2017, 0, 2));

      expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1, 12));
    });

    it('calls onChange function returning the end of selected period, but no earlier than minDate', () => {
      const onChange = jest.fn();
      const component = mount(
        <Calendar
          minDate={new Date(2017, 0, 2, 12)}
          onChange={onChange}
          returnValue="end"
          view="month"
        />,
      );

      component.instance().onChange(new Date(2017, 0, 1));

      expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 2, 12));
    });

    it('calls onChange function returning the end of selected period, but no later than maxDate', () => {
      const onChange = jest.fn();
      const component = mount(
        <Calendar
          maxDate={new Date(2017, 0, 1, 12)}
          onChange={onChange}
          returnValue="end"
          view="month"
        />,
      );

      component.instance().onChange(new Date(2017, 0, 2));

      expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1, 12));
    });

    it('calls onChange function returning a range when selected two pieces of a range', () => {
      const onChange = jest.fn();
      const component = mount(
        <Calendar
          onChange={onChange}
          selectRange
          view="month"
        />,
      );

      component.instance().onChange(new Date(2018, 0, 1));
      component.instance().onChange(new Date(2018, 6, 1));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([
        new Date(2018, 0, 1),
        new Date(2018, 6, 1, 23, 59, 59, 999),
      ]);
    });

    it('calls onChange function returning a range when selected reversed two pieces of a range', () => {
      const onChange = jest.fn();
      const component = mount(
        <Calendar
          onChange={onChange}
          selectRange
          view="month"
        />,
      );

      component.instance().onChange(new Date(2018, 6, 1));
      component.instance().onChange(new Date(2018, 0, 1));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([
        new Date(2018, 0, 1),
        new Date(2018, 6, 1, 23, 59, 59, 999),
      ]);
    });
  });

  it('calls onActiveStartDateChange on activeStartDate change', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const newActiveStartDate = new Date(2018, 0, 1);
    const onActiveStartDateChange = jest.fn();
    const component = mount(
      <Calendar
        activeStartDate={activeStartDate}
        onActiveStartDateChange={onActiveStartDateChange}
        view="year"
      />,
    );

    component.instance().setActiveStartDate(newActiveStartDate);

    expect(onActiveStartDateChange).toHaveBeenCalledWith({
      activeStartDate: newActiveStartDate,
      view: 'year',
    });
  });

  it('changes Calendar view given new activeStartDate value', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const newActiveStartDate = new Date(2018, 0, 1);
    const component = mount(
      <Calendar activeStartDate={activeStartDate} />,
    );

    component.setProps({ activeStartDate: newActiveStartDate });

    const monthView = component.find('MonthView');

    expect(monthView.prop('activeStartDate')).toEqual(newActiveStartDate);
  });

  it('passes formatMonthYear to Navigation component', () => {
    const formatMonthYear = () => 'Month year';
    const component = shallow(
      <Calendar
        formatMonthYear={formatMonthYear}
      />,
    );

    const navigation = component.find('Navigation');

    expect(navigation.prop('formatMonthYear')).toBe(formatMonthYear);
  });

  it('passes formatYear to Navigation component', () => {
    const formatYear = () => 'Year';
    const component = shallow(
      <Calendar
        formatYear={formatYear}
      />,
    );

    const navigation = component.find('Navigation');

    expect(navigation.prop('formatYear')).toBe(formatYear);
  });

  it('passes formatLongDate to MonthView component', () => {
    const formatLongDate = () => 'Long date';
    const component = shallow(
      <Calendar
        formatLongDate={formatLongDate}
      />,
    );

    const monthView = component.find('MonthView');

    expect(monthView.prop('formatLongDate')).toBe(formatLongDate);
  });

  it('passes formatShortWeekday to MonthView component', () => {
    const formatShortWeekday = () => 'Weekday';
    const component = shallow(
      <Calendar
        formatShortWeekday={formatShortWeekday}
      />,
    );

    const monthView = component.find('MonthView');

    expect(monthView.prop('formatShortWeekday')).toBe(formatShortWeekday);
  });

  it('passes formatMonth to YearView component', () => {
    const formatMonth = () => 'Month';
    const component = shallow(
      <Calendar
        formatMonth={formatMonth}
        view="year"
      />,
    );

    const yearView = component.find('YearView');

    expect(yearView.prop('formatMonth')).toBe(formatMonth);
  });

  it('passes formatYear to DecadeView component', () => {
    const formatYear = () => 'Year';
    const component = shallow(
      <Calendar
        formatYear={formatYear}
        view="decade"
      />,
    );

    const decadeView = component.find('DecadeView');

    expect(decadeView.prop('formatYear')).toBe(formatYear);
  });

  it('passes formatYear to CenturyView component', () => {
    const formatYear = () => 'Year';
    const component = shallow(
      <Calendar
        formatYear={formatYear}
        view="century"
      />,
    );

    const centuryView = component.find('CenturyView');

    expect(centuryView.prop('formatYear')).toBe(formatYear);
  });
});
