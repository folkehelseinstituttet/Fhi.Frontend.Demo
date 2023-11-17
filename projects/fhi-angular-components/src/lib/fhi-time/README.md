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

### Outputs

#### In general

- Outputs in use when nested time components, better solution with year as example:
  - `(years)="onYearsSelect($event, 'from')"` -> `onFoo(years: number[], context: string) {}`
  - `(years)="onYearsSelect($event, 'to')"` -> `onFoo(years: number[], context: string) {}`
  - and context can be defined as an enum

#### List of all outputs (work in progress)

- **FhiDatepickerComponent**
  - `@Output() dateSelect`
    - Type: `FhiDate`
    - Example: `{ year: 2023, month: 11, day: 9 }` (Same as NgBootstrap's dateicker)

- **FhiDateTmeComponent**
  - `@Output() dateTimeSelect`
  - Type: `FhiDateTime`
  - Example: `{ date: { year: 2023, month: 11, day: 9 }, time: { hour: 8, minute: 10, second: 0 } }`

- **FhiDateRangeComponent**
  - `@Output() dateRangeSelect`
  - Type: `FhiDateRange`
  - Example: `{ from: FhiDate, to: FhiDate }`

- **FhiWeekpickerComponent**
  - `@Output() weekSelect`
  - Type: `FhiWeek`
  - Example: `{ year: yyyy, week: u[u] }`

- **FhiWeekRangeComponent**
  - `@Output() weekRangeSelect`
  - Type: `FhiweekRange`
  - Example: `{ from: { year: yyyy, week: u[u] }, to: { year: yyyy, week: u[u] } }`

- **FhiMonthsComponent**
  - `@Output() monthSelect`
  - Type: `number[]`
  - Example: `[ m[m], ... ]`

- **FhiMonthRangeComponent**
  - `@Output() monthRangeSelect`
  - Type: `FhiMonthRange`
  - Example: `{ from: { year: yyyy, month: m[m] }, to: { year: yyyy, month: m[m] } }`

- **FhiYearsComponent**
  - `@Output() yearSelect`
  - Type: `number[]`
  - Example: `[ yyyy, ... ]`

- **FhiYearRangeComponent**
  - `@Output() monthRangeSelect`
  - Type: `FhiYearRange`
  - Example: `{ from: yyyy, to: yyyy }`

### Inputs

#### In general

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

#### List of all inputs (work in progress)

- **FhiDatepickerComponent**
  - `@Input() id`
  - `@Input() date`
  - `@Input() minDate`
  - `@Input() maxDate`
  - `@Input() label` (default: "Velg dato", and we don't set this input in our demo-app examples)

- **FhiDateRangeComponent**
  - `@Input() id`
  - `@Input() dateRange`
  - `@Input() minDate`
  - `@Input() maxDate`

- **FhiDateTmeComponent**
  - `@Input() id`
  - `@Input() dateTime`
  - `@Input() minDateTime`
  - `@Input() maxDateTime`

- **FhiWeekpickerComponent**
  - `@Input() id`
  - `@Input() week`
  - `@Input() minWeek`
  - `@Input() maxWeek`
  - `@Input() label` (default: "Velg uke", and we don't set this input in our demo-app examples)

- **FhiWeekRangeComponent**
  - `@Input() id`
  - `@Input() weekRange`
  - `@Input() minWeek`
  - `@Input() maxWeek`

- **FhiMonthsComponent**
  - `@Input() id`
  - `@Input() month`
  - `@Input() minMonth`
  - `@Input() maxMonth`
  - `@Input() label` (default: "Velg måneder", and we don't set this input in our demo-app examples)

- **FhiMonthRangeComponent**
  - `@Input() id`
  - `@Input() monthRange`
  - `@Input() minMonth`
  - `@Input() maxMonth`

- **FhiYearsComponent**
  - `@Input() id`
  - `@Input() year`
  - `@Input() minYear`
  - `@Input() maxYear`
  - `@Input() label` (default: "Velg år", and we don't set this input in our demo-app examples)

- **FhiYearRangeComponent**
  - `@Input() id`
  - `@Input() yearRange`
  - `@Input() minYear`
  - `@Input() maxYear`

### Error messages

Error messages must be consistent på across all time components.

### Shared resources

Which resources should be shared, and where should they be located?

#### Shared constants

We need to look at how to deal with constants.
(This does not only apply to time...)

### Organize SCSS

We have to look at how to organize the CSS in a consistent way.

### Presentation

- Order: is the order under used under input/output above OK?
- Example
  - Showing output in `<code>`
- Markup example
  - All example markup must be correct in relation to what you actually find in the code when you go and look at the example, and the examples should be logically similar.
  - Inputs/outputs
  - Formatting? As Prettier does it?
- Documentaion
  - Should be logically similar.
  - Should follow the template  below.

### Documentaion template

We use [form-control-autosuggest.ts](https://github.com/folkehelseinstituttet/Fhi.Frontend.Demo/blob/dev/src/MOCK_DB_DATA/library-items/form-controls/form-control-autosuggest.ts) as template and make adjustments if needed.

### Global documentaion for all time components

We must document how to set up an Angular app with correct locale etc...
