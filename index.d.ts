/// <reference types="react" />

type Detail = "month" | "year" | "decade" | "century"
type DateCallback = (date: Date) => void

declare module "react-calendar" {
  export default function Calendar(props: CalendarProps): JSX.Element;

  export interface CalendarProps {
    calendarType?: "US" | "ISO 8601";
    className?: string | string[];
    locale?: string;
    maxDate?: Date;
    maxDetail?: Detail;
    minDate?: Date;
    minDetail?: Detail;
    next2Label?: string | React.ReactElement<any>;
    nextLabel?: string | React.ReactElement<any>;
    onChange?: DateCallback;
    onClickDay?: DateCallback;
    onClickDecade?: DateCallback;
    onClickMonth?: DateCallback;
    onClickYear?: DateCallback;
    prev2Label?: string | React.ReactElement<any>;
    prevLabel?: string | React.ReactElement<any>;
    renderChildren?: (props: CalendarRenderChildrenProps) => JSX.Element | null;
    returnValue?: "start" | "end" | "range";
    showNavigation?: boolean;
    showNeighboringMonth?: boolean;
    showWeekNumbers?: boolean;
    value?: Date | Date[];
    view?: Detail;
  }

  export interface CalendarRenderChildrenProps {
    date: Date;
    view: Detail;
  }

  export function MonthView(props: DetailViewProps): JSX.Element;
  export function YearView(props: DetailViewProps): JSX.Element;
  export function DecadeView(props: DetailViewProps): JSX.Element;
  export function CenturyView(props: DetailViewProps): JSX.Element;

  export interface DetailViewProps {
    activeStartDate: Date;
    maxDate?: Date;
    minDate?: Date;
    onClick?: DateCallback;
    renderChildren?: (props: CalendarRenderChildrenProps) => JSX.Element | null;
    value?: Date | Date[];
  }
}
