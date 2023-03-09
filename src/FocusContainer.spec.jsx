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
    });
  });
});
