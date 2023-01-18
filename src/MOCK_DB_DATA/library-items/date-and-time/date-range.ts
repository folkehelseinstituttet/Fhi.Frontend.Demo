import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const DateRange: LibraryItem[] = [{
  id: LibraryItemIds.DateRange,
  title: 'Datointervall',
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
<div class="fhi-double-datepicker">
  <div class="fhi-double-datepicker__item fhi-datepicker">
    <label class="form-label fhi-datepicker__label"
           for="datepickerFrom"
           id="datepickerFrom_label">
      Fra
    </label>

    <p class="fhi-datepicker__description"
       id="datepickerFrom_description">dd.mm.åååå</p>
    
    <button class="fhi-datepicker__toggler" (click)="datepicker_from.toggle()">
      <i class="icon-calendar"></i>
      <span class="visually-hidden">Åpne datovelger</span>
    </button>
  
    <input class="form-control fhi-datepicker__form-control"
           autocomplete="off"
           id="datepickerFrom"
           inputmode="decimal"
           outsideDays="hidden"
           type="text"
           aria-labelledby="datepickerFrom_label"
           aria-describedby="datepickerFrom_description"
           ngbDatepicker
           #datepicker_from="ngbDatepicker"/>
  </div>

  <div class="fhi-double-datepicker__item fhi-datepicker">
    <span class="fhi-double-datepicker__dash"></span>

    <label class="form-label fhi-datepicker__label" for="datepickerTo">
      Til
    </label>

    <p class="fhi-datepicker__description">dd.mm.åååå</p>
    
    <button class="fhi-datepicker__toggler" (click)="datepicker_to.toggle()">
      <i class="icon-calendar"></i>
      <span class="visually-hidden">Åpne datovelger</span>
    </button>
  
    <input class="form-control fhi-datepicker__form-control"
          autocomplete="off"
          id="datepickerTo"
          inputmode="decimal"
          outsideDays="hidden"
          type="text"
          ngbDatepicker
          #datepicker_to="ngbDatepicker"/>
  </div>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Datepicker er implementert som en
  <a href="/developer/components/DatePicker">FHI Datepicker</a>
  som baserer seg på
  <a href="${CONST.NgBootstrapComponentsBaseUrl}/datepicker">NgBootstrap Datepicker</a>
  i FHI Designsystem.
</p>

<p>
Hvis du benytter et annet Javascript-rammeverk må du selv finne passende tredjepartskomponent.
</p>

<div class="alert alert-warning">
  <i class="icon-bell-regular"></i>
  <div>
    <p>Dette eksempelet viser hvordan man kan sette opp et datointervall og brukes på eget ansvar.</p>
    <p class="mb-0">På sikt vil denne bli tilbudt som en angular-komponent med API.</p>
  </div>
</div>
`;
}
