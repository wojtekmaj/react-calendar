import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import Decade from './Decade.js';

const tileProps = {
  activeStartDate: new Date(2018, 0, 1),
  classes: ['react-calendar__tile'],
  currentCentury: 2001,
  date: new Date(2011, 0, 1),
};

describe('Decade', () => {
  it('applies given classNames properly', async () => {
    const { container } = await render(
      <Decade
        {...tileProps}
        classes={['react-calendar__tile', 'react-calendar__tile--flag']}
        tileClassName={() => 'testFunctionClassName'}
      />,
    );

    const wrapper = container.querySelector('.react-calendar__tile');

    expect(wrapper).toHaveClass('react-calendar__tile');
    expect(wrapper).toHaveClass('react-calendar__tile--flag');
    expect(wrapper).toHaveClass('react-calendar__century-view__decades__decade');
    expect(wrapper).toHaveClass('testFunctionClassName');
  });

  it('renders component without abbreviation', async () => {
    const { container } = await render(<Decade {...tileProps} date={new Date(2018, 0, 1)} />);

    const abbr = container.querySelector('abbr');

    expect(abbr).not.toBeInTheDocument();
    expect(container).toHaveTextContent('2011 – 2020');
  });

  it("is disabled when date is before beginning of minDate's decade", async () => {
    const { container } = await render(
      <Decade {...tileProps} date={new Date(2010, 0, 1)} minDate={new Date(2020, 0, 1)} />,
    );

    const tile = container.querySelector('.react-calendar__tile');

    expect(tile).toBeDisabled();
  });

  it("is not disabled when date is after beginning of minDate's decade", async () => {
    const { container } = await render(
      <Decade {...tileProps} date={new Date(2010, 0, 1)} minDate={new Date(2010, 0, 1)} />,
    );

    const tile = container.querySelector('.react-calendar__tile');

    expect(tile).toBeEnabled();
  });

  it("is disabled when date is after end of maxDate's decade", async () => {
    const { container } = await render(
      <Decade {...tileProps} date={new Date(2020, 0, 1)} maxDate={new Date(2010, 0, 1)} />,
    );

    const tile = container.querySelector('.react-calendar__tile');

    expect(tile).toBeDisabled();
  });

  it("is not disabled when date is before end of maxDate's decade", async () => {
    const { container } = await render(
      <Decade {...tileProps} date={new Date(2010, 0, 1)} maxDate={new Date(2010, 0, 1)} />,
    );

    const tile = container.querySelector('.react-calendar__tile');

    expect(tile).toBeEnabled();
  });

  it('calls onClick callback when clicked and sends proper date as an argument', async () => {
    const date = new Date(2010, 0, 1);
    const onClick = vi.fn();

    const { container } = await render(<Decade {...tileProps} date={date} onClick={onClick} />);

    await userEvent.click(container.querySelector('.react-calendar__tile') as HTMLDivElement);

    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledWith(date, expect.any(Object));
  });

  it('calls onMouseOver callback when hovered and sends proper date as an argument', async () => {
    const date = new Date(2010, 0, 1);
    const onMouseOver = vi.fn();

    const { container } = await render(
      <Decade {...tileProps} date={date} onMouseOver={onMouseOver} />,
    );

    const tile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
    await userEvent.hover(tile);

    expect(onMouseOver).toHaveBeenCalled();
    expect(onMouseOver).toHaveBeenCalledWith(date);
  });

  it('calls onMouseOver callback when focused and sends proper date as an argument', async () => {
    const date = new Date(2010, 0, 1);
    const onMouseOver = vi.fn();

    const { container } = await render(
      <Decade {...tileProps} date={date} onMouseOver={onMouseOver} />,
    );

    const tile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
    tile.focus();

    expect(onMouseOver).toHaveBeenCalled();
    expect(onMouseOver).toHaveBeenCalledWith(date);
  });

  it('renders tileContent properly', async () => {
    const { container } = await render(
      <Decade {...tileProps} tileContent={<div className="testContent" />} />,
    );

    const testContent = container.querySelector('.testContent');

    expect(testContent).toBeInTheDocument();
  });

  it('renders tileContent function result properly and sends proper arguments to it', async () => {
    const date = new Date(2018, 0, 1);
    const tileContent = vi.fn();
    tileContent.mockReturnValue(<div className="testContent" />);

    const { container } = await render(
      <Decade {...tileProps} date={date} tileContent={tileContent} />,
    );

    const testContent = container.querySelector('.testContent');

    expect(tileContent).toHaveBeenCalled();
    expect(tileContent).toHaveBeenCalledWith({
      activeStartDate: tileProps.activeStartDate,
      date,
      view: 'century',
    });
    expect(testContent).toBeInTheDocument();
  });

  it('uses formatYear if given', async () => {
    const locale = 'en-US';
    const date = new Date(2018, 0, 1);
    const formatYear = vi.fn();
    formatYear.mockReturnValue('Mock format');

    const { container } = await render(
      <Decade {...tileProps} date={date} formatYear={formatYear} locale={locale} />,
    );

    const tile = container.querySelector('.react-calendar__tile');

    expect(formatYear).toHaveBeenCalledTimes(2);
    expect(formatYear).toHaveBeenCalledWith(locale, new Date(2011, 0, 1));
    expect(tile).toHaveTextContent('Mock format – Mock format');
  });
});
