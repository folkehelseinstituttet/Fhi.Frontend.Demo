# FHI Time

A set of components for time related user interactions.

## TODO

- [ ] FhiDatepicker
  - Move into `./fhi-time`
  - Update according to documentation below

- [ ] FhiDateAndTime
  - Move into `./fhi-time`
  - Add a model `FhiDateAndTime`
  - Update according to documentation below

- [ ] FhiYearSelector
  - Move into `./fhi-time`
  - Update according to documentation below

- [ ] FhiMonthSelector
  - Remove year, and make it into a multiselect for months
  - Update according to documentation below

- [ ] FhiDateRange
  - Add a model `FhiDateRange`
  - Update according to documentation below

etc...

## HOW TO SYNCRONIZE ALL COMPONENTS

### All @Output's

- **FhiDatepicker**
  - `@Output dateSelect`, emitted value: `åååå-mm-dd` (string)

- **FhiDateAndTme**
  - `@Output dateAndTimeSelect`, emitted value: `{ date: 'åååå-mm-dd', time: 'tt:mm' }` (object: `FhiDateAndTime`)

- **FhiDateRange**
  - `@Output dateRangeSelect`, emitted value: `{ from: 'åååå-mm-dd', to: 'åååå-mm-dd' }` (object: `FhiDateRange`)

- **FhiWeekpicker**
  - `@Output weekSelect`, emitted value: `{ year: åååå, week: uu }` (object: `FhiWeek`)

- **FhiWeekRange**
  - `@Output weekRangeSelect`, emitted value: `{ from: { year: åååå, week: uu }, to: { year: åååå, week: uu } }` (object: `FhiweekRange`)

- **FhiMonthSelector**
  - `@Output monthSelect`, emitted value: `[ 1, 2, ... ]` (Array: `number[]`)

- **FhiMonthRange**
  - `@Output monthRangeSelect`, emitted value: `{ from: { year: åååå, week: uu }, to: { year: åååå, week: uu } }` (object: `FhiweekRange`)

- **FhiYearSelector**

- **FhiYearRange**

### Liste over @Input/@Output

- `FhiYearSelectorComponent`
  - @Input
    - `label`
    - `year`
    - `years`
    - `years`
  - @Output
    - `yearSelect`

- `FhiDatepicerComponent`
  - @Input
    - `id`
  - @Output
    - `dateSelect`

- `FhiWeekRangeComponent`
  - @Input
    - `weekFrom`
    - `weekTo`
    - `labelWeekFrom`
    - `labelWeekTo`
    - `maxWeek`
    - `minWeek`
  - @Output
    - `weekRangeSelect`

### Inputs

- ID bør alltid være med som input
- Hvis ID er optional så
  - bør den være det for alle tidskomponenter
  - løsning for å sette verdi bør være den samme
  - men verdien må være unik

### Outputs

- Bestemme oss for, og synkronisere alle output-format! (hør med andre hva de helst vil ha som format)

- Outputs in use when nested time components
  `(foo)="onFooFrom"`
  `(foo)="onFooTo"`

### Feilmeldinger

Må være konsistente på tvers av alle tidskomponenter

### Konstanter

Vi må se på hvordan vi skal forholde oss til konstanter.
Dette gjelder forsåvidt ikke bare tid...

### Delte resurser

Hvilke resurser skal deles, og hvor skal de ligge?

### Organisering av SCSS

Vi må se på hvordan vi skal organsisere css'en på en konsistent måte.

### Eksempelkode

All eksempelkode må være riktig i forhold til hva en faktisk finner i koden når en går og ser på eksempelet, og eksemplene bør være noenlunde like sånn logisk sett.
