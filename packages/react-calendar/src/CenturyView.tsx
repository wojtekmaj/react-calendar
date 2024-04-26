import Decades from './CenturyView/Decades.js';

type CenturyViewProps = React.ComponentProps<typeof Decades>;

/**
 * Displays a given century.
 */
export default function CenturyView(props: CenturyViewProps) {
  function renderDecades() {
    return <Decades {...props} />;
  }

  return <div className="react-calendar__century-view">{renderDecades()}</div>;
}
