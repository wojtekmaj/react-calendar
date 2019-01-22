![downloads](https://img.shields.io/npm/dt/react-calendar.svg) ![build](https://img.shields.io/travis/wojtekmaj/react-calendar/master.svg) ![dependencies](https://img.shields.io/david/wojtekmaj/react-calendar.svg
) ![dev dependencies](https://img.shields.io/david/dev/wojtekmaj/react-calendar.svg
) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# React-Calendar

<div align="center">
  <img width="436" heigth="398" src="https://wojtekmaj.home.pl/projekty/react-calendar/react-calendar.jpg">
</div>

Ultimate calendar for your React app.

* Pick days, months, years, or even decades
* Supports range selection
* Supports virtually any language
* No moment.js needed

## tl;dr
* Install by executing `npm install react-calendar` or `yarn add react-calendar`.
* Import by adding `import Calendar from 'react-calendar'`.
* Use by adding `<Calendar />`. Use `onChange` prop for getting new values.

## Demo

Minimal demo page is included in sample directory.

[Online demo](http://projects.wojtekmaj.pl/react-calendar/) is also available!

## Getting started

### Compatibility

Your project needs to use React 15.5 or later.

React-Calendar uses modern web technologies. That's why it's so fast, lightweight and easy to style. This, however, comes at a cost of [supporting only modern browsers](https://caniuse.com/#feat=internationalization).

#### Legacy browsers

If you need to support legacy browsers like Internet Explorer 10, you will need to use [Intl.js](https://github.com/andyearnshaw/Intl.js/) or another Intl polyfill along with React-Calendar.

### Installation

Add React-Calendar to your project by executing `npm install react-calendar` or `yarn add react-calendar`.

### Usage

Here's an example of basic usage:

```js
import React, { Component } from 'react';
import Calendar from 'react-calendar';

class MyApp extends Component {
  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}
```

### Custom styling

If you don't want to use default React-Calendar styling to build upon it, you can import React-Calendar by using `import Calendar from 'react-calendar/dist/entry.nostyle';` instead.

## User guide

### Calendar

Displays a complete, interactive calendar.

#### Props

|Prop name|Description|Example values|
|----|----|----|
|activeStartDate|The beginning of a period that shall be displayed by default when no value is given. Defaults to today.|`new Date(2017, 0, 1)`|
|calendarType|Defines which type of calendar should be used. Can be "ISO 8601", "US", "Arabic", or "Hebrew". Defaults to a calendar most commonly used in specific locale. Setting to "US" or "Hebrew" will change the first day of the week to Sunday. Setting to "Arabic" will change the first day of the week to Saturday. Setting to "Arabic" or "Hebrew" will make weekends appear on Friday to Saturday.|`"ISO 8601"`|
|className|Defines class name(s) that will be added along with "react-calendar" to the main React-Calendar `<div>` element.|<ul><li>String: `"class1 class2"`</li><li>Array of strings: `["class1", "class2 class3"]`</li></ul>|
|formatMonth|Function called to override default formatting of month names. Can be used to use your own formatting function.|`(locale, date) => formatDate(date, 'MMM')`|
|formatMonthYear|Function called to override default formatting of month and year in the top navigation section. Can be used to use your own formatting function.|`(locale, date) => formatDate(date, 'MMMM YYYY')`|
|formatShortWeekday|Function called to override default formatting of weekday names. Can be used to use your own formatting function.|`(locale, date) => formatDate(date, 'dd')`|
|locale|Defines which locale should be used by the calendar. Can be any [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag). Defaults to user's browser settings.|`"hu-HU"`|
|maxDate|Defines maximum date that the user can select. Periods partially overlapped by maxDate will also be selectable, although react-calendar will ensure that no later date is selected.|Date: `new Date()`|
|maxDetail|Defines the most detailed view that the user shall see. View defined here also becomes the one on which clicking an item will select a date and pass it to onChange. Can be "month", "year", "decade" or "century". Defaults to "month".|`"month"`|
|minDate|Defines minimum date that the user can select. Periods partially overlapped by minDate will also be selectable, although react-calendar will ensure that no earlier date is selected.|Date: `new Date()`|
|minDetail|Defines the least detailed view that the user shall see. Can be "month", "year", "decade" or "century". Defaults to "century".|`"century"`|
|navigationLabel|Defines the content of a label rendered on calendar navigation bar.|``({ date, view, label }) => `Current view: ${view}, date: ${date.toLocaleDateString()}` ``|
|nextLabel|Defines the content of the "next" button on the navigation pane. Defaults to "›".|<ul><li>String: `"›"`</li><li>React element: `<NextIcon />`</li></ul>|
|next2Label|Defines the content of the "next on higher level" button on the navigation pane. Defaults to "»". |<ul><li>String: `"»"`</li><li>React element: `<DoubleNextIcon />`</li></ul>|
|onActiveDateChange|Function called when the user navigates from one view to another using previous/next button.|`({ activeStartDate, view }) => alert('Changed view to: ', activeStartDate, view)`|
|onChange|Function called when the user clicks an item (day on month view, month on year view and so on) on the most detailed view available.|`(value) => alert('New date is: ', value)`|
|onClickDay|Function called when the user clicks a day.|`(value) => alert('Clicked day: ', value)`|
|onClickDecade|Function called when the user clicks a decade.|`(value) => alert('Clicked decade: ', value)`|
|onClickMonth|Function called when the user clicks a month.|`(value) => alert('Clicked month: ', value)`|
|onClickWeekNumber|Function called when the user clicks a week number.|`(weekNumber, date) => alert('Clicked week: ', weekNumber, 'that starts on: ', date)`|
|onClickYear|Function called when the user clicks a year.|`(value) => alert('Clicked year: ', value)`|
|onDrillDown|Function called when the user drills down by clicking a tile.|`({ activeStartDate, view }) => alert('Drilled down to: ', activeStartDate, view)`|
|onDrillUp|Function called when the user drills up by clicking drill up button.|`({ activeStartDate, view }) => alert('Drilled up to: ', activeStartDate, view)`|
|prevLabel|Defines the content of the "previous" button on the navigation pane. Defaults to "‹".|<ul><li>String: `"‹"`</li><li>React element: `<PreviousIcon />`</li></ul>|
|prev2Label|Defines the content of the "previous on higher level" button on the navigation pane. Defaults to "«".|<ul><li>String: `"«"`</li><li>React element: `<DoublePreviousIcon />`</li></ul>|
|returnValue|Defines which dates shall be passed by the calendar to the onChange function and onClick{Period} functions. Can be "start", "end" or "range". The latter will cause an array with start and end values to be passed. Defaults to "start".|`"range"`|
|showNavigation|Defines whether a navigation bar with arrows and title shall be rendered. Defaults to true.|`false`|
|showFixedNumberOfWeeks|Defines whether to always show fixed number of weeks (6). Forces showNeighboringMonth prop to be true. Defaults to false.|`true`|
|showNeighboringMonth|Defines whether days from previous or next month shall be rendered if the month doesn't start on the first day of the week or doesn't end on the last day of the week, respectively. Defaults to true.|`false`|
|selectRange|Defines whether the user shall select two dates forming a range instead of just one. Note: This feature will make React-Calendar return array with two dates regardless of returnValue setting. Defaults to false.|`true`|
|showWeekNumbers|Defines whether week numbers shall be shown at the left of MonthView or not. Defaults to false.|`true`|
|tileClassName|Defines class name(s) that will be applied to a given calendar item (day on month view, month on year view and so on).|<ul><li>String: `"class1 class2"`</li><li>Array of strings: `["class1", "class2 class3"]`</li><li>Function: `({ date, view }) => view === 'month' && date.getDay() === 3 ? 'wednesday' : null`</li></ul>|
|tileContent|Allows to render custom content within a given calendar item (day on month view, month on year view and so on).|<ul><li>String: `"Sample"`</li><li>React element: `<TileContent />`</li><li>Function: `({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null`</li></ul>|
|tileDisabled|Pass a function to determine if a certain day should be displayed as disabled.|<ul><li>Function: `({activeStartDate, date, view }) => date.getDay() === 0`</li></ul>|
|value|Defines the value of the calendar.|<ul><li>Date: `new Date()`</li><li>An array of dates: `[new Date(2017, 0, 1), new Date(2017, 7, 1)]`|
|view|Determines which calendar view shall be opened initially. Does not disable navigation. Can be "month", "year", "decade" or "century". Defaults to the most detailed view allowed.|`"year"`|

### MonthView, YearView, DecadeView, CenturyView

Displays a given month, year, decade and a century, respectively.

#### Props

|Prop name|Description|Example values|
|----|----|----|
|activeStartDate|The beginning of a period that shall be displayed.|`new Date(2017, 0, 1)`|
|hover|The date over which the user is hovering.|`new Date(2017, 0, 1)`|
|maxDate|Defines maximum date that the user can select. Periods partially overlapped by maxDate will also be selectable, although react-calendar will ensure that no later date is selected.|Date: `new Date()`|
|minDate|Defines minimum date that the user can select. Periods partially overlapped by minDate will also be selectable, although react-calendar will ensure that no earlier date is selected.|Date: `new Date()`|
|onClick|Function called when the user clicks an item (day on month view, month on year view and so on).|`(value) => alert('New date is: ', value)`|
|tileClassName|Defines class name(s) that will be applied to a given calendar item (day on month view, month on year view and so on).|<ul><li>String: `"class1 class2"`</li><li>Array of strings: `["class1", "class2 class3"]`</li><li>Function: `({ date, view }) => view === 'month' && date.getDay() === 3 ? 'saturday' : null`</li></ul>|
|tileContent|Allows to render custom content within a given item (day on month view, month on year view and so on). Note: For tiles with custom content you might want to set fixed height of `react-calendar__tile` to ensure consistent layout.|`({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null`|
|value|Defines the value of the calendar.|<ul><li>Date: `new Date()`</li><li>An array of dates: `[new Date(2017, 0, 1), new Date(2017, 7, 1)]`</li><li>String: `2017-01-01`</li><li>An array of strings: `['2017-01-01', '2017-08-01']`</li></ul>|

## License

The MIT License.

## Author

<table>
  <tr>
    <td>
      <img src="https://github.com/wojtekmaj.png?s=100" width="100">
    </td>
    <td>
      Wojciech Maj<br />
      <a href="mailto:kontakt@wojtekmaj.pl">kontakt@wojtekmaj.pl</a><br />
      <a href="http://wojtekmaj.pl">http://wojtekmaj.pl</a>
    </td>
  </tr>
</table>

## Thank you

### Sponsors

Thank you to all our sponsors! [Become a sponsor](https://opencollective.com/react-calendar#sponsor) and get your image on our README on GitHub.

<a href="https://opencollective.com/react-calendar#sponsors" target="_blank"><img src="https://opencollective.com/react-calendar/sponsors.svg?width=890"></a>

### Backers

Thank you to all our backers! [Become a backer](https://opencollective.com/react-calendar#backer) and get your image on our README on GitHub.

<a href="https://opencollective.com/react-calendar#backers" target="_blank"><img src="https://opencollective.com/react-calendar/backers.svg?width=890"></a>

### Top Contributors

Thank you to all our contributors that helped on this project!

![Top Contributors](https://opencollective.com/react-calendar/contributors.svg?width=890&button=false)
