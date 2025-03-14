import { CALENDAR_TYPES, isCalendarType, type CalendarType } from './shared/types.js';

const CALENDAR_TYPE_VALUES = Object.values(CALENDAR_TYPES);

function upperCaseFirstLetter(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

type CalendarTypeOptionsProps = {
  calendarType: CalendarType;
  setCalendarType: (calendarType: CalendarType) => void;
};

export default function CalendarTypeOptions({
  calendarType,
  setCalendarType,
}: CalendarTypeOptionsProps) {
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (isCalendarType(value)) {
      setCalendarType(value);
    }
  }

  return (
    <fieldset>
      <legend>Calendar Type</legend>

      {CALENDAR_TYPE_VALUES.map((calendar, index) => (
        <div key={calendar}>
          <input
            checked={calendarType === calendar}
            id={calendar}
            name="calendarType"
            onChange={onChange}
            type="radio"
            value={calendar}
          />
          {/* biome-ignore lint/a11y/noLabelWithoutControl: Pinky promise this label won't ever be empty */}
          <label htmlFor={calendar}>{upperCaseFirstLetter(calendar)}</label>
        </div>
      ))}
    </fieldset>
  );
}
