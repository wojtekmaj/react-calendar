type ViewOptionsProps = {
  setShowDoubleView: (showDoubleView: boolean) => void;
  setShowFixedNumberOfWeeks: (showFixedNumberOfWeeks: boolean) => void;
  setShowNeighboringMonth: (showNeighboringMonth: boolean) => void;
  setShowWeekAbbreviation: (showWeekAbbreviation: boolean) => void;
  setShowWeekNumbers: (showWeekNumbers: boolean) => void;
  showDoubleView: boolean;
  showFixedNumberOfWeeks: boolean;
  showNeighboringMonth: boolean;
  showWeekAbbreviation: boolean;
  showWeekNumbers: boolean;
};

export default function ViewOptions({
  setShowDoubleView,
  setShowFixedNumberOfWeeks,
  setShowNeighboringMonth,
  setShowWeekAbbreviation,
  setShowWeekNumbers,
  showDoubleView,
  showFixedNumberOfWeeks,
  showNeighboringMonth,
  showWeekAbbreviation,
  showWeekNumbers,
}: ViewOptionsProps) {
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

  function onShowNeighboringMonthChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;

    setShowNeighboringMonth(checked);
  }

  function onShowWeekAbbreviationChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;

    setShowWeekAbbreviation(checked);
  }

  return (
    <fieldset>
      <legend>View options</legend>

      <div>
        <input
          checked={showDoubleView}
          id="showDoubleView"
          onChange={onShowDoubleViewChange}
          type="checkbox"
        />
        <label htmlFor="showDoubleView">Show double view</label>
      </div>

      <div>
        <input
          checked={showFixedNumberOfWeeks || showDoubleView}
          disabled={showDoubleView}
          id="showFixedNumberOfWeeks"
          onChange={onShowFixedNumberOfWeeksChange}
          type="checkbox"
        />
        <label htmlFor="showFixedNumberOfWeeks">Show fixed number of weeks</label>
      </div>

      <div>
        <input
          checked={showNeighboringMonth || showFixedNumberOfWeeks}
          disabled={showFixedNumberOfWeeks}
          id="showNeighboringMonth"
          onChange={onShowNeighboringMonthChange}
          type="checkbox"
        />
        <label htmlFor="showNeighboringMonth">{"Show neighboring month's days"}</label>
      </div>

      <div>
        <input
          checked={showWeekAbbreviation}
          id="showWeekAbbreviation"
          onChange={onShowWeekAbbreviationChange}
          type="checkbox"
        />
        <label htmlFor="showWeekAbbreviation">Show week abbreviation</label>
      </div>

      <div>
        <input
          checked={showWeekNumbers}
          id="showWeekNumbers"
          onChange={onShowWeekNumbersChange}
          type="checkbox"
        />
        <label htmlFor="showWeekNumbers">Show week numbers</label>
      </div>
    </fieldset>
  );
}
