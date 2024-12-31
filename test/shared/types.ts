export type Range<T> = [T, T];

type LooseValuePiece = string | Date | null;

export type LooseValue = LooseValuePiece | Range<LooseValuePiece>;

type ValuePiece = Date | null;

export type Value = ValuePiece | Range<ValuePiece>;

export type View = 'century' | 'decade' | 'year' | 'month' | 'week';

export const CALENDAR_TYPES = {
  GREGORY: 'gregory',
  HEBREW: 'hebrew',
  ISLAMIC: 'islamic',
  ISO_8601: 'iso8601',
} as const;

export type CalendarType = (typeof CALENDAR_TYPES)[keyof typeof CALENDAR_TYPES];

export function isCalendarType(value: unknown): value is CalendarType {
  return Object.values(CALENDAR_TYPES).some((v) => v === value);
}
