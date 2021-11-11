export const FhiBtnShortcutDocumentation = `
# Snarveiknapp

Alle app'er som lages med utgangspunt i
["Fhi.AngularSeed"](https://fhi.visualstudio.com/Fhi.Designsystem/_git/Fhi.FrontendBibliotek?path=%2FREADME.md&_a=preview)
vil få med alt av dependencies som trengs, inkl. authToken for bruk av Font Awesome Pro.

## Custom implementering

Ønskes en custom implementering av Snarveiknapp så ser markup slik ut:

\`\`\`html
<a class="btn btn-sm fhi-btn-shortcut" [routerLink]="link">
  <fa-icon [icon]="faLongArrowRight" class="fhi-btn-shortcut__icon"></fa-icon>
  <span class="fhi-btn-shortcut__text">{{ text }}</span>
</a>
\`\`\`

For at knappens Font Awesome-ikon skal vises må ikonet gjøres tilgjengelig for template'en:

\`\`\`js
...

import { faLongArrowRight } from '@fortawesome/pro-regular-svg-icons';

...

  faLongArrowRight = faLongArrowRight;

...
\`\`\`

`;
