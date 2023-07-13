import { describe, expect, it } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import WeekNumber from './WeekNumber.js';

describe('<WeekNumber /> component', () => {
  const defaultProps = {
    date: new Date(2019, 0, 1),
    weekNumber: 1,
  } satisfies React.ComponentProps<typeof WeekNumber>;

  it('renders div by default', () => {
    const { container } = render(<WeekNumber {...defaultProps} />);

    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders button given onClickWeekNumber prop', () => {
    const onClickWeekNumber = () => {
      // Intentionally empty
    };

    const { container } = render(
      <WeekNumber {...defaultProps} onClickWeekNumber={onClickWeekNumber} />,
    );

    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('renders weekNumber properly', () => {
    const weekNumber = 42;

    const { container } = render(<WeekNumber {...defaultProps} weekNumber={weekNumber} />);

    expect(container).toHaveTextContent(`${weekNumber}`);
  });
});
