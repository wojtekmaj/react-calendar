import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Calendar from '../Calendar';

configure({ adapter: new Adapter() });

/* eslint-disable comma-dangle */

describe('Calendar', () => {
  it('renders navigation', () => {
    const component = mount(
      <Calendar />
    );

    const navigation = component.find('.react-calendar__navigation');

    expect(navigation.length).toBe(1);
  });

  it('renders month view by default', () => {
    const component = mount(
      <Calendar />
    );

    const monthView = component.find('.react-calendar__month-view');

    expect(monthView.length).toBe(1);
  });

  it('renders maximum allowed view when given maxDetail', () => {
    const component = mount(
      <Calendar maxDetail="year" />
    );

    const yearView = component.find('.react-calendar__year-view');

    expect(yearView.length).toBe(1);
  });

  it('renders maximum allowed view when given view that is not allowed', () => {
    const component = mount(
      <Calendar
        maxDetail="year"
        view="month"
      />
    );

    const yearView = component.find('.react-calendar__year-view');

    expect(yearView.length).toBe(1);
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

    expect(yearView.length).toBe(1);
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

    expect(yearView.length).toBe(1);
  });

  it('renders month view when given view = "month"', () => {
    const component = mount(
      <Calendar view="month" />
    );

    const monthView = component.find('.react-calendar__month-view');

    expect(monthView.length).toBe(1);
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

    expect(monthView.length).toBe(1);
    expect(component.state().view).toBe('month');
  });

  it('renders year view when given view = "year"', () => {
    const component = mount(
      <Calendar view="year" />
    );

    const yearView = component.find('.react-calendar__year-view');

    expect(yearView.length).toBe(1);
    expect(component.state().view).toBe('year');
  });

  it('renders decade view when given view = "decade"', () => {
    const component = mount(
      <Calendar view="decade" />
    );

    const decadeView = component.find('.react-calendar__decade-view');

    expect(decadeView.length).toBe(1);
    expect(component.state().view).toBe('decade');
  });

  it('renders century view when given view = "century"', () => {
    const component = mount(
      <Calendar view="century" />
    );

    const centuryView = component.find('.react-calendar__century-view');

    expect(centuryView.length).toBe(1);
    expect(component.state().view).toBe('century');
  });

  it('drills up when allowed', () => {
    const component = mount(
      <Calendar view="month" />
    );

    component.instance().drillUp();

    expect(component.state().view).toBe('year');
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
});
