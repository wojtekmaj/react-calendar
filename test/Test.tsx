import { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import DateBoundariesOptions from './DateBoundariesOptions.js';
import MaxDetailOptions from './MaxDetailOptions.js';
import MinDetailOptions from './MinDetailOptions.js';
import LocaleOptions from './LocaleOptions.js';
import ValueOptions from './ValueOptions.js';
import ViewOptions from './ViewOptions.js';

import { formatDate } from './shared/dateFormatter.js';

import './Test.css';

import type { LooseValue, Value, View } from './shared/types.js';
import type {CalendarType} from 'react-calendar/src/index.js';
import CalendarTypeOptions from './CalendarTypeOptions.js';

const now = new Date();

const tileClassName = ({ date, view }: { date: Date; view: View }) => {
  switch (view) {
    case 'week':
      return date.getDay() === 0 || date.getDay() === 6 ? 'red' : null;
    case 'month':
      return date.getDay() === 0 || date.getDay() === 6 ? 'red' : null;
    case 'year':
      return date.getMonth() === 5 || date.getMonth() === 6 ? 'green' : null;
    case 'decade':
      return date.getFullYear() === 1991 ? 'pink' : null;
    case 'century':
      return date.getFullYear() === 1991 ? 'brown' : null;
    default:
      return null;
  }
};

const tileContent = ({ date, view }: { date: Date; view: View }) => {
  switch (view) {
    case 'week':
      return date.getDay() === 0 ? (
        <p>
          <small>{"It's Sunday!"}</small>
        </p>
      ) : null;
    case 'month':
      return date.getDay() === 0 ? (
        <p>
          <small>{"It's Sunday!"}</small>
        </p>
      ) : null;
    case 'year':
      return date.getMonth() === 5 || date.getMonth() === 6 ? (
        <p>
          <small>Holidays</small>
        </p>
      ) : null;
    case 'decade':
      return date.getFullYear() === 1991 ? (
        <p>
          <small>{"Developer's birthday!"}</small>
        </p>
      ) : null;
    case 'century':
      return date.getFullYear() === 1991 ? (
        <p>
          <small>{"The 90's"}</small>
        </p>
      ) : null;
    default:
      return null;
  }
};

const nineteenNinetyFive = new Date(1995, now.getUTCMonth() + 1, 15, 12);
const fifteenthOfNextMonth = new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 15, 12);

type ReturnValue = 'start' | 'end' | 'range';

