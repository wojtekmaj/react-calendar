import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import WeekNumbers from './WeekNumbers';

describe('.react-calendar__month-view__weekNumbers', () => {
  const defaultProps = {
    activeStartDate: new Date(2017, 0, 1),
  } satisfies Partial<React.ComponentProps<typeof WeekNumbers>>;

  it('renders proper weekNumbers for a year that starts in week 1 (ISO 8601)', () => {
    const { container } = render(
      <WeekNumbers
        {...defaultProps}
        activeStartDate={new Date(2018, 0, 1)}
        calendarType="ISO 8601"
      />,
    );

    const weekNumbers = container.querySelectorAll('.react-calendar__tile');

    expect(weekNumbers).toHaveLength(5);
    expect(weekNumbers[0]).toHaveTextContent('1');
  });

  it('renders proper weekNumbers for a year that starts on week 52 (ISO 8601)', () => {
    const { container } = render(
      <WeekNumbers
        {...defaultProps}
        activeStartDate={new Date(2017, 0, 1)}
        calendarType="ISO 8601"
      />,
    );

    const weekNumbers = container.querySelectorAll('.react-calendar__tile');

    expect(weekNumbers).toHaveLength(6);
    expect(weekNumbers[0]).toHaveTextContent('52');
  });

  it('renders proper weekNumbers for a year that starts on week 53 (ISO 8601)', () => {
    const { container } = render(
      <WeekNumbers
        {...defaultProps}
        activeStartDate={new Date(2016, 0, 1)}
        calendarType="ISO 8601"
      />,
    );

    const weekNumbers = container.querySelectorAll('.react-calendar__tile');

    expect(weekNumbers).toHaveLength(5);
    expect(weekNumbers[0]).toHaveTextContent('53');
  });

  it('renders proper weekNumbers for a year that starts in week 1 (US)', () => {
    const { container } = render(
      <WeekNumbers {...defaultProps} activeStartDate={new Date(2017, 0, 1)} calendarType="US" />,
    );

    const weekNumbers = container.querySelectorAll('.react-calendar__tile');

    expect(weekNumbers).toHaveLength(5);
    expect(weekNumbers[0]).toHaveTextContent('1');
  });

  it('renders proper weekNumbers given showFixedNumberOfWeeks flag', () => {
    // Same config as in first test which gives 5 weeks, except for the flag
    const { container } = render(
      <WeekNumbers
        {...defaultProps}
        activeStartDate={new Date(2018, 0, 1)}
        calendarType="ISO 8601"
        showFixedNumberOfWeeks
      />,
    );

    const weekNumbers = container.querySelectorAll('.react-calendar__tile');

    expect(weekNumbers).toHaveLength(6);
    expect(weekNumbers[0]).toHaveTextContent('1');
  });

  it('renders static divs as children when not given onClickWeekNumber', () => {
    const { container } = render(<WeekNumbers {...defaultProps} calendarType="ISO 8601" />);

    const children = container.querySelectorAll('div.react-calendar__tile');

    expect(children).toHaveLength(6);
  });

  it('renders buttons as children when given onClickWeekNumber', () => {
    const { container } = render(
      <WeekNumbers {...defaultProps} calendarType="ISO 8601" onClickWeekNumber={vi.fn()} />,
    );

    const children = container.querySelectorAll('button.react-calendar__tile');

    expect(children).toHaveLength(6);
  });

  it('calls onClickWeekNumber function with proper arguments when clicked a week number (ISO 8601)', () => {
    const onClickWeekNumber = vi.fn();
    const { container } = render(
      <WeekNumbers
        {...defaultProps}
        calendarType="ISO 8601"
        onClickWeekNumber={onClickWeekNumber}
      />,
    );

    const firstChild = container.querySelector('button.react-calendar__tile') as HTMLButtonElement;
    fireEvent.click(firstChild);

    expect(onClickWeekNumber).toHaveBeenCalledWith(52, new Date(2016, 11, 26), expect.any(Object));
  });

  it('calls onClickWeekNumber function with proper arguments when clicked a week number (US)', () => {
    const onClickWeekNumber = vi.fn();
    const { container } = render(
      <WeekNumbers {...defaultProps} calendarType="US" onClickWeekNumber={onClickWeekNumber} />,
    );

    const firstChild = container.querySelector('button.react-calendar__tile') as HTMLButtonElement;
    fireEvent.click(firstChild);

    expect(onClickWeekNumber).toHaveBeenCalledWith(1, new Date(2017, 0, 1), expect.any(Object));
  });
});
