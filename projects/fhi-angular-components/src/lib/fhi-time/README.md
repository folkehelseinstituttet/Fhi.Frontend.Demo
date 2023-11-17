# FHI Time

A set of components for time related user interactions.

## How to add i18n to your Angular app

In app.module.ts or another "core module" for your app, import and register:

```ts
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeNb from '@angular/common/locales/nb';
import localeNbExtra from '@angular/common/locales/extra/nb';
registerLocaleData(localeNb, 'nb', localeNbExtra);
```

and add a provider:

```ts
@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: 'nb' }
  ]
})
```

## TMP: Notes for 1. iteration of FHI time components

TODO: Remove this tmp-chapter when 1. iteration of fhi-time/* is ready for release

### Presentation

- Order: is the order under used under "All the time components" below OK?

- Example
  - Outputs: We show output as `console.info()`
  - Inputs: i think we should set all inputs
- Markup example
  - All example markup must be correct in relation to what you actually find in the code when you go and look at the example, and the examples should be logically similar.
  - Formatting
    - As Prettier does it?
- Documentaion
  - Should be logically similar.
  - Should follow the template  below.

### Documentaion template

We use [form-control-autosuggest.ts](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/src/MOCK_DB_DATA/library-items/form-controls/form-control-autosuggest.ts) as template and make adjustments if needed.

### Global documentaion for all time components

We must document how to set up an Angular app with correct locale etc...

### Inputs and Outputs

#### In general

##### Outputs

- Outputs in use when nested time components, better solution with year as example:
  - `(years)="onYearsSelect($event, 'from')"` -> `onFoo(years: number[], context: string) {}`
  - `(years)="onYearsSelect($event, 'to')"` -> `onFoo(years: number[], context: string) {}`
  - and context can be defined as an enum

##### Inputs

- ID's:
  - ID's should always be included as input (always optional?)
  - If ID is optional:
    - it should be for all time components
    - solution to set value should be the same in all time components
    - but the value must be unique
- Labels:
  - Must be inputs in "child components"
  - No label input in time components which are never used as children
  - **PS. All labes must be styled i the same way...**
- Legends (?), placeholders:
  - Should not be inputs.
  - Must be consistent på across all time components.

#### All the time components

- **FhiDatepickerComponent**
  - `@Input() id: number`
  - `@Input() date: FhiDate`
  - `@Input() minDate: FhiDate`
  - `@Input() maxDate: FhiDate`
  - `@Input() label: string` (default: "Velg dato", and we don't set this input in our demo-app examples)
  - `@Output() dateSelect: FhiDate`
    - Output example: `{ year: 2023, month: 11, day: 9 }` (Same as NgBootstrap's dateicker)

- **FhiDateRangeComponent**
  - `@Input() id: number`
  - `@Input() dateRange: FhiDateRange`
  - `@Input() minDate: FhiDate`
  - `@Input() maxDate: FhiDate`
  - `@Output() dateRangeSelect: FhiDateRange`
    - Output example: `{ from: FhiDate, to: FhiDate }`

- **FhiDateTmeComponent**
  - `@Input() id: number`
  - `@Input() dateTime: FhiDateTime`
  - `@Input() minDateTime: FhiDateTime` // not implemented
  - `@Input() maxDateTime: FhiDateTime` // not implemented
  - `@Output() dateTimeSelect: FhiDateTime`
    - Output example: `{ date: { year: 2023, month: 11, day: 9 }, time: { hour: 8, minute: 10, second: 0 } }`

- **FhiWeekpickerComponent**
  - `@Input() id: number`
  - `@Input() week: FhiWeek`
  - `@Input() minWeek: FhiWeek`
  - `@Input() maxWeek: FhiWeek`
  - `@Input() label` (default: "Velg uke", and we don't set this input in our demo-app examples)
  - `@Output() weekSelect: FhiWeek`
    - Output example: `{ year: yyyy, week: u[u] }`

- **FhiWeekRangeComponent**
  - `@Input() id: number`
  - `@Input() weekRange: FhiWeekRange`
  - `@Input() minWeek: FhiWeek`
  - `@Input() maxWeek: FhiWeek`
  - `@Output() weekRangeSelect: FhiWeekRange`
    - Output example: `{ from: { year: yyyy, week: u[u] }, to: { year: yyyy, week: u[u] } }`

- **FhiMonthsComponent** // not implemented
  - `@Input() id: number`
  - `@Input() ...`
  - `@Output() monthSelect: number[]`
    - Output example: `[ m[m], ... ]`
    - It's very likely that we'll need this one as well, ie. just months without year.

- **FhiYearMonthComponent**
  - `@Input() id: number`
  - `@Input() month: FhiMonth`
  - `@Input() minMonth: FhiMonth`
  - `@Input() maxMonth: FhiMonth`
  - `@Output() monthSelect: FhiMonth`
    - Output example: `{ year: yyyy, month: m[m] }`

- **FhiYearMonthRangeComponent**
  - `@Input() id: number`
  - `@Input() monthRange: FhiMonthRange`
  - `@Input() minMonth: FhiMonth`
  - `@Input() maxMonth: FhiMonth`
  - `@Output() monthRangeSelect: FhiMonthRange`
    - Output example: `{ from: FhiMonth, to: FhiMonth }`

- **FhiYearsComponent**
  - `@Input() id: number`
  - `@Input() years: number[]`
  - `@Input() minYear: number`
  - `@Input() maxYear: number`
  - `@Input() label` (default: "Velg år", and we don't set this input in our demo-app examples)
  - `@Output() yearSelect: number[]`
    - Output example: `[ yyyy, ... ]`

- **FhiYearRangeComponent**
  - `@Input() id: number`
  - `@Input() yearRange: FhiYearRange`
  - `@Input() minYear: number`
  - `@Input() maxYear: number`
  - `@Output() monthRangeSelect: FhiYearRange`
    - Output example: `{ from: yyyy, to: yyyy }`

### Outside scope of the current iteration

#### Error messages

Error messages must be consistent på across all time components.

#### Shared resources

Which resources should be shared, and where should they be located?

#### Shared constants

We need to look at how to deal with constants.
(This does not only apply to time...)

#### Organize and update SCSS

- We have to look at how to organize the CSS in a consistent way.
- And all class names should be in sync with component names

