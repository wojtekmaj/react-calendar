import React from 'react';
import { shallow } from 'enzyme';

import Navigation from '../Navigation';

const allViews = ['century', 'decade', 'year', 'month'];

/* eslint-disable comma-dangle */

describe('Navigation', () => {
  it('renders prev2, prev, drill up, next and next2 buttons', () => {
    const component = shallow(
      <Navigation
        activeStartDate={new Date(2017, 0, 1)}
        drillUp={jest.fn()}
        setActiveStartDate={jest.fn()}
        view="month"
        views={allViews}
      />
    );

    const children = component.children();

    const [prev2, prev, drillUp, next, next2] = children;

    expect(children).toHaveLength(5);
    expect(prev2.type).toBe('button');
    expect(prev.type).toBe('button');
    expect(drillUp.type).toBe('button');
    expect(next.type).toBe('button');
    expect(next2.type).toBe('button');
  });

  it('renders prev, drill up, next and buttons only for century view', () => {
    const component = shallow(
      <Navigation
        activeStartDate={new Date(2017, 0, 1)}
        drillUp={jest.fn()}
        setActiveStartDate={jest.fn()}
        view="century"
        views={allViews}
      />
    );

    const children = component.children();

    const [prev, drillUp, next] = children;

    expect(children).toHaveLength(3);
    expect(prev.type).toBe('button');
    expect(drillUp.type).toBe('button');
    expect(next.type).toBe('button');
  });

  it('displays proper title for month view', () => {
    const component = shallow(
      <Navigation
        activeStartDate={new Date(2017, 0, 1)}
        drillUp={jest.fn()}
        setActiveStartDate={jest.fn()}
        view="month"
        views={allViews}
      />
    );

    const [, , drillUp] = component.children();

    expect(drillUp.props.children.toString()).toBe('January 2017');
  });

  it('displays proper title for year view', () => {
    const component = shallow(
      <Navigation
        activeStartDate={new Date(2017, 0, 1)}
        drillUp={jest.fn()}
        setActiveStartDate={jest.fn()}
        view="year"
        views={allViews}
      />
    );

    const [, , drillUp] = component.children();

    expect(drillUp.props.children.toString()).toBe('2017');
  });

  it('displays proper title for decade view', () => {
    const component = shallow(
      <Navigation
        activeStartDate={new Date(2017, 0, 1)}
        drillUp={jest.fn()}
        setActiveStartDate={jest.fn()}
        view="decade"
        views={allViews}
      />
    );

    const [, , drillUp] = component.children();

    expect(drillUp.props.children.toString()).toBe('2011 – 2020');
  });

  it('displays proper title for century view', () => {
    const component = shallow(
      <Navigation
        activeStartDate={new Date(2017, 0, 1)}
        drillUp={jest.fn()}
        setActiveStartDate={jest.fn()}
        view="century"
        views={allViews}
      />
    );

    const [, drillUp] = component.children();

    expect(drillUp.props.children.toString()).toBe('2001 – 2100');
  });

  it('displays proper user-defined labels on prev2, prev, next and next2 buttons', () => {
    const component = shallow(
      <Navigation
        activeStartDate={new Date(2017, 0, 1)}
        drillUp={jest.fn()}
        next2Label="next2Label"
        nextLabel="nextLabel"
        prev2Label="prev2Label"
        prevLabel="prevLabel"
        setActiveStartDate={jest.fn()}
        view="month"
        views={allViews}
      />
    );

    const [prev2, prev, , next, next2] = component.children();

    expect(prev2.props.children).toBe('prev2Label');
    expect(prev.props.children).toBe('prevLabel');
    expect(next.props.children).toBe('nextLabel');
    expect(next2.props.children).toBe('next2Label');
  });

  it('displays proper user-defined ARIA labels on prev2, prev, navigation, next and next2 buttons', () => {
    const component = shallow(
      <Navigation
        activeStartDate={new Date(2017, 0, 1)}
        drillUp={jest.fn()}
        navigationAriaLabel="navigationAriaLabel"
        next2AriaLabel="next2AriaLabel"
        nextAriaLabel="nextAriaLabel"
        prev2AriaLabel="prev2AriaLabel"
        prevAriaLabel="prevAriaLabel"
        setActiveStartDate={jest.fn()}
        view="month"
        views={allViews}
      />
    );

    const [prev2, prev, navigation, next, next2] = component.children();

    expect(prev2.props['aria-label']).toBe('prev2AriaLabel');
    expect(prev.props['aria-label']).toBe('prevAriaLabel');
    expect(navigation.props['aria-label']).toBe('navigationAriaLabel');
    expect(next.props['aria-label']).toBe('nextAriaLabel');
    expect(next2.props['aria-label']).toBe('next2AriaLabel');
  });

  it('calls drillUp function on drill up button click', () => {
    const drillUpFn = jest.fn();
    const component = shallow(
      <Navigation
        activeStartDate={new Date(2017, 0, 1)}
        drillUp={drillUpFn}
        setActiveStartDate={jest.fn()}
        view="month"
        views={allViews}
      />
    );

    const button = component.find('button.react-calendar__navigation__label');

    button.simulate('click');

    expect(drillUpFn).toHaveBeenCalledTimes(1);
  });

  it('calls setActiveStartDate on prev2, prev, next and next2 buttons click', () => {
    const setActiveStartDateFn = jest.fn();
    const component = shallow(
      <Navigation
        activeStartDate={new Date(2017, 0, 1)}
        drillUp={jest.fn()}
        setActiveStartDate={setActiveStartDateFn}
        view="month"
        views={allViews}
      />
    );

    const arrows = component.find('button.react-calendar__navigation__arrow');

    const prev2 = arrows.at(0);
    const prev = arrows.at(1);
    const next = arrows.at(2);
    const next2 = arrows.at(3);

    prev2.simulate('click');
    prev.simulate('click');
    next.simulate('click');
    next2.simulate('click');

    expect(setActiveStartDateFn).toHaveBeenCalledTimes(4);
  });

  const monthSetActiveStartDateFn = jest.fn();

  const monthViewComponent = shallow(
    <Navigation
      activeStartDate={new Date(2017, 0, 1)}
      drillUp={jest.fn()}
      setActiveStartDate={monthSetActiveStartDateFn}
      view="month"
      views={allViews}
    />
  );

  const monthViewArrows = monthViewComponent.find('button.react-calendar__navigation__arrow');

  it('jumps 12 months back on prev2 button click for month view', () => {
    const prev2 = monthViewArrows.at(0);

    prev2.simulate('click');

    expect(monthSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2016, 0, 1));
  });

  it('jumps 1 month back on prev button click for month view', () => {
    const prev = monthViewArrows.at(1);

    prev.simulate('click');

    expect(monthSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2016, 11, 1));
  });

  it('jumps 1 month forward on next button click for month view', () => {
    const next = monthViewArrows.at(2);

    next.simulate('click');

    expect(monthSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2017, 1, 1));
  });

  it('jumps 12 months forward on next2 button click for month view', () => {
    const next2 = monthViewArrows.at(3);

    next2.simulate('click');

    expect(monthSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2018, 0, 1));
  });

  const yearSetActiveStartDateFn = jest.fn();

  const yearViewComponent = shallow(
    <Navigation
      activeStartDate={new Date(2017, 0, 1)}
      drillUp={jest.fn()}
      setActiveStartDate={yearSetActiveStartDateFn}
      view="year"
      views={allViews}
    />
  );

  const yearViewArrows = yearViewComponent.find('button.react-calendar__navigation__arrow');

  it('jumps 10 years back on prev2 button click for year view', () => {
    const prev2 = yearViewArrows.at(0);

    prev2.simulate('click');

    expect(yearSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2007, 0, 1));
  });

  it('jumps 1 year back on prev button click for year view', () => {
    const prev2 = yearViewArrows.at(1);

    prev2.simulate('click');

    expect(yearSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2016, 0, 1));
  });

  it('jumps 1 year forward on next button click for year view', () => {
    const next = yearViewArrows.at(2);

    next.simulate('click');

    expect(yearSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2018, 0, 1));
  });

  it('jumps 10 years forward on next2 button click for year view', () => {
    const next2 = yearViewArrows.at(3);

    next2.simulate('click');

    expect(yearSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2027, 0, 1));
  });

  const decadeSetActiveStartDateFn = jest.fn();

  const decadeViewComponent = shallow(
    <Navigation
      activeStartDate={new Date(2017, 0, 1)}
      drillUp={jest.fn()}
      setActiveStartDate={decadeSetActiveStartDateFn}
      view="decade"
      views={allViews}
    />
  );

  const decadeViewArrows = decadeViewComponent.find('button.react-calendar__navigation__arrow');

  it('jumps 10 decades back on prev2 button click for decade view', () => {
    const prev2 = decadeViewArrows.at(0);

    prev2.simulate('click');

    expect(decadeSetActiveStartDateFn).toHaveBeenCalledWith(new Date(1911, 0, 1));
  });

  it('jumps 1 decade back on prev button click for decade view', () => {
    const prev = decadeViewArrows.at(1);

    prev.simulate('click');

    expect(decadeSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2001, 0, 1));
  });

  it('jumps 1 decade forward on next button click for decade view', () => {
    const next = decadeViewArrows.at(2);

    next.simulate('click');

    expect(decadeSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2021, 0, 1));
  });

  it('jumps 10 decades forward on next2 button click for decade view', () => {
    const next2 = decadeViewArrows.at(3);

    next2.simulate('click');

    expect(decadeSetActiveStartDateFn).toHaveBeenCalledWith(new Date(2111, 0, 1));
  });

  const centurySetActiveStartDateFn = jest.fn();

  const centuryViewComponent = shallow(
    <Navigation
      activeStartDate={new Date(2017, 0, 1)}
      drillUp={jest.fn()}
      setActiveStartDate={centurySetActiveStartDateFn}
      view="century"
      views={allViews}
    />
  );

  const centuryViewArrows = centuryViewComponent.find('button.react-calendar__navigation__arrow');

  it('jumps 1 century back on prev button click for century view', () => {
    const prev = centuryViewArrows.at(0);

    prev.simulate('click');

    expect(centurySetActiveStartDateFn).toHaveBeenCalledWith(new Date(1901, 0, 1));
  });

  it('jumps 1 century forward on next button click for century view', () => {
    const next = centuryViewArrows.at(1);

    next.simulate('click');

    expect(centurySetActiveStartDateFn).toHaveBeenCalledWith(new Date(2101, 0, 1));
  });

  it('correctly marks drillUp button as disabled when already on top allowed view', () => {
    const component = shallow(
      <Navigation
        activeStartDate={new Date(2017, 0, 1)}
        drillUp={jest.fn()}
        setActiveStartDate={jest.fn()}
        view="century"
        views={allViews}
      />
    );

    const button = component.find('button.react-calendar__navigation__label');

    expect(button.prop('disabled')).toBeTruthy();
  });

  it('disallows navigating before minDate', () => {
    const component = shallow(
      <Navigation
        activeStartDate={new Date(2017, 0, 1)}
        drillUp={jest.fn()}
        minDate={new Date(2017, 0, 1)}
        setActiveStartDate={jest.fn()}
        view="month"
        views={allViews}
      />
    );

    const arrows = component.find('button.react-calendar__navigation__arrow');

    const prev2 = arrows.at(0);
    const prev = arrows.at(1);

    expect(prev2.prop('disabled')).toBeTruthy();
    expect(prev.prop('disabled')).toBeTruthy();
  });

  it('disallows navigating before dynamically set minDate', () => {
    const component = shallow(
      <Navigation
        activeStartDate={new Date(2017, 0, 1)}
        drillUp={jest.fn()}
        setActiveStartDate={jest.fn()}
        view="month"
        views={allViews}
      />
    );

    component.setProps({
      minDate: new Date(2017, 0, 1),
    });

    const arrows = component.find('button.react-calendar__navigation__arrow');

    const prev2 = arrows.at(0);
    const prev = arrows.at(1);

    expect(prev2.prop('disabled')).toBeTruthy();
    expect(prev.prop('disabled')).toBeTruthy();
  });

  it('disallows navigating after maxDate', () => {
    const component = shallow(
      <Navigation
        activeStartDate={new Date(2017, 0, 1)}
        drillUp={jest.fn()}
        maxDate={new Date(2017, 0, 31)}
        setActiveStartDate={jest.fn()}
        view="month"
        views={allViews}
      />
    );

    const arrows = component.find('button.react-calendar__navigation__arrow');

    const next = arrows.at(2);
    const next2 = arrows.at(3);

    expect(next.prop('disabled')).toBeTruthy();
    expect(next2.prop('disabled')).toBeTruthy();
  });

  it('disallows navigating after dynamically set maxDate', () => {
    const component = shallow(
      <Navigation
        activeStartDate={new Date(2017, 0, 1)}
        drillUp={jest.fn()}
        setActiveStartDate={jest.fn()}
        view="month"
        views={allViews}
      />
    );

    component.setProps({
      maxDate: new Date(2017, 0, 31),
    });

    const arrows = component.find('button.react-calendar__navigation__arrow');

    const next = arrows.at(2);
    const next2 = arrows.at(3);

    expect(next.prop('disabled')).toBeTruthy();
    expect(next2.prop('disabled')).toBeTruthy();
  });

  it('disallows navigating before the year 1000', () => {
    const component = shallow(
      <Navigation
        activeStartDate={new Date(1000, 0, 1)}
        drillUp={jest.fn()}
        setActiveStartDate={jest.fn()}
        view="year"
        views={allViews}
      />
    );

    const arrows = component.find('button.react-calendar__navigation__arrow');

    const prev2 = arrows.at(0);
    const prev = arrows.at(1);

    expect(prev2.prop('disabled')).toBeTruthy();
    expect(prev.prop('disabled')).toBeTruthy();
  });

  it('renders custom navigation label when given navigationLabel prop', () => {
    const date = new Date(2017, 0, 1);
    const label = 'Custom label';
    const view = 'month';

    const navigationLabel = jest.fn().mockReturnValue(label);

    const component = shallow(
      <Navigation
        activeStartDate={date}
        drillUp={jest.fn()}
        navigationLabel={navigationLabel}
        setActiveStartDate={jest.fn()}
        view={view}
        views={allViews}
      />
    );

    const [, , drillUp] = component.children();

    expect(navigationLabel).toHaveBeenCalledWith({ date, view, label: 'January 2017' });
    expect(drillUp.props.children.toString()).toBe(label);
  });
});
