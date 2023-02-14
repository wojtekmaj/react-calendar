import React from 'react';
import { render } from '@testing-library/react';

import WeekNumber from './WeekNumber';

describe('<WeekNumber /> component', () => {
  const defaultProps = {
    date: new Date(2019, 0, 1),
    weekNumber: 1,
  };

  it('renders div by default', () => {
    const { container } = render(<WeekNumber {...defaultProps} />);

    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders button given onClickWeekNumber prop', () => {
    const onClickWeekNumber = () => {};

    const { container } = render(
      <WeekNumber {...defaultProps} onClickWeekNumber={onClickWeekNumber} />,
    );

    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('renders weekNumber properly', () => {
    const weekNumber = '42';

    const { container } = render(<WeekNumber {...defaultProps} weekNumber={weekNumber} />);

    expect(container).toHaveTextContent(weekNumber);
  });

  it('calls weekNumberContent properly (only on related prop change)', () => {
    const weekNumberContent = jest.fn();

    const { rerender } = render(
      <WeekNumber {...defaultProps} weekNumberContent={weekNumberContent} />,
    );

    // Trigger any unrelated prop change
    rerender(
      <WeekNumber
        {...defaultProps}
        onClickWeekNumber={() => 'unrelated'}
        weekNumberContent={weekNumberContent}
      />,
    );

    expect(weekNumberContent).toHaveBeenCalledTimes(1);
    expect(weekNumberContent).toHaveBeenCalledWith({
      ...defaultProps,
    });
  });

  it('applies weekNumberContent to div properly given function', () => {
    const content = 'content';
    const weekNumberContent = () => content;
    const { container } = render(
      <WeekNumber {...defaultProps} weekNumberContent={weekNumberContent} />,
    );

    const div = container.querySelector('div');

    expect(div).toHaveTextContent(content);
  });

  it('applies weekNumberContent to div properly given string', () => {
    const content = 'content';
    const { container } = render(<WeekNumber {...defaultProps} weekNumberContent={content} />);

    const div = container.querySelector('div');

    expect(div).toHaveTextContent(content);
  });
});
