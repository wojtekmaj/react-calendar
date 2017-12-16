import React from 'react';
import { shallow } from 'enzyme';

import Flex from '../Flex';

/* eslint-disable comma-dangle */

describe('Flex', () => {
  it('styles itself properly with wrap flag set to false', () => {
    const noWrapComponent = shallow(
      <Flex count={3} wrap={false}>
        <div>Hey</div>
        <div>Hi</div>
        <div>Hello</div>
      </Flex>
    );

    expect(noWrapComponent.props().style.display).toBe('flex');
    expect(noWrapComponent.props().style.flexWrap).toBe('no-wrap');
  });

  it('styles itself properly with wrap flag set to true', () => {
    const wrapComponent = shallow(
      <Flex count={3} wrap>
        <div>Hey</div>
        <div>Hi</div>
        <div>Hello</div>
      </Flex>
    );

    expect(wrapComponent.props().style.display).toBe('flex');
    expect(wrapComponent.props().style.flexWrap).toBe('wrap');
  });

  it('renders all given children', () => {
    const component = shallow(
      <Flex count={3}>
        <div>Hey</div>
        <div>Hi</div>
        <div>Hello</div>
      </Flex>
    );

    const children = component.children();

    expect(children.length).toBe(3);
    expect(children.at(0).text()).toBe('Hey');
    expect(children.at(1).text()).toBe('Hi');
    expect(children.at(2).text()).toBe('Hello');
  });

  it('properly sizes and positions all the elements', () => {
    const component = shallow(
      <Flex count={3} offset={1}>
        <div>Hey</div>
        <div>Hi</div>
      </Flex>
    );

    const children = component.children();

    children.forEach(child => expect(child.props().style.display).toBe('flex'));
    children.forEach(child =>
      expect(parseFloat(child.props().style.flexBasis)).toBeCloseTo(33.33)
    );
    expect(parseFloat(children.first().props().style.marginLeft)).toBeCloseTo(33.33);
  });
});
