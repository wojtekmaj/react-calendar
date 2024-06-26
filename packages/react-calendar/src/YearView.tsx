import Months from './YearView/Months.js';

type YearViewProps = React.ComponentProps<typeof Months>;

/**
 * Displays a given year.
 */
export default function YearView(props: YearViewProps): React.ReactElement {
  function renderMonths() {
    return <Months {...props} />;
  }

  return <div className="react-calendar__year-view">{renderMonths()}</div>;
}
