import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const DatePicker: LibraryItem[] = [{
  id: LibraryItemIds.DatePicker,
  title: 'Datepicker',
  type: LibraryItemType.fhiAngular,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return ``;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<div class="fhi-datepicker">
  <label class="form-label fhi-datepicker__label"
         for="datepicker_id"
         id="datepicker_label">
    Velg en dato
  </label>

  <p class="fhi-datepicker__description"
     id="datepicker_description">dd.mm.åååå</p>
  
  <button class="fhi-datepicker__toggler" (click)="datepicker.toggle()">
    <i class="icon-calendar"></i>
    <span class="visually-hidden">Åpne datovelger</span>
  </button>

  <input class="form-control fhi-datepicker__form-control"
         autocomplete="off"
         id="datepicker_id"
         inputmode="decimal"
         outsideDays="hidden"
         type="text"
         aria-labelledby="datepicker_label"
         aria-describedby="datepicker_description"
         ngbDatepicker
         #datepicker="ngbDatepicker"/>
</div>
`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Datepicker er implementert som en utvidet
  <a href="${CONST.NgBootstrapComponentsBaseUrl}/datepicker">NgBootstrap Datepicker</a>
  i FHI Designsystem.
</p>
<p>
  Hvis du benytter et annet Javascript-rammeverk må du selv finne passende tredjepartskomponent.
</p>

<div class="alert alert-warning">
  <i class="icon-bell-regular"></i>
  <div>
    <p>Dette eksempelet viser hvordan man kan sette opp en datepicker og brukes på eget ansvar.</p>
    <p class="mb-0">På sikt vil denne bli tilbudt som en angular-komponent med API.</p>
  </div>
</div>
`;
}
