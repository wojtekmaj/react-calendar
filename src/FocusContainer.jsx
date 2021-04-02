import React from 'react';
import PropTypes from 'prop-types';
import { getBeginNext, getBeginPrevious, getEndPrevious } from './shared/dates';
import { isValue, isView } from './shared/propTypes';

export default function FocusContainer({
  children, value, activeStartDate, setActiveStartDate, showDoubleView, view,
}) {
  const currentValue = Array.isArray(value) ? value[0] : value;
  const [activeTabDate, setActiveTabDate] = React.useState(currentValue ?? activeStartDate);
  const containerRef = React.useRef(null);

  // Move the focus to the current focusable element
  React.useEffect(() => {
    // If the previously focused element was not in the grid,
    // (e.g. it was a navigation button), we don't move the focus
    if (!containerRef.current?.contains(document.activeElement)) {
      return;
    }

    // We are applying the focus async, to ensure that the calendar view
    // was already updated
    setTimeout(() => {
      const focusableElement = containerRef.current?.querySelector('[tabindex="0"]');
      if (focusableElement) {
        focusableElement.focus();
      }
    }, 0);
  }, [activeTabDate]);

  // Set the focusable element to the active start date when the
  // active start date changes and the previous focusable element goes
  // out of view (e.g. when using the navigation buttons)
  React.useEffect(() => {
    const beginNext = getBeginNext(view, activeStartDate);
    const endPrevious = getEndPrevious(view, activeStartDate);

    if (
      (activeTabDate <= endPrevious)
      || (!showDoubleView && activeTabDate >= beginNext)
      || (showDoubleView && activeTabDate >= getBeginNext(view, beginNext))
    ) {
      setActiveTabDate(activeStartDate);
    }
  }, [view, activeStartDate]);

  // Handle arrow keyboard interactions by moving the focusable element around
  React.useEffect(() => {
    const handleKeyPress = (event) => {
      // Only handle keyboard events when we're focused within the calendar grid
      if (!containerRef.current?.contains(document.activeElement)) {
        return;
      }

      const nextTabDate = new Date(activeTabDate);

      switch (true) {
        case (event.key === 'ArrowUp' && view === 'month'):
          nextTabDate.setDate(activeTabDate.getDate() - 7);
          break;
        case (event.key === 'ArrowUp' && view === 'year'):
          nextTabDate.setMonth(activeTabDate.getMonth() - 3);
          break;
        case (event.key === 'ArrowUp' && view === 'decade'):
          nextTabDate.setFullYear(activeTabDate.getFullYear() - 3);
          break;
        case (event.key === 'ArrowUp' && view === 'century'):
          nextTabDate.setFullYear(activeTabDate.getFullYear() - 30);
          break;
        case (event.key === 'ArrowDown' && view === 'month'):
          nextTabDate.setDate(activeTabDate.getDate() + 7);
          break;
        case (event.key === 'ArrowDown' && view === 'year'):
          nextTabDate.setMonth(activeTabDate.getMonth() + 3);
          break;
        case (event.key === 'ArrowDown' && view === 'decade'):
          nextTabDate.setFullYear(activeTabDate.getFullYear() + 3);
          break;
        case (event.key === 'ArrowDown' && view === 'century'):
          nextTabDate.setFullYear(activeTabDate.getFullYear() + 30);
          break;
        case (event.key === 'ArrowLeft' && view === 'month'):
          nextTabDate.setDate(activeTabDate.getDate() - 1);
          break;
        case (event.key === 'ArrowLeft' && view === 'year'):
          nextTabDate.setMonth(activeTabDate.getMonth() - 1);
          break;
        case (event.key === 'ArrowLeft' && view === 'decade'):
          nextTabDate.setFullYear(activeTabDate.getFullYear() - 1);
          break;
        case (event.key === 'ArrowLeft' && view === 'century'):
          nextTabDate.setFullYear(activeTabDate.getFullYear() - 10);
          break;
        case (event.key === 'ArrowRight' && view === 'month'):
          nextTabDate.setDate(activeTabDate.getDate() + 1);
          break;
        case (event.key === 'ArrowRight' && view === 'year'):
          nextTabDate.setMonth(activeTabDate.getMonth() + 1);
          break;
        case (event.key === 'ArrowRight' && view === 'decade'):
          nextTabDate.setFullYear(activeTabDate.getFullYear() + 1);
          break;
        case (event.key === 'ArrowRight' && view === 'century'):
          nextTabDate.setFullYear(activeTabDate.getFullYear() + 10);
          break;
        default:
          break;
      }

      // If the focusable element is unchanged, exit
      if (nextTabDate.getTime() === activeTabDate.getTime()) {
        return;
      }

      setActiveTabDate(nextTabDate);

      // If the new focusable element is out of view, adjust the view
      // by changing the active start date
      const beginNext = getBeginNext(view, activeStartDate);
      if (nextTabDate < activeStartDate) {
        setActiveStartDate(getBeginPrevious(view, activeStartDate));
      } else if (
        (!showDoubleView && nextTabDate >= beginNext)
        || (showDoubleView && nextTabDate >= getBeginNext(view, beginNext))
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
    <>
      {children({ activeTabDate, containerRef })}
    </>
  );
}

FocusContainer.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  children: PropTypes.func.isRequired,
  setActiveStartDate: PropTypes.func.isRequired,
  showDoubleView: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    isValue,
  ]),
  view: isView.isRequired,
};
