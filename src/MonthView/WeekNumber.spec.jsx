import React from 'react';
import { shallow } from 'enzyme';

import WeekNumber from './WeekNumber';

describe('<WeekNumber /> component', () => {
  const defaultProps = {
    date: new Date(2019, 0, 1),
    weekNumber: 1,
  };

  it('renders div by default', () => {
    const component = shallow(
      <WeekNumber {...defaultProps} />,
    );

    expect(component.find('div')).toHaveLength(1);
  });

  it('renders button given onClickWeekNumber prop', () => {
    const onClickWeekNumber = () => {};

    const component = shallow(
      <WeekNumber
        {...defaultProps}
        onClickWeekNumber={onClickWeekNumber}
      />,
    );

    expect(component.find('button')).toHaveLength(1);
  });

  it('renders weekNumber properly', () => {
    const weekNumber = '42';

    const component = shallow(
      <WeekNumber
        {...defaultProps}
        weekNumber={weekNumber}
      />,
    );

    expect(component.text()).toBe(weekNumber);
  });
});
