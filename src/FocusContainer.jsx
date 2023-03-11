import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getBeginNext, getBeginPrevious, getEndPrevious } from './shared/dates';
import { isMaxDate, isMinDate, isValue, isView } from './shared/propTypes';

const DefaultFocusContext = {
  activeTabDate: new Date(),
  setActiveTabDate: () => null,
};

export const FocusContext = React.createContext(DefaultFocusContext);
FocusContext.displayName = 'FocusContext';

function clearTimeFromDate(date) {
  if (date !== null && date !== undefined) {
    return new Date(new Date(date).toDateString());
  } else {
    return date;
  }
}

const getTopRowYearOffset = (year) => {
  const yearDigit = `${year}`.slice(-1);

  if (yearDigit === '1') {
    return 1;
  } else if (yearDigit === '2' || yearDigit === '3') {
    return 4;
  } else {
    return 3;
  }
};

const getBottomRowYearOffset = (year) => {
  const yearDigit = `${year}`.slice(-1);

  if (yearDigit === '0') {
    return 1;
  } else {
    return 3;
  }
};

const getTopRowDecadeOffset = (year) => {
  const decadeDigit = `${year}`.slice(-2, -1);

  if (decadeDigit === '0') {
    return 10;
  } else if (decadeDigit === '1' || decadeDigit === '2') {
    return 40;
  } else {
    return 30;
  }
};

const getBottomRowDecaderOffset = (year) => {
  const decadeDigit = `${year}`.slice(-2, -1);

  if (decadeDigit === '9') {
    return 10;
  } else if (decadeDigit === '7' || decadeDigit === '8') {
    return 40;
  } else {
    return 30;
  }
};

