import Months from './YearView/Months.js';

type YearViewProps = React.ComponentProps<typeof Months>;

/**
 * Displays a given year.
 */
const YearView: React.FC<YearViewProps> = function YearView(props) {
  function renderMonths() {
    return <Months {...props} />;
  }

  return <div className="react-calendar__year-view">{renderMonths()}</div>;
};

export default YearView;
