declare module "react-calendar" {
  type Detail = "month" | "year" | "decade" | "century"
  type DateCallback = (date: Date) => void
  type FormatterCallback = (date: Date) => string
  type ViewCallback = (props: ViewCallbackProperties) => void

  export default function Calendar(props: CalendarProps): JSX.Element;

  export interface CalendarProps {
    activeStartDate?: Date;
    calendarType?: "US" | "ISO 8601";
    className?: string | string[];
    formatMonth?: FormatterCallback;
    formatMonthYear?: FormatterCallback;
    formatShortWeekday?: FormatterCallback;
    locale?: string;
    maxDate?: Date;
    maxDetail?: Detail;
    minDate?: Date;
    minDetail?: Detail;
    next2Label?: string | JSX.Element;
    nextLabel?: string | JSX.Element;
    onActiveDateChange?: ViewCallback;
    onChange?: DateCallback;
    onClickDay?: DateCallback;
    onClickDecade?: DateCallback;
    onClickMonth?: DateCallback;
    onClickWeekNumber?: DateCallback;
    onClickYear?: DateCallback;
    onDrillDown?: ViewCallback;
    onDrillUp?: ViewCallback;
    prev2Label?: string | JSX.Element;
    prevLabel?: string | JSX.Element;
    renderChildren?: (props: CalendarTileProperties) => JSX.Element | null; // For backwards compatibility
    returnValue?: "start" | "end" | "range";
    selectRange?: boolean;
    showNavigation?: boolean;
    showNeighboringMonth?: boolean;
    showWeekNumbers?: boolean;
    tileClassName?: string | string[] | ((props: CalendarTileProperties) => string | string[] | null);
    tileContent?: JSX.Element | ((props: CalendarTileProperties) => JSX.Element | null);
    tileDisabled?: (props: CalendarTileProperties) => boolean;
    value?: Date | Date[];
    view?: Detail;
  }

  export interface CalendarTileProperties {
    date: Date;
    view: Detail;
  }

  export interface ViewCallbackProperties {
    activeStartDate: Date;
    view: Detail;
  }

  export function MonthView(props: DetailViewProps): JSX.Element;
  export function YearView(props: DetailViewProps): JSX.Element;
  export function DecadeView(props: DetailViewProps): JSX.Element;
  export function CenturyView(props: DetailViewProps): JSX.Element;

  export interface DetailViewProps {
    activeStartDate: Date;
    hover?: Date;
    maxDate?: Date;
    minDate?: Date;
    onClick?: DateCallback;
    onMouseOver?: DateCallback;
    renderChildren?: (props: CalendarTileProperties) => JSX.Element | null; // For backwards compatibility
    tileClassName?: string | string[] | ((props: CalendarTileProperties) => string | string[] | null);
    tileContent?: JSX.Element | ((props: CalendarTileProperties) => JSX.Element | null);
    tileDisabled?: (props: CalendarTileProperties) => boolean;
    value?: Date | Date[];
  }
}
