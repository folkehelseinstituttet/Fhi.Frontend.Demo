import { LibraryExample } from 'src/app/shared/models/library-example.model';

export const FhiFontColors: LibraryExample[] = [{
  title: 'Tekstfarger',
  exampleHtml: `
<!--
  NB! Denne koden er ikke "best practice", men et forsøk på å vise en del
  ulike strategier for å forholde seg til Bootstrap-rammeverket på.
  Når vi har landet det som skal være FHI-"best practice", så må denne
  koden endres tilsvarende.
-->
<div class="row">
  <div class="col-sm p-3 pt-5">
    <p><strong>Normaltekst</strong></p>
    <p class="fhi-text-ancillary"><strong>Underordnet tekst</strong></p>
    <p><a href="#">Lenketekst</a></p>
    <p class="text-muted"><strong>Disabled</strong></p>
    <p class="text-error"><strong>Error</strong></p>
  </div>
  <div class="col-sm p-3 pt-5 bg-dark">
    <p class="text-white"><strong>Normaltekst</strong></p>
    <p class="fhi-text-ancillary-inverse"><strong>Underordnet tekst</strong></p>
    <p><a href="#" class="text-white">Lenketekst</a></p>
    <p class="fhi-text-disabled-inverse"><strong>Disabled</strong></p>
    <p class="fhi-text-error-inverse"><strong>Error</strong></p>
  </div>
  <div class="col-sm p-3 pt-5 bg-primary">
    <p class="text-white"><strong>Normaltekst</strong></p>
  </div>
</div>`
}];
