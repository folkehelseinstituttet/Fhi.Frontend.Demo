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

- Decide on and synchronize all output formats! (ask others what they prefer as a format)
- Outputs in use when nested time components:
  - `(foo)="onFooFrom"`
  - `(foo)="onFooTo"`

#### List of all outputs (work in progress)

- **FhiDatepickerComponent**
  - `@Output() dateSelect`
  - Alternative 1
    - Type: `string`
    - Example: `2023-11-09`
  - Alternative 2
    - Type: `FhiDate`
    - Example: `{ year: 2023, month: 11, day: 9 }` (Same as NgBootstrap's dateicker)

- **FhiDateTmeComponent**
  - `@Output() dateAndTimeSelect`
  - Type: `FhiDateAndTime`
  - Alternative 1
    - Example: `2023-11-09T08:10:00Z`
  - Alternative 2
    - Example: `{ date: { year: 2023, month: 11, day: 9 }, time: { hour: 8, minute: 10, second: 0 } }`

- **FhiDateRangeComponent**
  - `@Output() dateRangeSelect`
  - Type: `FhiDateRange`
  - Alternative 1
    - Example: `{ from: 'yyyy-mm-dd', to: 'yyyy-mm-dd' }`
  - Alternative 1
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

- **FhiYearMonthRangeComponent**
  - `@Output() monthRangeSelect`
  - Type: `FhiMonthRange`
  - Example: `{ from: { year: yyyy, month: m[m] }, to: { year: yyyy, month: m[m] } }`

- **FhiYearSelectorComponent**
  - `@Output() yearSelect`
  - Type: `number[]`
  - Example: `[ yyyy, ... ]`

- **FhiYearRangeComponent**
  - `@Output() monthRangeSelect`
  - Type: `FhiYearRange`
  - Example: `{ from: yyyy, to: yyyy }`

### Inputs

#### In general

- ID should always be included as input (always optional?)
- If ID is optional:
  - it should be for all time components
  - solution to set value should be the same in all time components
  - but the value must be unique

#### List of all inputs (work in progress)

- **FhiDatepickerComponent**
  - `@Input() id`

- **FhiDateRangeComponent**
  - `@Input() id`
  - `@Input() minDate`
  - `@Input() maxDate`

- **FhiDateTmeComponent**
  - `@Input() id`

- **FhiWeekpickerComponent**
  - `@Input() id`

- **FhiWeekRangeComponent**
  - `@Input() id`
  - `@Input() minWeek`
  - `@Input() maxWeek`

- **FhiMonthsComponent**
  - `@Input() id`
  - `@Input() singelMonth` boolean

- **FhiYearMonthRangeComponent**
  - `@Input() id`
  - `@Input() minMonth`
  - `@Input() maxMonth`

- **FhiYearSelectorComponent**
  - `@Input() id`
  - `@Input() singelYear` boolean

- **FhiYearRangeComponent**
  - `@Input() id`
  - `@Input() minYear`
  - `@Input() maxYear`

### Labels, legends (?), placeholders

- Should not be inputs.
- Must be consistent på across all time components.

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
