import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import './Sample.css';

export default function Sample() {
  const [value, onChange] = useState<Date | null | (Date | null)[]>(new Date());

  return (
    <div className="Sample">
      <header>
        <h1>react-calendar sample page</h1>
      </header>
      <div className="Sample__container">
        <main className="Sample__container__content">
          <Calendar onChange={(nextValue) => onChange(nextValue)} showWeekNumbers value={value} />
        </main>
      </div>
    </div>
  );
}
