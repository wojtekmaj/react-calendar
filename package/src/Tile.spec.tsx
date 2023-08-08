import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Tile from './Tile.js';

describe('<Tile /> component', () => {
  const defaultProps = {
    activeStartDate: new Date(2019, 0, 1),
    children: '',
    classes: [],
    date: new Date(2019, 0, 1),
    maxDateTransform: (date: Date) => date,
    minDateTransform: (date: Date) => date,
    view: 'month',
  } satisfies React.ComponentProps<typeof Tile>;

  it('renders button properly', () => {
    const { container } = render(<Tile {...defaultProps} />);

    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('passes onClick to button', () => {
    const onClick = vi.fn();

    const { container } = render(<Tile {...defaultProps} onClick={onClick} />);

    const button = container.querySelector('button') as HTMLButtonElement;

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('passes classes to button properly', () => {
    const classes = ['a', 'b', 'c'];

    const { container } = render(<Tile {...defaultProps} classes={classes} />);

    const button = container.querySelector('button');

    classes.forEach((className) => {
      expect(button).toHaveClass(className);
    });
  });

  it('renders children properly', () => {
    const children = 'Hello';

    const { container } = render(<Tile {...defaultProps}>{children}</Tile>);

    expect(container).toHaveTextContent(children);
  });

  it('does not render abbr by default', () => {
    const { container } = render(<Tile {...defaultProps} />);

    expect(container.querySelector('abbr')).not.toBeInTheDocument();
  });

  it('calls formatAbbr properly', () => {
    const date = new Date(2019, 5, 1);
    const formatAbbr = vi.fn();
    const locale = 'en-US';

    render(<Tile {...defaultProps} date={date} formatAbbr={formatAbbr} locale={locale} />);

    expect(formatAbbr).toHaveBeenCalledTimes(1);
    expect(formatAbbr).toHaveBeenCalledWith(locale, date);
  });

  it('renders abbr with children properly given formatAbbr', () => {
    const children = 'Hello';
    const ariaLabel = 'ariaLabel';
    const formatAbbr = () => ariaLabel;

    const { container } = render(
      <Tile {...defaultProps} formatAbbr={formatAbbr}>
        {children}
      </Tile>,
    );

    const abbr = container.querySelector('abbr');

    expect(abbr).toBeInTheDocument();
    expect(abbr).toHaveTextContent(children);
    expect(abbr).toHaveAccessibleName(ariaLabel);
  });

  it('calls tileClassName properly', () => {
    const activeStartDate = new Date(2019, 5, 1);
    const date = new Date(2019, 5, 15);
    const tileClassName = vi.fn();
    const view = 'month';

    const { rerender } = render(
      <Tile
        {...defaultProps}
        activeStartDate={activeStartDate}
        date={date}
        tileClassName={tileClassName}
        view={view}
      />,
    );

    // Trigger any unrelated prop change
    rerender(
      <Tile
        {...defaultProps}
        activeStartDate={activeStartDate}
        date={date}
        tileClassName={tileClassName}
        tileContent="a"
        view={view}
      />,
    );

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

    const { container } = render(<Tile {...defaultProps} tileClassName={tileClassName} />);

    const button = container.querySelector('button');

    expect(button).toHaveClass(className);
  });

  it('applies tileClassName to button properly given string', () => {
    const className = 'className';

    const { container } = render(<Tile {...defaultProps} tileClassName={className} />);

    const button = container.querySelector('button');

    expect(button).toHaveClass(className);
  });

  it('calls tileContent properly', () => {
    const activeStartDate = new Date(2019, 5, 1);
    const date = new Date(2019, 5, 15);
    const tileContent = vi.fn();
    const view = 'month';

    const { rerender } = render(
      <Tile
        {...defaultProps}
        activeStartDate={activeStartDate}
        date={date}
        tileContent={tileContent}
        view={view}
      />,
    );

    // Trigger any unrelated prop change
    rerender(
      <Tile
        {...defaultProps}
        activeStartDate={activeStartDate}
        date={date}
        tileClassName="a"
        tileContent={tileContent}
        view={view}
      />,
    );

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

    const { container } = render(<Tile {...defaultProps} tileContent={tileContent} />);

    const button = container.querySelector('button');

    expect(button).toHaveTextContent(content);
  });

  it('applies tileContent to button properly given string', () => {
    const content = 'className';

    const { container } = render(<Tile {...defaultProps} tileContent={content} />);

    const button = container.querySelector('button');

    expect(button).toHaveTextContent(content);
  });

  it('calls tileDisabled properly', () => {
    const activeStartDate = new Date(2019, 5, 1);
    const date = new Date(2019, 5, 15);
    const tileDisabled = vi.fn();
    const view = 'month';

    render(
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

    const { container } = render(<Tile {...defaultProps} tileDisabled={tileDisabled} />);

    const button = container.querySelector('button');

    expect(button).toBeDisabled();
  });
});