export default function FocusContainer({
  activeStartDate,
  children,
  containerRef,
  maxDate,
  minDate,
  setActiveStartDate,
  showDoubleView,
  value,
  view,
}) {
  const currentValue = Array.isArray(value) ? value[0] : value;
  const [activeTabDateState, setActiveTabDateState] = useState(
    clearTimeFromDate(currentValue) ?? activeStartDate,
  );
  const activeTabeDateRef = useRef(activeTabDateState);
  const shouldSetFocusRef = useRef(false);

  const setActiveTabDateAndFocus = useCallback((date) => {
    shouldSetFocusRef.current = true;
    setActiveTabDateState(date);
  }, []);

  // Move the focus to the current focusable element
  useEffect(() => {
    // We are applying the focus async, to ensure that the calendar view
    // was already updated
    setTimeout(() => {
      const focusableElement = containerRef.current?.querySelector('[tabindex="0"]');
      if (shouldSetFocusRef.current) {
        shouldSetFocusRef.current = false;
        focusableElement?.focus();
      }
    }, 0);
  }, [activeTabDateState, containerRef]);

  // Using a ref in the below `useEffect`, rather than the actual `activeTabDate` value
  // prevents the `useEffect` from firing every time the `activeTabDate` changes.
  useEffect(() => {
    activeTabeDateRef.current = activeTabDateState;
  }, [activeTabDateState]);

  // Set the focusable element to the active start date when the
  // active start date changes and the previous focusable element goes
  // out of view (e.g. when using the navigation buttons)
  useEffect(() => {
    const beginNext = getBeginNext(view, activeStartDate);
    const endPrevious = getEndPrevious(view, activeStartDate);

    if (
      activeTabeDateRef.current <= endPrevious ||
      (!showDoubleView && activeTabeDateRef.current >= beginNext) ||
      (showDoubleView && activeTabeDateRef.current >= getBeginNext(view, beginNext))
    ) {
      setActiveTabDateState(activeStartDate);
    }
  }, [view, activeStartDate, activeTabeDateRef, showDoubleView]);

  // Handle arrow keyboard interactions by moving the focusable element around
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Only handle keyboard events when we're focused within the calendar grid
      if (!containerRef.current?.contains(document.activeElement)) {
        return;
      }

      const nextTabDate = new Date(activeTabDateState);

      if (
        event.key === 'ArrowUp' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowRight' ||
        event.key === 'ArrowLeft'
      ) {
        event.preventDefault();
      }

      switch (true) {
        case event.key === 'ArrowUp' && view === 'month':
          nextTabDate.setDate(activeTabDateState.getDate() - 7);
          break;
        case event.key === 'ArrowUp' && view === 'year':
          nextTabDate.setMonth(activeTabDateState.getMonth() - 3);
          break;
        case event.key === 'ArrowUp' && view === 'decade':
          nextTabDate.setFullYear(
            activeTabDateState.getFullYear() -
              getTopRowYearOffset(activeTabDateState.getFullYear()),
          );
          break;
        case event.key === 'ArrowUp' && view === 'century':
          nextTabDate.setFullYear(
            activeTabDateState.getFullYear() -
              getTopRowDecadeOffset(activeTabDateState.getFullYear()),
          );
          break;
        case event.key === 'ArrowDown' && view === 'month':
          nextTabDate.setDate(activeTabDateState.getDate() + 7);
          break;
        case event.key === 'ArrowDown' && view === 'year':
          nextTabDate.setMonth(activeTabDateState.getMonth() + 3);
          break;
        case event.key === 'ArrowDown' && view === 'decade':
          nextTabDate.setFullYear(
            activeTabDateState.getFullYear() +
              getBottomRowYearOffset(activeTabDateState.getFullYear()),
          );
          break;
        case event.key === 'ArrowDown' && view === 'century':
          nextTabDate.setFullYear(
            activeTabDateState.getFullYear() +
              getBottomRowDecaderOffset(activeTabDateState.getFullYear()),
          );
          break;
        case event.key === 'ArrowLeft' && view === 'month':
          nextTabDate.setDate(activeTabDateState.getDate() - 1);
          break;
        case event.key === 'ArrowLeft' && view === 'year':
          nextTabDate.setMonth(activeTabDateState.getMonth() - 1);
          break;
        case event.key === 'ArrowLeft' && view === 'decade':
          nextTabDate.setFullYear(activeTabDateState.getFullYear() - 1);
          break;
        case event.key === 'ArrowLeft' && view === 'century':
          nextTabDate.setFullYear(activeTabDateState.getFullYear() - 10);
          break;
        case event.key === 'ArrowRight' && view === 'month':
          nextTabDate.setDate(activeTabDateState.getDate() + 1);
          break;
        case event.key === 'ArrowRight' && view === 'year':
          nextTabDate.setMonth(activeTabDateState.getMonth() + 1);
          break;
        case event.key === 'ArrowRight' && view === 'decade':
          nextTabDate.setFullYear(activeTabDateState.getFullYear() + 1);
          break;
        case event.key === 'ArrowRight' && view === 'century':
          nextTabDate.setFullYear(activeTabDateState.getFullYear() + 10);
          break;
        default:
          break;
      }

      // If the focusable element is unchanged, exit
      if (nextTabDate.getTime() === activeTabDateState.getTime()) {
        return;
      }

      // If the focusable element is outside the allowable bounds, exit
      if (nextTabDate.getTime() > maxDate.getTime() || nextTabDate.getTime() < minDate.getTime()) {
        return;
      }

      setActiveTabDateAndFocus(nextTabDate);

      // If the new focusable element is out of view, adjust the view
      // by changing the active start date
      const beginNext = getBeginNext(view, activeStartDate);
      if (nextTabDate < activeStartDate) {
        setActiveStartDate(getBeginPrevious(view, activeStartDate));
      } else if (
        (!showDoubleView && nextTabDate >= beginNext) ||
        (showDoubleView && nextTabDate >= getBeginNext(view, beginNext))
      ) {
        setActiveStartDate(beginNext);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  return (
    <FocusContext.Provider
      value={{ activeTabDate: activeTabDateState, setActiveTabDate: setActiveTabDateAndFocus }}
    >
      {children}
    </FocusContext.Provider>
  );
}

FocusContainer.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  children: PropTypes.node.isRequired,
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  maxDate: isMaxDate,
  minDate: isMinDate,
  setActiveStartDate: PropTypes.func.isRequired,
  showDoubleView: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, isValue]),
  view: isView.isRequired,
};
