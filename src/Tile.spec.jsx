import React from 'react';
import { shallow } from 'enzyme';

import Tile from './Tile';

describe('<Tile /> component', () => {
  const defaultProps = {
    activeStartDate: new Date(2019, 0, 1),
    children: '',
    classes: [],
    date: new Date(2019, 0, 1),
    maxDateTransform: (date) => date,
    minDateTransform: (date) => date,
  };

  it('renders button properly', () => {
    const component = shallow(
      <Tile {...defaultProps} />,
    );

    expect(component.find('button')).toHaveLength(1);
  });

  it('passes onClick to button', () => {
    const onClick = jest.fn();

    const component = shallow(
      <Tile
        {...defaultProps}
        onClick={onClick}
      />,
    );

    const button = component.find('button');

    button.simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('passes classes to button properly', () => {
    const classes = ['a', 'b', 'c'];

    const component = shallow(
      <Tile
        {...defaultProps}
        classes={classes}
      />,
    );

    const button = component.find('button');

    classes.forEach((className) => {
      expect(button.prop('className')).toMatch(className);
    });
  });

  it('renders children properly', () => {
    const children = 'Hello';

    const component = shallow(
      <Tile {...defaultProps}>
        {children}
      </Tile>,
    );

    expect(component.text()).toBe(children);
  });

  it('does not render abbr by default', () => {
    const component = shallow(
      <Tile {...defaultProps} />,
    );

    expect(component.find('abbr')).toHaveLength(0);
  });

  it('calls formatAbbr properly', () => {
    const date = new Date(2019, 5, 1);
    const formatAbbr = jest.fn();
    const locale = 'en-US';

    shallow(
      <Tile
        {...defaultProps}
        date={date}
        formatAbbr={formatAbbr}
        locale={locale}
      />,
    );

    expect(formatAbbr).toHaveBeenCalledTimes(1);
    expect(formatAbbr).toHaveBeenCalledWith(locale, date);
  });

  it('renders abbr with children properly given formatAbbr', () => {
    const children = 'Hello';
    const ariaLabel = 'ariaLabel';
    const formatAbbr = () => ariaLabel;

    const component = shallow(
      <Tile
        {...defaultProps}
        formatAbbr={formatAbbr}
      >
        {children}
      </Tile>,
    );

    const abbr = component.find('abbr');

    expect(abbr).toHaveLength(1);
    expect(abbr.text()).toBe(children);
    expect(abbr.prop('aria-label')).toBe(ariaLabel);
  });

  it('calls tileClassName properly', () => {
    const activeStartDate = new Date(2019, 5, 1);
    const date = new Date(2019, 5, 15);
    const tileClassName = jest.fn();
    const view = 'month';

    const component = shallow(
      <Tile
        {...defaultProps}
        activeStartDate={activeStartDate}
        date={date}
        tileClassName={tileClassName}
        view={view}
      />,
    );

    // Trigger any unrelated prop change
    component.setProps({
      tileContent: 'a',
    });

    expect(tileClassName).toHaveBeenCalledTimes(1);
    expect(tileClassName).toHaveBeenCalledWith({
      activeStartDate,
      date,
      view,
    });
  });

  it('applies tileClassName to button properly given function', () => {
    const className = 'className';
    const tileClassName = () => className;

    const component = shallow(
      <Tile
        {...defaultProps}
        tileClassName={tileClassName}
      />,
    );

    const button = component.find('button');

    expect(button.prop('className')).toMatch(className);
  });

  it('applies tileClassName to button properly given string', () => {
    const className = 'className';

    const component = shallow(
      <Tile
        {...defaultProps}
        tileClassName={className}
      />,
    );

    const button = component.find('button');

    expect(button.prop('className')).toMatch(className);
  });

  it('calls tileContent properly', () => {
    const activeStartDate = new Date(2019, 5, 1);
    const date = new Date(2019, 5, 15);
    const tileContent = jest.fn();
    const view = 'month';

    const component = shallow(
      <Tile
        {...defaultProps}
        activeStartDate={activeStartDate}
        date={date}
        tileContent={tileContent}
        view={view}
      />,
    );

    // Trigger any unrelated prop change
    component.setProps({
      tileClassName: 'a',
    });

    expect(tileContent).toHaveBeenCalledTimes(1);
    expect(tileContent).toHaveBeenCalledWith({
      activeStartDate,
      date,
      view,
    });
  });

  it('applies tileContent to button properly given function', () => {
    const content = 'content';
    const tileContent = () => content;

    const component = shallow(
      <Tile
        {...defaultProps}
        tileContent={tileContent}
      />,
    );

    const button = component.find('button');

    expect(button.text()).toMatch(content);
  });

  it('applies tileContent to button properly given string', () => {
    const content = 'className';

    const component = shallow(
      <Tile
        {...defaultProps}
        tileContent={content}
      />,
    );

    const button = component.find('button');

    expect(button.text()).toMatch(content);
  });

  it('calls tileDisabled properly', () => {
    const activeStartDate = new Date(2019, 5, 1);
    const date = new Date(2019, 5, 15);
    const tileDisabled = jest.fn();
    const view = 'month';

    shallow(
      <Tile
        {...defaultProps}
        activeStartDate={activeStartDate}
        date={date}
        tileDisabled={tileDisabled}
        view={view}
      />,
    );

    expect(tileDisabled).toHaveBeenCalledTimes(1);
    expect(tileDisabled).toHaveBeenCalledWith({
      activeStartDate,
      date,
      view,
    });
  });

  it('disables button properly given tileDisabled returning true', () => {
    const tileDisabled = () => true;

    const component = shallow(
      <Tile
        {...defaultProps}
        tileDisabled={tileDisabled}
      />,
    );

    const button = component.find('button');

    expect(button.prop('disabled')).toBeTruthy();
  });
});
