# FHI Time

A set of components for time related user interactions.

## FHI Time API-doc

...eller hvodan å samkjøre alle tidskomponentene.

### TODO

- [ ] ...

### Feilmeldinger

Må være konsistente på tvers av alle tidskomponenter

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

### Konstanter

Vi må se på hvordan vi skal forholde oss til konstanter.
Dette gjelder forsåvidt ikke bare tid...

### Delte resurser

Hvilke resurser skal deles, og hvor skal de ligge?

### Organisering av SCSS

Vi må se på hvordan vi skal organsisere css'en på en konsistent måte.

### Eksempelkode

All eksempelkode må være riktig i forhold til hva en faktisk finner i koden når en går og ser på eksempelet, og eksemplene bør være noenlunde like sånn logisk sett.