export default function Test() {
  const [activeStartDate, setActiveStartDate] = useState<Date | undefined>(
    new Date(now.getFullYear(), now.getMonth()),
  );
  const [locale, setLocale] = useState<string>();
  const [maxDate, setMaxDate] = useState<Date | undefined>(fifteenthOfNextMonth);
  const [calendarType, setCalendarType] = useState<CalendarType>('gregory');
  const [maxDetail, setMaxDetail] = useState<View>('month');
  const [minDate, setMinDate] = useState<Date | undefined>(nineteenNinetyFive);
  const [minDetail, setMinDetail] = useState<View>('century');
  const [returnValue /* , setReturnValue */] = useState<ReturnValue>('start');
  const [selectRange, setSelectRange] = useState(false);
  const [showDoubleView, setShowDoubleView] = useState(false);
  const [showFixedNumberOfWeeks, setShowFixedNumberOfWeeks] = useState(false);
  const [showNeighboringCentury, setShowNeighboringCentury] = useState(false);
  const [showNeighboringDecade, setShowNeighboringDecade] = useState(false);
  const [showNeighboringMonth, setShowNeighboringMonth] = useState(true);
  const [showWeekNumbers, setShowWeekNumbers] = useState(false);
  const [value, setValue] = useState<LooseValue>(now);
  const [view, setView] = useState<View>('month');

  const onViewOrDateChange = useCallback(
    ({
      activeStartDate: nextActiveStartDate,
      view: nextView,
    }: {
      activeStartDate: Date | null;
      view: View;
    }) => {
      console.log('Changed view to', nextView, nextActiveStartDate);
      setActiveStartDate(nextActiveStartDate || undefined);
      setView(nextView);
    },
    [],
  );

  function renderDebugInfo() {
    const renderDate = (dateToRender: string | Date | null) => {
      if (dateToRender instanceof Date) {
        return formatDate(locale, dateToRender);
      }
      return dateToRender;
    };

    if (Array.isArray(value)) {
      return <p>{`Chosen date range: ${renderDate(value[0])} - ${renderDate(value[1])}`}</p>;
    }

    return <p>{`Chosen date: ${value ? renderDate(value) : '(none)'}`}</p>;
  }

  const commonProps = {
    className: 'myCustomCalendarClassName',
    calendarType,
    locale,
    maxDate,
    maxDetail,
    minDate,
    minDetail,
    onActiveStartDateChange: onViewOrDateChange,
    onChange: (value: Value) => setValue(value),
    onClickWeekNumber: (weekNumber: number, date: Date) => {
      console.log('Clicked week number', weekNumber, date);
    },
    onDrillDown: ({
      activeStartDate: nextActiveStartDate,
      view: nextView,
    }: {
      activeStartDate: Date | null;
      view: View;
    }) => {
      console.log('Drilled down to', nextView, nextActiveStartDate);
    },
    onDrillUp: ({
      activeStartDate: nextActiveStartDate,
      view: nextView,
    }: {
      activeStartDate: Date | null;
      view: View;
    }) => {
      console.log('Drilled up to', nextView, nextActiveStartDate);
    },
    onViewChange: onViewOrDateChange,
    returnValue,
    selectRange,
    showDoubleView,
    showFixedNumberOfWeeks,
    showNeighboringCentury,
    showNeighboringDecade,
    showNeighboringMonth,
    showWeekNumbers,
    tileClassName,
    tileContent,
  };

  return (
    <div className="Test">
      <header>
        <h1>react-calendar test page</h1>
      </header>
      <div className="Test__container">
        <aside className="Test__container__options">
          <MinDetailOptions
            maxDetail={maxDetail}
            minDetail={minDetail}
            setMinDetail={setMinDetail}
          />
          <MaxDetailOptions
            maxDetail={maxDetail}
            minDetail={minDetail}
            setMaxDetail={setMaxDetail}
          />
          <DateBoundariesOptions
            maxDate={maxDate}
            minDate={minDate}
            setMaxDate={setMaxDate}
            setMinDate={setMinDate}
          />
          <CalendarTypeOptions calendarType={calendarType} setCalendarType={setCalendarType} />
          <LocaleOptions locale={locale} setLocale={setLocale} />
          <ValueOptions
            selectRange={selectRange}
            setSelectRange={setSelectRange}
            setValue={setValue}
            value={value}
          />
          <ViewOptions
            setShowDoubleView={setShowDoubleView}
            setShowFixedNumberOfWeeks={setShowFixedNumberOfWeeks}
            setShowNeighboringCentury={setShowNeighboringCentury}
            setShowNeighboringDecade={setShowNeighboringDecade}
            setShowNeighboringMonth={setShowNeighboringMonth}
            setShowWeekNumbers={setShowWeekNumbers}
            showDoubleView={showDoubleView}
            showFixedNumberOfWeeks={showFixedNumberOfWeeks}
            showNeighboringCentury={showNeighboringCentury}
            showNeighboringDecade={showNeighboringDecade}
            showNeighboringMonth={showNeighboringMonth}
            showWeekNumbers={showWeekNumbers}
          />
        </aside>
        <main className="Test__container__content">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              console.error('Calendar triggered submitting the form.');
              console.log(event);
            }}
          >
            <p>Controlled:</p>
            <Calendar
              {...commonProps}
              activeStartDate={activeStartDate}
              value={value}
              view={view}
            />
            <p>Uncontrolled:</p>
            <Calendar
              {...commonProps}
              defaultActiveStartDate={activeStartDate}
              defaultValue={value}
              defaultView={view}
            />
          </form>
          {renderDebugInfo()}
        </main>
      </div>
    </div>
  );
}
