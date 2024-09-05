import { describe, expect, it } from 'vitest';

import { render } from '@testing-library/react';

import Flex from './Flex.js';

describe('Flex', () => {
  it('styles itself properly with wrap flag set to false', () => {
    const { container } = render(
      <Flex count={3} wrap={false}>
        <div>Hey</div>
        <div>Hi</div>
        <div>Hello</div>
      </Flex>,
    );

    const wrapper = container.firstElementChild;

    expect(wrapper).toHaveStyle('display: flex');
    expect(wrapper).toHaveStyle('flex-wrap: nowrap');
  });

  it('styles itself properly with wrap flag set to true', () => {
    const { container } = render(
      <Flex count={3} wrap>
        <div>Hey</div>
        <div>Hi</div>
        <div>Hello</div>
      </Flex>,
    );

    const wrapper = container.firstElementChild;

    expect(wrapper).toHaveStyle('display: flex');
    expect(wrapper).toHaveStyle('flex-wrap: wrap');
  });

  it('renders all given children', () => {
    const { container } = render(
      <Flex count={3}>
        <div>Hey</div>
        <div>Hi</div>
        <div>Hello</div>
      </Flex>,
    );

    const wrapper = container.firstElementChild as HTMLDivElement;
    const children = wrapper.children;

    expect(children).toHaveLength(3);
    expect(children[0]).toHaveTextContent('Hey');
    expect(children[1]).toHaveTextContent('Hi');
    expect(children[2]).toHaveTextContent('Hello');
  });

  it('properly sizes and positions all the elements', () => {
    const { container } = render(
      <Flex count={3} offset={1}>
        <div>Hey</div>
        <div>Hi</div>
      </Flex>,
    );

    const wrapper = container.firstElementChild as HTMLDivElement;
    const children = Array.from(wrapper.children);

    for (const child of children) {
      expect(child).toHaveStyle('flex-basis: 33.333333333333336%');
      expect(child).toHaveStyle('flex-shrink: 0');
      expect(child).toHaveStyle('flex-grow: 0');
      expect(child).toHaveStyle('overflow: hidden');
    }
  });
});
