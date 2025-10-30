import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

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

  it('renders button properly', async () => {
    const { container } = await render(<Tile {...defaultProps} />);

    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('passes onClick to button', async () => {
    const onClick = vi.fn();

    const { container } = await render(<Tile {...defaultProps} onClick={onClick} />);

    const button = container.querySelector('button') as HTMLButtonElement;

    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('passes classes to button properly', async () => {
    const classes = ['a', 'b', 'c'];

    const { container } = await render(<Tile {...defaultProps} classes={classes} />);

    const button = container.querySelector('button');

    for (const className of classes) {
      expect(button).toHaveClass(className);
    }
  });

  it('renders children properly', async () => {
    const children = 'Hello';

    const { container } = await render(<Tile {...defaultProps}>{children}</Tile>);

    expect(container).toHaveTextContent(children);
  });

  it('does not render abbr by default', async () => {
    const { container } = await render(<Tile {...defaultProps} />);

    expect(container.querySelector('abbr')).not.toBeInTheDocument();
  });

  it('calls formatAbbr properly', async () => {
    const date = new Date(2019, 5, 1);
    const formatAbbr = vi.fn();
    const locale = 'en-US';

    await render(<Tile {...defaultProps} date={date} formatAbbr={formatAbbr} locale={locale} />);

    expect(formatAbbr).toHaveBeenCalledTimes(1);
    expect(formatAbbr).toHaveBeenCalledWith(locale, date);
  });

  it('renders abbr with children properly given formatAbbr', async () => {
    const children = 'Hello';
    const ariaLabel = 'ariaLabel';
    const formatAbbr = () => ariaLabel;

    const { container } = await render(
      <Tile {...defaultProps} formatAbbr={formatAbbr}>
        {children}
      </Tile>,
    );

    const abbr = container.querySelector('abbr');

    expect(abbr).toBeInTheDocument();
    expect(abbr).toHaveTextContent(children);
    expect(abbr).toHaveAccessibleName(ariaLabel);
  });

  it('calls tileClassName properly', async () => {
    const activeStartDate = new Date(2019, 5, 1);
    const date = new Date(2019, 5, 15);
    const tileClassName = vi.fn();
    const view = 'month';

    const { rerender } = await render(
      <Tile
        {...defaultProps}
        activeStartDate={activeStartDate}
        date={date}
        tileClassName={tileClassName}
        view={view}
      />,
    );

    // Trigger any unrelated prop change
    await rerender(
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

  it('applies tileClassName to button properly given function', async () => {
    const className = 'className';
    const tileClassName = () => className;

    const { container } = await render(<Tile {...defaultProps} tileClassName={tileClassName} />);

    const button = container.querySelector('button');

    expect(button).toHaveClass(className);
  });

  it('applies tileClassName to button properly given string', async () => {
    const className = 'className';

    const { container } = await render(<Tile {...defaultProps} tileClassName={className} />);

    const button = container.querySelector('button');

    expect(button).toHaveClass(className);
  });

  it('calls tileContent properly', async () => {
    const activeStartDate = new Date(2019, 5, 1);
    const date = new Date(2019, 5, 15);
    const tileContent = vi.fn();
    const view = 'month';

    const { rerender } = await render(
      <Tile
        {...defaultProps}
        activeStartDate={activeStartDate}
        date={date}
        tileContent={tileContent}
        view={view}
      />,
    );

    // Trigger any unrelated prop change
    await rerender(
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

  it('applies tileContent to button properly given function', async () => {
    const content = 'content';
    const tileContent = () => content;

    const { container } = await render(<Tile {...defaultProps} tileContent={tileContent} />);

    const button = container.querySelector('button');

    expect(button).toHaveTextContent(content);
  });

  it('applies tileContent to button properly given string', async () => {
    const content = 'className';

    const { container } = await render(<Tile {...defaultProps} tileContent={content} />);

    const button = container.querySelector('button');

    expect(button).toHaveTextContent(content);
  });

  it('calls tileDisabled properly', async () => {
    const activeStartDate = new Date(2019, 5, 1);
    const date = new Date(2019, 5, 15);
    const tileDisabled = vi.fn();
    const view = 'month';

    await render(
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

  it('disables button properly given tileDisabled returning true', async () => {
    const tileDisabled = () => true;

    const { container } = await render(<Tile {...defaultProps} tileDisabled={tileDisabled} />);

    const button = container.querySelector('button');

    expect(button).toBeDisabled();
  });
});
