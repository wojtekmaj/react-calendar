import type { OnClickWeekNumberFunc } from '../shared/types.js';

const className = 'react-calendar__tile';

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  onClickWeekNumber: OnClickWeekNumberFunc;
};

type DivProps = React.HTMLAttributes<HTMLDivElement> & {
  onClickWeekNumber?: undefined;
};

type WeekNumberProps<T = OnClickWeekNumberFunc | undefined> = (T extends OnClickWeekNumberFunc
  ? ButtonProps
  : DivProps) & {
  date: Date;
  weekNumber: number;
};

export default function WeekNumber(props: WeekNumberProps): React.ReactElement {
  const { onClickWeekNumber, weekNumber } = props;

  const children = <span>{weekNumber}</span>;

  if (onClickWeekNumber) {
    const { date, onClickWeekNumber, weekNumber, ...otherProps } = props;

    return (
      <button
        {...otherProps}
        className={className}
        onClick={(event) => onClickWeekNumber(weekNumber, date, event)}
        type="button"
      >
        {children}
      </button>
    );
  } else {
    const { date, onClickWeekNumber, weekNumber, ...otherProps } = props;

    return (
      <div {...otherProps} className={className}>
        {children}
      </div>
    );
  }
}
