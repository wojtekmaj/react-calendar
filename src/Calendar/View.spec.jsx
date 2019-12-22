import React from 'react';
import { shallow } from 'enzyme';

import View from './View';

describe('View', () => {
  const defaultProps = {
    activeStartDate: new Date(2017, 0, 1),
  };

  describe('renders views properly', () => {
    it('renders MonthView when given view = "month"', () => {
      const component = shallow(
        <View
          {...defaultProps}
          view="month"
        />,
      );

      const monthView = component.find('MonthView');

      expect(monthView).toHaveLength(1);
    });

    it('renders YearView when given view = "year"', () => {
      const component = shallow(
        <View
          {...defaultProps}
          view="year"
        />,
      );

      const yearView = component.find('YearView');

      expect(yearView).toHaveLength(1);
    });

    it('renders DecadeView when given view = "decade"', () => {
      const component = shallow(
        <View
          {...defaultProps}
          view="decade"
        />,
      );

      const decadeView = component.find('DecadeView');

      expect(decadeView).toHaveLength(1);
    });

    it('renders CenturyView when given view = "century"', () => {
      const component = shallow(
        <View
          {...defaultProps}
          view="century"
        />,
      );

      const centuryView = component.find('CenturyView');

      expect(centuryView).toHaveLength(1);
    });
  });
});
