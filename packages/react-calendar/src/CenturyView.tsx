import Decades from './CenturyView/Decades.js';

type CenturyViewProps = React.ComponentProps<typeof Decades>;

/**
 * Displays a given century.
 */
const CenturyView: React.FC<CenturyViewProps> = function CenturyView(props) {
  function renderDecades() {
    return <Decades {...props} />;
  }

  return <div className="react-calendar__century-view">{renderDecades()}</div>;
};

export default CenturyView;
