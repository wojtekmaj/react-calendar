import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Day from './Day.js';

const tileProps = {
  activeStartDate: new Date(2018, 0, 1),
  calendarType: 'iso8601',
  classes: ['react-calendar__tile'],
  currentMonthIndex: 0,
  date: new Date(2018, 0, 1),
} satisfies React.ComponentProps<typeof Day>;

describe('Day', () => {
  it('applies given classNames properly', () => {
    const { container } = render(
      <Day
        {...tileProps}
        classes={['react-calendar__tile', 'react-calendar__tile--flag']}
        tileClassName={() => 'testFunctionClassName'}
      />,
    );

    const wrapper = container.querySelector('.react-calendar__tile');

    expect(wrapper).toHaveClass('react-calendar__tile');
    expect(wrapper).toHaveClass('react-calendar__tile--flag');
    expect(wrapper).toHaveClass('react-calendar__month-view__days__day');
    expect(wrapper).toHaveClass('testFunctionClassName');
  });

  it('applies additional classNames for weekends', () => {
    const { container } = render(
      <Day
        {...tileProps}
        date={new Date(2018, 0, 6)} // Saturday
      />,
    );

    const wrapper = container.querySelector('.react-calendar__tile');

    expect(wrapper).toHaveClass('react-calendar__month-view__days__day--weekend');
  });

  it('applies additional classNames for neighboring months', () => {
    const { container } = render(<Day {...tileProps} date={new Date(2018, 1, 2)} />);

    const wrapper = container.querySelector('.react-calendar__tile');

    expect(wrapper).toHaveClass('react-calendar__month-view__days__day--neighboringMonth');
  });

  it('renders component with proper abbreviation', () => {
    const { container } = render(<Day {...tileProps} date={new Date(2018, 0, 1)} />);

    const abbr = container.querySelector('abbr');

    expect(abbr).toBeInTheDocument();
    expect(abbr).toHaveAccessibleName('January 1, 2018');
    expect(container).toHaveTextContent('1');
  });

  it("is disabled when date is before beginning of minDate's day", () => {
    const { container } = render(
      <Day {...tileProps} date={new Date(2018, 0, 1)} minDate={new Date(2018, 0, 2)} />,
    );

    const tile = container.querySelector('.react-calendar__tile');

    expect(tile).toBeDisabled();
  });

  it("is not disabled when date is after beginning of minDate's day", () => {
    const { container } = render(
      <Day {...tileProps} date={new Date(2018, 0, 1)} minDate={new Date(2018, 0, 1)} />,
    );

    const tile = container.querySelector('.react-calendar__tile');

    expect(tile).toBeEnabled();
  });

  it("is disabled when date is after end of maxDate's day", () => {
    const { container } = render(
      <Day {...tileProps} date={new Date(2018, 0, 2)} maxDate={new Date(2018, 0, 1)} />,
    );

    const tile = container.querySelector('.react-calendar__tile');

    expect(tile).toBeDisabled();
  });

  it("is not disabled when date is before end of maxDate's day", () => {
    const { container } = render(
      <Day {...tileProps} date={new Date(2018, 0, 1)} maxDate={new Date(2018, 0, 1)} />,
    );

    const tile = container.querySelector('.react-calendar__tile');

    expect(tile).toBeEnabled();
  });

  it('calls onClick callback when clicked and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onClick = vi.fn();

    const { container } = render(<Day {...tileProps} date={date} onClick={onClick} />);

    fireEvent.click(container.querySelector('.react-calendar__tile') as HTMLDivElement);

    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledWith(date, expect.any(Object));
  });

  it('calls onMouseOver callback when hovered and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onMouseOver = vi.fn();

    const { container } = render(<Day {...tileProps} date={date} onMouseOver={onMouseOver} />);

    const tile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
    fireEvent.mouseOver(tile);

    expect(onMouseOver).toHaveBeenCalled();
    expect(onMouseOver).toHaveBeenCalledWith(date);
  });

  it('calls onMouseOver callback when focused and sends proper date as an argument', () => {
    const date = new Date(2018, 0, 1);
    const onMouseOver = vi.fn();

    const { container } = render(<Day {...tileProps} date={date} onMouseOver={onMouseOver} />);

    const tile = container.querySelector('.react-calendar__tile') as HTMLDivElement;
    fireEvent.focus(tile);

    expect(onMouseOver).toHaveBeenCalled();
    expect(onMouseOver).toHaveBeenCalledWith(date);
  });

  it('renders tileContent properly', () => {
    const { container } = render(
      <Day {...tileProps} tileContent={<div className="testContent" />} />,
    );

    const testContent = container.querySelector('.testContent');

    expect(testContent).toBeInTheDocument();
  });

  it('renders tileContent function result properly and sends proper arguments to it', () => {
    const date = new Date(2018, 0, 1);
    const tileContent = vi.fn();
    tileContent.mockReturnValue(<div className="testContent" />);

    const { container } = render(<Day {...tileProps} date={date} tileContent={tileContent} />);

    const testContent = container.querySelector('.testContent');

    expect(tileContent).toHaveBeenCalled();
    expect(tileContent).toHaveBeenCalledWith({
      activeStartDate: tileProps.activeStartDate,
      date,
      view: 'month',
    });
    expect(testContent).toBeInTheDocument();
  });

  it('uses formatDay if given', () => {
    const locale = 'en-US';
    const date = new Date(2018, 0, 1);
    const formatDay = vi.fn();
    formatDay.mockReturnValue('Mock format');

    const { container } = render(
      <Day {...tileProps} date={date} formatDay={formatDay} locale={locale} />,
    );

    const tile = container.querySelector('.react-calendar__tile');

    expect(formatDay).toHaveBeenCalled();
    expect(formatDay).toHaveBeenCalledWith(locale, date);
    expect(tile).toHaveTextContent('Mock format');
  });

  it('uses formatLongDate if given', () => {
    const locale = 'en-US';
    const date = new Date(2018, 0, 1);
    const formatLongDate = vi.fn();
    formatLongDate.mockReturnValue('Mock format');

    const { container } = render(
      <Day {...tileProps} date={date} formatLongDate={formatLongDate} locale={locale} />,
    );

    const abbr = container.querySelector('abbr');

    expect(formatLongDate).toHaveBeenCalled();
    expect(formatLongDate).toHaveBeenCalledWith(locale, date);
    expect(abbr).toHaveAccessibleName('Mock format');
  });
});
