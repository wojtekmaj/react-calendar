export type Range<T> = [T, T];

type LooseValuePiece = string | Date | null;

export type LooseValue = LooseValuePiece | Range<LooseValuePiece>;

type ValuePiece = Date | null;

export type Value = ValuePiece | Range<ValuePiece>;

export type View = 'century' | 'decade' | 'year' | 'month';
