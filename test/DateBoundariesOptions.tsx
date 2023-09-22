import { getISOLocalDateTime } from '@wojtekmaj/date-utils';

type DateBoundariesOptionsProps = {
  maxDate: Date | undefined;
  minDate: Date | undefined;
  setMaxDate: (date: Date | undefined) => void;
  setMinDate: (date: Date | undefined) => void;
};

export default function DateBoundariesOptions({
  maxDate,
  minDate,
  setMaxDate,
  setMinDate,
}: DateBoundariesOptionsProps) {
  function onMinChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setMinDate(new Date(value));
  }

  function onMaxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setMaxDate(new Date(value));
  }

  return (
    <fieldset>
      <legend>Minimum and maximum date</legend>

      <div>
        <label htmlFor="minDatetime">Minimum date</label>
        <input
          id="minDatetime"
          onChange={onMinChange}
          type="datetime-local"
          value={minDate ? getISOLocalDateTime(minDate) : ''}
        />
        &nbsp;
        <button onClick={() => setMinDate(undefined)} type="button">
          Clear
        </button>
      </div>
      <div>
        <label htmlFor="maxDatetime">Maximum date</label>
        <input
          id="maxDatetime"
          onChange={onMaxChange}
          type="datetime-local"
          value={maxDate ? getISOLocalDateTime(maxDate) : ''}
        />
        &nbsp;
        <button onClick={() => setMaxDate(undefined)} type="button">
          Clear
        </button>
      </div>
    </fieldset>
  );
}
