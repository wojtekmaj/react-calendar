import { useId } from 'react';

type ViewOptionsProps = {
  setShowDoubleView: (showDoubleView: boolean) => void;
  setShowFixedNumberOfWeeks: (showFixedNumberOfWeeks: boolean) => void;
  setShowNeighboringCentury: (showNeighboringCentury: boolean) => void;
  setShowNeighboringDecade: (showNeighboringDecade: boolean) => void;
  setShowNeighboringMonth: (showNeighboringMonth: boolean) => void;
  setShowWeekNumbers: (showWeekNumbers: boolean) => void;
  showDoubleView: boolean;
  showFixedNumberOfWeeks: boolean;
  showNeighboringCentury: boolean;
  showNeighboringDecade: boolean;
  showNeighboringMonth: boolean;
  showWeekNumbers: boolean;
};

export default function ViewOptions({
  setShowDoubleView,
  setShowFixedNumberOfWeeks,
  setShowNeighboringCentury,
  setShowNeighboringDecade,
  setShowNeighboringMonth,
  setShowWeekNumbers,
  showDoubleView,
  showFixedNumberOfWeeks,
  showNeighboringCentury,
  showNeighboringDecade,
  showNeighboringMonth,
  showWeekNumbers,
}: ViewOptionsProps) {
  const showDoubleViewId = useId();
  const showFixedNumberOfWeeksId = useId();
  const showNeighboringCenturyId = useId();
  const showNeighboringDecadeId = useId();
  const showNeighboringMonthId = useId();
  const showWeekNumbersId = useId();

  function onShowDoubleViewChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;

    setShowDoubleView(checked);
  }

  function onShowFixedNumberOfWeeksChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;

    setShowFixedNumberOfWeeks(checked);
  }

  function onShowWeekNumbersChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;

    setShowWeekNumbers(checked);
  }

  function onShowNeighboringCenturyChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;

    setShowNeighboringCentury(checked);
  }

  function onShowNeighboringDecadeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;

    setShowNeighboringDecade(checked);
  }

  function onShowNeighboringMonthChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;

    setShowNeighboringMonth(checked);
  }

  return (
    <fieldset>
      <legend>View options</legend>

      <div>
        <input
          checked={showDoubleView}
          id={showDoubleViewId}
          onChange={onShowDoubleViewChange}
          type="checkbox"
        />
        <label htmlFor={showDoubleViewId}>Show double view</label>
      </div>

      <div>
        <input
          checked={showFixedNumberOfWeeks || showDoubleView}
          disabled={showDoubleView}
          id={showFixedNumberOfWeeksId}
          onChange={onShowFixedNumberOfWeeksChange}
          type="checkbox"
        />
        <label htmlFor={showFixedNumberOfWeeksId}>Show fixed number of weeks</label>
      </div>

      <div>
        <input
          checked={showNeighboringCentury}
          id={showNeighboringCenturyId}
          onChange={onShowNeighboringCenturyChange}
          type="checkbox"
        />
        <label htmlFor={showNeighboringCenturyId}>Show neighboring century's decades</label>
      </div>

      <div>
        <input
          checked={showNeighboringDecade}
          id={showNeighboringDecadeId}
          onChange={onShowNeighboringDecadeChange}
          type="checkbox"
        />
        <label htmlFor={showNeighboringDecadeId}>Show neighboring decade's years</label>
      </div>

      <div>
        <input
          checked={showNeighboringMonth || showFixedNumberOfWeeks}
          disabled={showFixedNumberOfWeeks}
          id={showNeighboringMonthId}
          onChange={onShowNeighboringMonthChange}
          type="checkbox"
        />
        <label htmlFor={showNeighboringMonthId}>Show neighboring month's days</label>
      </div>

      <div>
        <input
          checked={showWeekNumbers}
          id={showWeekNumbersId}
          onChange={onShowWeekNumbersChange}
          type="checkbox"
        />
        <label htmlFor={showWeekNumbersId}>Show week numbers</label>
      </div>
    </fieldset>
  );
}
