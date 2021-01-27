export const NgbDatepickerDocumentation = `
# Input med datepicker

Dette er første utkast, bedre dokumentasjon kommer når eksempelet er ferdig med validering mm.

## FHI-NgBootstrap
For at FHI-styling av NgBootstrap komponenter skal fungere må følgende klasse være med i body-tag:

\`\`\`html
<body class="fhi-ngb">...</body>
\`\`\`

## NgbDatepicker API

[https://ng-bootstrap.github.io/#/components/datepicker/api](https://ng-bootstrap.github.io/#/components/datepicker/api)

## TypeScript

Komponentkode og dependencies som må være med i app'en.

### 1. Komponenten

Dette er minimum av kode som må være med i komponenten som skal bruke eksempel-datepicker'en.
Ønsket \`minDate\`, \`maxDate\`, \`navigation\` og \`outsideDays\` kan også konfigureres globalt.

\`\`\`js
...

import { faCalendarAlt } from '@fortawesome/pro-light-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

...

  faCalendarAlt = faCalendarAlt;
  minDate: NgbDateStruct = {
    year: 2020,
    month: 2,
    day: 21
  };
  maxDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };
  // navigation = 'select'; // Måned-/år-select vises
  // navigation = 'arrow'; // Kun navn på gjeldende måned vises
  outsideDays = 'collapsed';

...
\`\`\`

### 2. Dependencies

#### Modules

\`\`\`js
// src/app/shared/shared.module.ts

...

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

...

@NgModule({
  imports: [
    FontAwesomeModule,
    NgbModule
  ],
  exports: [
    FontAwesomeModule,
    NgbModule
  ]
})

...

\`\`\`

#### Services

\`\`\`js
// src/app/core/core.module.ts

...

import { NgbDatepickerI18n, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerI18nService } from 'src/app/_felles/services/datepicker-i18n.service';
import { DatepickerParserFormatterService } from 'src/app/_felles/services/datepicker-parser-formatter.service';
import { DatepickerDateAdapterService } from 'src/app/_felles/services/datepicker-date-adapter.service';

...

  providers: [
    { provide: LOCALE_ID, useValue: 'nb' },
    { provide: NgbDatepickerI18n, useClass: DatepickerI18nService },
    { provide: NgbDateParserFormatter, useClass: DatepickerParserFormatterService },
    { provide: NgbDateAdapter, useClass: DatepickerDateAdapterService }
  ]

...
\`\`\`
`;
