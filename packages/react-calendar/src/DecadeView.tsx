import Years from './DecadeView/Years.js';

type DecadeViewProps = React.ComponentProps<typeof Years>;

/**
 * Displays a given decade.
 */
export default function DecadeView(props: DecadeViewProps): React.ReactElement {
  function renderYears() {
    return <Years {...props} />;
  }

  return <div className="react-calendar__decade-view">{renderYears()}</div>;
}
