import type { CALENDAR_TYPES } from './const';

export type Action = 'prev' | 'prev2' | 'next' | 'next2' | 'onChange' | 'drillUp' | 'drillDown';

export type CalendarType = typeof CALENDAR_TYPES[keyof typeof CALENDAR_TYPES];

export type ClassName = string | string[];

export type Detail = 'century' | 'decade' | 'year' | 'month';

export type LooseValue = string | Date | null | (Date | null)[];

export type Range<T> = [T, T];

export type RangeType = 'century' | 'decade' | 'year' | 'month' | 'day';

export type Value = Date | null | (Date | null)[];

export type View = 'century' | 'decade' | 'year' | 'month';

export type NavigationLabelArgs = {
  date: Date;
  label: string;
  locale: string | undefined;
  view: View;
};

export type NavigationLabelFunc = ({
  date,
  label,
  locale,
  view,
}: NavigationLabelArgs) => React.ReactNode;

export type OnArgs = {
  action: Action;
  activeStartDate: Date | null;
  value: Date | null | (Date | null)[];
  view: View;
};

export type OnChangeFunc = (value: Date, event: React.MouseEvent<HTMLButtonElement>) => void;

export type OnClickWeekNumberFunc = (
  weekNumber: number,
  date: Date,
  event: React.MouseEvent<HTMLButtonElement>,
) => void;

export type TileArgs = {
  activeStartDate: Date;
  date: Date;
  view: View;
};

export type TileClassNameFunc = (args: TileArgs) => string;

export type TileContentFunc = (args: TileArgs) => React.ReactNode;

export type TileDisabledFunc = (args: TileArgs) => boolean;
