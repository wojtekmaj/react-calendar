import React from 'react';
import { mount } from 'enzyme';

import Calendar from '../Calendar';
import {
  getBeginOfMonth,
  getISOLocalDate,
} from '../shared/dates';

/* eslint-disable comma-dangle */

const midnightTimestamp = 'T00:00:00.000';

describe('Calendar', () => {
  it('renders navigation', () => {
    const component = mount(
      <Calendar />
    );

    const navigation = component.find('.react-calendar__navigation');

    expect(navigation).toHaveLength(1);
  });

  it('does not render navigation when showNavigation flag is set to false', () => {
    const component = mount(
      <Calendar showNavigation={false} />
    );

    const navigation = component.find('.react-calendar__navigation');

    expect(navigation).toHaveLength(0);
  });

  it('renders month view by default', () => {
    const component = mount(
      <Calendar />
    );

    const monthView = component.find('.react-calendar__month-view');

    expect(monthView).toHaveLength(1);
  });

  it('renders maximum allowed view when given maxDetail', () => {
    const component = mount(
      <Calendar maxDetail="year" />
    );

    const yearView = component.find('.react-calendar__year-view');

    expect(yearView).toHaveLength(1);
  });

  it('renders maximum allowed view when given view that is not allowed', () => {
    const component = mount(
      <Calendar
        maxDetail="year"
        view="month"
      />
    );

    const yearView = component.find('.react-calendar__year-view');

    expect(yearView).toHaveLength(1);
  });

  it('renders maximum allowed view when attempting to externally switch to a view that is not allowed', () => {
    const component = mount(
      <Calendar
        maxDetail="year"
        view="year"
      />
    );

    component.setProps({ view: 'month' });
    component.update();

    const yearView = component.find('.react-calendar__year-view');

    expect(yearView).toHaveLength(1);
  });

  it('renders maximum allowed view when given changed maxDetail', () => {
    const component = mount(
      <Calendar
        maxDetail="month"
        view="month"
      />
    );

    component.setProps({ maxDetail: 'year' });
    component.update();

    const yearView = component.find('.react-calendar__year-view');

    expect(yearView).toHaveLength(1);
  });

  it('renders month view when given view = "month"', () => {
    const component = mount(
      <Calendar view="month" />
    );

    const monthView = component.find('.react-calendar__month-view');

    expect(monthView).toHaveLength(1);
    expect(component.state().view).toBe('month');
  });

  it('renders month view with week numbers when given view = "month" and showWeekNumbers flag set to true', () => {
    const component = mount(
      <Calendar
        view="month"
        showWeekNumbers
      />
    );

    const monthView = component.find('.react-calendar__month-view--weekNumbers');

    expect(monthView).toHaveLength(1);
    expect(component.state().view).toBe('month');
  });

  it('renders year view when given view = "year"', () => {
    const component = mount(
      <Calendar view="year" />
    );

    const yearView = component.find('.react-calendar__year-view');

    expect(yearView).toHaveLength(1);
    expect(component.state().view).toBe('year');
  });

  it('renders decade view when given view = "decade"', () => {
    const component = mount(
      <Calendar view="decade" />
    );

    const decadeView = component.find('.react-calendar__decade-view');

    expect(decadeView).toHaveLength(1);
    expect(component.state().view).toBe('decade');
  });

  it('renders century view when given view = "century"', () => {
    const component = mount(
      <Calendar view="century" />
    );

    const centuryView = component.find('.react-calendar__century-view');

    expect(centuryView).toHaveLength(1);
    expect(component.state().view).toBe('century');
  });

  it('displays a view with a given value when value is given', () => {
    const value = new Date(2017, 0, 1);
    const component = mount(
      <Calendar
        showNeighboringMonth={false}
        value={value}
      />
    );

    const monthView = component.find('.react-calendar__month-view');
    const firstDayTile = monthView.find('.react-calendar__tile').first();
    const firstDayTileTimeISO = firstDayTile.find('time').prop('dateTime');

    expect(firstDayTileTimeISO).toBe(getISOLocalDate(value) + midnightTimestamp);
  });

  it('displays a view with activeStartDate when no value is given and activeStartDate is given', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const component = mount(
      <Calendar
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
      />
    );

    const monthView = component.find('.react-calendar__month-view');
    const firstDayTile = monthView.find('.react-calendar__tile').first();
    const firstDayTileTimeISO = firstDayTile.find('time').prop('dateTime');

    expect(firstDayTileTimeISO).toBe(getISOLocalDate(activeStartDate) + midnightTimestamp);
  });

  it('displays a view with today\'s date when no value and no activeStartDate is given', () => {
    const today = new Date();
    const beginOfCurrentMonth = getBeginOfMonth(today);
    const component = mount(
      <Calendar showNeighboringMonth={false} />
    );

    const monthView = component.find('.react-calendar__month-view');
    const firstDayTile = monthView.find('.react-calendar__tile').first();
    const firstDayTileTimeISO = firstDayTile.find('time').prop('dateTime');

    expect(firstDayTileTimeISO).toBe(getISOLocalDate(beginOfCurrentMonth) + midnightTimestamp);
  });

  it('drills up when allowed', () => {
    const component = mount(
      <Calendar view="month" />
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
      />
    );

    component.instance().drillUp();

    expect(onDrillUp).toHaveBeenCalledWith({
      activeStartDate: new Date(2017, 0, 1),
      view: 'year',
    });
  });

  it('refuses to drill up when already on minimum allowed detail', () => {
    const component = mount(
      <Calendar view="century" />
    );

    component.instance().drillUp();

    expect(component.state().view).toBe('century');
  });

  it('drills down when allowed', () => {
    const component = mount(
      <Calendar view="century" />
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
      />
    );

    component.instance().drillDown(new Date(2011, 0, 1));

    expect(onDrillDown).toHaveBeenCalledWith({
      activeStartDate: new Date(2011, 0, 1),
      view: 'decade',
    });
  });

  it('refuses to drill down when already on minimum allowed detail', () => {
    const component = mount(
      <Calendar view="month" />
    );

    component.instance().drillDown();

    expect(component.state().view).toBe('month');
  });

  it('calls onChange function returning beginning of selected period by default', () => {
    const onChange = jest.fn();
    const component = mount(
      <Calendar
        onChange={onChange}
        view="month"
      />
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
      />
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
      />
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
      />
    );

    component.instance().onChange(new Date(2017, 0, 1));

    expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1, 23, 59, 59, 999));
  });

  it('calls onChange function returning beginning of selected period when returnValue is set to "range"', () => {
    const onChange = jest.fn();
    const component = mount(
      <Calendar
        onChange={onChange}
        returnValue="range"
        view="month"
      />
    );

    component.instance().onChange(new Date(2017, 0, 1));

    expect(onChange).toHaveBeenCalledWith([
      new Date(2017, 0, 1),
      new Date(2017, 0, 1, 23, 59, 59, 999),
    ]);
  });

  it('calls onChange function returning beginning of selected period, but no earlier than minDate', () => {
    const onChange = jest.fn();
    const component = mount(
      <Calendar
        minDate={new Date(2017, 0, 1, 12)}
        onChange={onChange}
        returnValue="start"
        view="month"
      />
    );

    component.instance().onChange(new Date(2017, 0, 1));

    expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1, 12));
  });

  it('calls onChange function returning beginning of selected period, but no later than maxDate', () => {
    const onChange = jest.fn();
    const component = mount(
      <Calendar
        maxDate={new Date(2017, 0, 1, 12)}
        onChange={onChange}
        returnValue="start"
        view="month"
      />
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
      />
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
      />
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
      />
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
      />
    );

    component.instance().onChange(new Date(2018, 6, 1));
    component.instance().onChange(new Date(2018, 0, 1));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([
      new Date(2018, 0, 1),
      new Date(2018, 6, 1, 23, 59, 59, 999),
    ]);
  });

  it('calls onActiveDateChange on activeStartDate change', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const newActiveStartDate = new Date(2018, 0, 1);
    const onActiveDateChange = jest.fn();
    const component = mount(
      <Calendar
        activeStartDate={activeStartDate}
        onActiveDateChange={onActiveDateChange}
        view="year"
      />
    );

    component.instance().setActiveStartDate(newActiveStartDate);

    expect(onActiveDateChange).toHaveBeenCalledWith({
      activeStartDate: newActiveStartDate,
      view: 'year',
    });
  });

  it('changes Calendar view given new activeStartDate value', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const newActiveStartDate = new Date(2018, 0, 1);
    const component = mount(
      <Calendar activeStartDate={activeStartDate} />
    );

    component.setProps({ activeStartDate: newActiveStartDate });

    const monthView = component.find('.react-calendar__month-view');
    const firstDayTile = monthView.find('.react-calendar__tile').first();
    const firstDayTileTimeISO = firstDayTile.find('time').prop('dateTime');

    expect(firstDayTileTimeISO).toBe(getISOLocalDate(newActiveStartDate) + midnightTimestamp);
  });

  it('displays calendar with custom weekdays formatting', () => {
    const component = mount(
      <Calendar
        formatShortWeekday={() => 'Weekday'}
      />
    );

    const monthView = component.find('.react-calendar__month-view');
    const firstWeekdayTile = monthView.find('.react-calendar__month-view__weekdays__weekday').first();

    expect(firstWeekdayTile.text()).toBe('Weekday');
  });

  it('displays calendar with custom month year navigation label', () => {
    const component = mount(
      <Calendar
        formatMonthYear={() => 'MonthYear'}
      />
    );

    const navigationLabel = component.find('.react-calendar__navigation__label').first();

    expect(navigationLabel.text()).toBe('MonthYear');
  });
});
