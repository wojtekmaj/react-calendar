import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import Calendar from './Calendar';

describe('FocusContainer', () => {
  const defaultMonthProps = {
    defaultValue: new Date('March 09, 2023'),
    defaultActiveStartDate: new Date('March 01, 2023'),
    view: 'month',
  };

  const defaultYearProps = {
    defaultValue: new Date('May 01, 2023'),
    defaultActiveStartDate: new Date('January 01, 2023'),
    view: 'year',
  };

  const defaultDecadeProps = {
    defaultValue: new Date('January 01, 2025'),
    defaultActiveStartDate: new Date('January 01, 2021'),
    view: 'decade',
  };

  const defaultCenturyProps = {
    defaultValue: new Date('January 01, 2041'),
    defaultActiveStartDate: new Date('January 01, 2001'),
    view: 'century',
  };

  const renderCalendar = (props) => {
    return render(<Calendar {...props} />);
  };

  it('Should focus the activeTabDate when grid receives focus', () => {
    renderCalendar(defaultMonthProps);

    screen.getByRole('grid').focus();
    expect(document.activeElement.textContent).toBe('9');
  });

  it('Should return focus to the activeTabDate if it has changed, when focus returns to the grid', async () => {
    renderCalendar(defaultMonthProps);
    screen.getByRole('grid').focus();

    fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
    await waitFor(() => expect(document.activeElement.textContent).toBe('10'));
    expect(document.activeElement.textContent).toBe('10');

    document.activeElement.blur();
    await waitFor(() => expect(document.activeElement).toBe(document.body));

    screen.getByRole('grid').focus();
    await waitFor(() => expect(document.activeElement.textContent).toBe('10'));
  });

  describe('keyboard navigation', () => {
    describe('arrowRight', () => {
      describe('monthView', () => {
        it('moves to the next day', async () => {
          renderCalendar(defaultMonthProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('10'));
        });

        it('wraps to the next row, if day is at the end of a row', async () => {
          renderCalendar({ ...defaultMonthProps, defaultValue: new Date('march 12, 2023') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('13'));
        });

        it('will not move focus beyond `maxDate`', async () => {
          renderCalendar({ ...defaultMonthProps, maxDate: new Date('March 9, 2023') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('9'));

          // The previous expect will return a false positive even if not capped by `maxDate`
          // This additional expect will fail however, if the 'ArrowRight' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('8'));
        });
      });

      describe('yearView', () => {
        it('moves to the next month', async () => {
          renderCalendar(defaultYearProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('June'));
        });

        it('wraps to the next row, if month is at the end of a row', async () => {
          renderCalendar({
            ...defaultYearProps,
            defaultValue: new Date('March 01, 2023'),
          });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('April'));
        });

        it('will not move focus beyond `maxDate`', async () => {
          renderCalendar({
            ...defaultYearProps,
            maxDate: new Date('May 31, 2023'),
          });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('May'));

          // The previous expect will return a false positive even if not capped by `maxDate`
          // This additional expect will fail however, if the 'ArrowRight' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('April'));
        });
      });

      describe('decadeView', () => {
        it('moves to the next month', async () => {
          renderCalendar(defaultDecadeProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2026'));
        });

        it('wraps to the next row, if year is at the end of a row', async () => {
          renderCalendar({
            ...defaultDecadeProps,
            defaultValue: new Date('January 01, 2023'),
          });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2024'));
        });

        it('will not move focus beyond `maxDate`', async () => {
          renderCalendar({
            ...defaultDecadeProps,
            maxDate: new Date('November 25, 2025'),
          });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2025'));

          // The previous expect will return a false positive even if not capped by `maxDate`
          // This additional expect will fail however, if the 'ArrowRight' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2024'));
        });
      });

      describe('centuryView', () => {
        it('moves to the next decade', async () => {
          renderCalendar(defaultCenturyProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2051 – 2060'));
        });

        it('wraps to the next row, if decade is at the end of a row', async () => {
          renderCalendar({
            ...defaultCenturyProps,
            defaultValue: new Date('January 01, 2055'),
          });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2061 – 2070'));
        });

        it('will not move focus beyond `maxDate`', async () => {
          renderCalendar({
            ...defaultCenturyProps,
            maxDate: new Date('November 25, 2045'),
          });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2041 – 2050'));

          // The previous expect will return a false positive even if not capped by `maxDate`
          // This additional expect will fail however, if the 'ArrowRight' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2031 – 2040'));
        });
      });
    });

    describe('arrowLeft', () => {
      describe('monthView', () => {
        it('moves to the previous day', async () => {
          renderCalendar(defaultMonthProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('8'));
        });

        it('wraps to the previous row, if day is at the start of a row', async () => {
          renderCalendar({ ...defaultMonthProps, defaultValue: new Date('march 6, 2023') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('5'));
        });

        it('will not move focus beyond `minDate`', async () => {
          renderCalendar({ ...defaultMonthProps, minDate: new Date('March 09, 2023') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('9'));

          // The previous expect will return a false positive even if not capped by `minDate`
          // This additional expect will fail however, if the 'ArrowLeft' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('10'));
        });
      });

      describe('yearView', () => {
        it('moves to the previous month', async () => {
          renderCalendar(defaultYearProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('April'));
        });

        it('wraps to the previous row, if month is at the start of a row', async () => {
          renderCalendar({ ...defaultYearProps, defaultValue: new Date('April 01, 2023') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('March'));
        });

        it('will not move focus beyond `minDate`', async () => {
          renderCalendar({ ...defaultYearProps, minDate: new Date('April 09, 2023') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('May'));

          // The previous expect will return a false positive even if not capped by `minDate`
          // This additional expect will fail however, if the 'ArrowLeft' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('June'));
        });
      });

      describe('decadeView', () => {
        it('moves to the previous month', async () => {
          renderCalendar(defaultDecadeProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2024'));
        });

        it('wraps to the previous row, if month is at the start of a row', async () => {
          renderCalendar({ ...defaultDecadeProps, defaultValue: new Date('January 01, 2024') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2023'));
        });

        it('will not move focus beyond `minDate`', async () => {
          renderCalendar({ ...defaultDecadeProps, minDate: new Date('April 09, 2024') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2025'));

          // The previous expect will return a false positive even if not capped by `minDate`
          // This additional expect will fail however, if the 'ArrowLeft' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2026'));
        });
      });

      describe('centuryView', () => {
        it('moves to the previous month', async () => {
          renderCalendar(defaultCenturyProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2031 – 2040'));
        });

        it('wraps to the previous row, if decade is at the start of a row', async () => {
          renderCalendar({ ...defaultCenturyProps, defaultValue: new Date('January 01, 2032') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2021 – 2030'));
        });

        it('will not move focus beyond `minDate`', async () => {
          renderCalendar({ ...defaultCenturyProps, minDate: new Date('April 09, 2035') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2041 – 2050'));

          // The previous expect will return a false positive even if not capped by `minDate`
          // This additional expect will fail however, if the 'ArrowLeft' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2051 – 2060'));
        });
      });
    });

    describe('arrowUp', () => {
      describe('monthView', () => {
        it('moves to the previous row', async () => {
          renderCalendar(defaultMonthProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2'));
        });

        it('wraps to the previous month, if day is in the first row', async () => {
          renderCalendar({ ...defaultMonthProps, defaultValue: new Date('march 2, 2023') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('23'));
        });

        it('will not move focus beyond `minDate`', async () => {
          renderCalendar({
            ...defaultMonthProps,
            defaultValue: new Date('March 2, 2023'),
            minDate: new Date('February 24, 2023'),
          });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2'));

          // The previous expect will return a false positive even if not capped by `minDate`
          // This additional expect will fail however, if the 'ArrowUp' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('9'));
        });
      });

      describe('yearView', () => {
        it('moves to the previous row', async () => {
          renderCalendar(defaultYearProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('February'));
        });

        it('wraps to the previous year, if month is in the first row', async () => {
          renderCalendar({ ...defaultYearProps, defaultValue: new Date('February 01, 2023') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('November'));
        });

        it('will not move focus beyond `minDate`', async () => {
          renderCalendar({
            ...defaultYearProps,
            defaultValue: new Date('May 1, 2023'),
            minDate: new Date('April 20, 2023'),
          });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('May'));

          // The previous expect will return a false positive even if not capped by `minDate`
          // This additional expect will fail however, if the 'ArrowUp' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('August'));
        });
      });

      describe('decadeView', () => {
        it('moves to the previous row', async () => {
          renderCalendar(defaultDecadeProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2022'));
        });

        it('wraps to the previous decade, if year ends in "1"', async () => {
          renderCalendar({ ...defaultDecadeProps, defaultValue: new Date('January 01, 2021') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2020'));
        });

        it('wraps to the previous decade, if year ends in "2"', async () => {
          renderCalendar({ ...defaultDecadeProps, defaultValue: new Date('January 01, 2022') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2018'));
        });

        it('wraps to the previous decade, if year ends in "3"', async () => {
          renderCalendar({ ...defaultDecadeProps, defaultValue: new Date('January 01, 2023') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2019'));
        });

        it('will not move focus beyond `minDate`', async () => {
          renderCalendar({
            ...defaultDecadeProps,
            defaultValue: new Date('January 1, 2025'),
            minDate: new Date('April 20, 2024'),
          });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2025'));

          // The previous expect will return a false positive even if not capped by `minDate`
          // This additional expect will fail however, if the 'ArrowUp' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2028'));
        });
      });

      describe('centuryView', () => {
        it('moves to the previous row', async () => {
          renderCalendar(defaultCenturyProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2011 – 2020'));
        });

        it('wraps to the previous century, if decade is in the 00s', async () => {
          renderCalendar({ ...defaultCenturyProps, defaultValue: new Date('January 01, 2001') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('1991 – 2000'));
        });

        it('wraps to the previous century, if decade is in the 10s', async () => {
          renderCalendar({ ...defaultCenturyProps, defaultValue: new Date('January 01, 2012') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('1971 – 1980'));
        });

        it('wraps to the previous century, if decade is in the 20s', async () => {
          renderCalendar({ ...defaultCenturyProps, defaultValue: new Date('January 01, 2023') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('1981 – 1990'));
        });

        it('will not move focus beyond `minDate`', async () => {
          renderCalendar({
            ...defaultCenturyProps,
            defaultValue: new Date('January 1, 2045'),
            minDate: new Date('April 20, 2045'),
          });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2041 – 2050'));

          // The previous expect will return a false positive even if not capped by `minDate`
          // This additional expect will fail however, if the 'ArrowUp' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2071 – 2080'));
        });
      });
    });

    describe('arrowDown', () => {
      describe('monthView', () => {
        it('moves to the next row', async () => {
          renderCalendar(defaultMonthProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('16'));
        });

        it('wraps to the next month, if day is in the last row', async () => {
          renderCalendar({ ...defaultMonthProps, defaultValue: new Date('march 30, 2023') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('6'));
        });

        it('will not move focus beyond `maxDate`', async () => {
          renderCalendar({
            ...defaultMonthProps,
            defaultValue: new Date('march 30, 2023'),
            maxDate: new Date('April 5, 2023'),
          });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('30'));

          // The previous expect will return a false positive even if not capped by `maxDate`
          // This additional expect will fail however, if the 'ArrowDown' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('23'));
        });
      });

      describe('yearView', () => {
        it('moves to the next row', async () => {
          renderCalendar(defaultYearProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('August'));
        });

        it('wraps to the next year, if month is in the last row', async () => {
          renderCalendar({ ...defaultYearProps, defaultValue: new Date('November 01 2023') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('February'));
        });

        it('will not move focus beyond `maxDate`', async () => {
          renderCalendar({
            ...defaultYearProps,
            defaultValue: new Date('May 01, 2023'),
            maxDate: new Date('May 5, 2023'),
          });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('May'));

          // The previous expect will return a false positive even if not capped by `maxDate`
          // This additional expect will fail however, if the 'ArrowDown' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('February'));
        });
      });

      describe('decadeView', () => {
        it('moves to the next row', async () => {
          renderCalendar(defaultDecadeProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2028'));
        });

        it('wraps to the next decade, if year is in the last row', async () => {
          renderCalendar({ ...defaultDecadeProps, defaultValue: new Date('January 01 2030') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2031'));
        });

        it('will not move focus beyond `maxDate`', async () => {
          renderCalendar({
            ...defaultDecadeProps,
            defaultValue: new Date('January 01, 2025'),
            maxDate: new Date('May 5, 2025'),
          });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2025'));

          // The previous expect will return a false positive even if not capped by `maxDate`
          // This additional expect will fail however, if the 'ArrowDown' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2022'));
        });
      });

      describe('centuryView', () => {
        it('moves to the next row', async () => {
          renderCalendar(defaultCenturyProps);
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2071 – 2080'));
        });

        it('wraps to the next century, if decade is in the 90s', async () => {
          renderCalendar({ ...defaultCenturyProps, defaultValue: new Date('January 01 2091') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2101 – 2110'));
        });

        it('wraps to the next century, if decade is in the 80s', async () => {
          renderCalendar({ ...defaultCenturyProps, defaultValue: new Date('January 01 2083') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2121 – 2130'));
        });

        it('wraps to the next century, if decade is in the 70s', async () => {
          renderCalendar({ ...defaultCenturyProps, defaultValue: new Date('January 01 2078') });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2111 – 2120'));
        });

        it('will not move focus beyond `maxDate`', async () => {
          renderCalendar({
            ...defaultCenturyProps,
            defaultValue: new Date('January 01, 2041'),
            maxDate: new Date('May 5, 2041'),
          });
          screen.getByRole('grid').focus();

          fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2041 – 2050'));

          // The previous expect will return a false positive even if not capped by `maxDate`
          // This additional expect will fail however, if the 'ArrowDown' dosen't no-op.
          fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
          await waitFor(() => expect(document.activeElement.textContent).toBe('2011 – 2020'));
        });
      });
    });
  });
});
