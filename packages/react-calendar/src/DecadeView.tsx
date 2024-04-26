import Years from './DecadeView/Years.js';

type DecadeViewProps = React.ComponentProps<typeof Years>;

/**
 * Displays a given decade.
 */
const DecadeView: React.FC<DecadeViewProps> = function DecadeView(props) {
  function renderYears() {
    return <Years {...props} />;
  }

  return <div className="react-calendar__decade-view">{renderYears()}</div>;
};

export default DecadeView;
