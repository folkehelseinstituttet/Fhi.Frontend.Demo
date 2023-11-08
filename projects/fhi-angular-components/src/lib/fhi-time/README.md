# FHI Time

A set of components for time related user interactions.

## TODO: How to syncronize all components

_Has a task in Azure DevOps:_

- [x] FhiDatepickerComponent
- [x] FhiDateAndTmeComponent
- [ ] FhiDateRangeComponent
- [x] FhiWeekpickerComponent
- [ ] FhiWeekRangeComponent
- [x] FhiMonthSelectorComponent
- [ ] FhiMonthRangeComponent
- [x] FhiYearSelectorComponent
- [ ] FhiYearRangeComponent

### Outputs

#### In general

- Decide on and synchronize all output formats! (ask others what they prefer as a format)
- Outputs in use when nested time components:
  - `(foo)="onFooFrom"`
  - `(foo)="onFooTo"`

#### List of all outputs (work in progress)

- **FhiDatepickerComponent**
  - `@Output() dateSelect`
  - Type: `string`
  - Example: `åååå-mm-dd`

- **FhiDateAndTmeComponent**
  - `@Output() dateAndTimeSelect`
  - Type: `FhiDateAndTime`
  - Example: `{ date: 'åååå-mm-dd', time: 'tt:mm' }`

- **FhiDateRangeComponent**
  - `@Output() dateRangeSelect`
  - Type: `FhiDateRange`
  - Example: `{ from: 'åååå-mm-dd', to: 'åååå-mm-dd' }`

- **FhiWeekpickerComponent**
  - `@Output() weekSelect`
  - Type: `FhiWeek`
  - Example: `{ year: åååå, week: uu }`

- **FhiWeekRangeComponent**
  - `@Output() weekRangeSelect`
  - Type: `FhiweekRange`
  - Example: `{ from: { year: åååå, week: uu }, to: { year: åååå, week: uu } }`

- **FhiMonthSelectorComponent**
  - `@Output() monthSelect`
  - Type: `number[]`
  - Example: `[ m[m], ... ]`

- **FhiMonthRangeComponent**
  - `@Output() monthRangeSelect`
  - Type: `FhiweekRange`
  - Example: `{ from: { year: åååå, week: u[u] }, to: { year: åååå, week: u[u] } }`

- **FhiYearSelectorComponent**
  - `@Output() yearSelect`
  - Type: `number[]`
  - Example: `[ åååå, ... ]`

- **FhiYearRangeComponent**
  - `@Output() monthRangeSelect`
  - Type: `FhiweekRange`
  - Example: `{ from: { year: åååå, week: u[u] }, to: { year: åååå, week: u[u] } }`

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
  - `@Input() maxDate`
  - `@Input() minDate`

- **FhiDateAndTmeComponent**
  - `@Input() id`

- **FhiWeekpickerComponent**
  - `@Input() id`

- **FhiWeekRangeComponent**
  - `@Input() id`
  - `@Input() maxWeek`
  - `@Input() minWeek`

- **FhiMonthSelectorComponent**
  - `@Input() id`
  - `@Input() singelMonth` boolean

- **FhiMonthRangeComponent**
  - `@Input() id`
  - `@Input() maxMonth`
  - `@Input() minMonth`

- **FhiYearSelectorComponent**
  - `@Input() id`
  - `@Input() singelYear` boolean

- **FhiYearRangeComponent**
  - `@Input() id`
  - `@Input() maxYear`
  - `@Input() minYear`

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
