type LooseValuePiece = string | Date | null;

export type LooseValue = LooseValuePiece | [LooseValuePiece, LooseValuePiece];

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type View = 'century' | 'decade' | 'year' | 'month';
