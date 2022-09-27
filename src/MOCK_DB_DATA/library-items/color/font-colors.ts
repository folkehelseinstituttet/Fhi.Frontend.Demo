import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';

export const FontColors: LibraryItem[] = [{
  id: LibraryItemIds.ColorFonts,
  title: 'Tekstfarger',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return `
<!--
  NB! Denne koden er ikke regnet som "best practice", men er et forsøk
  på å vise noen ulike strategier på bruk av Bootstrap-rammeverket.
  Når FHI "best practice" er definert vil denne koden bli endret.
-->
<div class="row">
  <div class="col-sm p-3 pt-5">
    <p><strong>Normal brødtekst</strong></p>
    <p class="fhi-text-ancillary"><strong>Hjelpetekst</strong></p>
    <p><a href="#">Lenketekst</a></p>
    <p class="text-muted"><strong>Deaktivert element</strong></p>
    <p class="text-error"><strong>Feilmelding</strong></p>
  </div>
  <div class="col-sm p-3 pt-5 bg-dark">
    <p class="text-white"><strong>Normal brødtekst</strong></p>
    <p class="fhi-text-ancillary-inverse"><strong>Hjelpetekst</strong></p>
    <p><a href="#" class="text-white">Lenketekst</a></p>
    <p class="fhi-text-disabled-inverse"><strong>Deaktivert element</strong></p>
    <p class="fhi-text-error-inverse"><strong>Feilmelding</strong></p>
  </div>
  <div class="col-sm p-3 pt-5 bg-primary">
    <p class="text-white"><strong>Normal brødtekst</strong></p>
  </div>
</div>`
}

function getCodeHtml(): string | null {
  return '';
}

function getDocumentationHtml(): string | null {
  return null;
}
