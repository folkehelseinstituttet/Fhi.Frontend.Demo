import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const DatePicker: LibraryItem[] = [{
  id: LibraryItemIds.DatePicker,
  title: 'Date picker',
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
  <label class="form-label fhi-datepicker__label" for="datepicker_id">
    Datovelger
  </label>
  
  <button class="fhi-datepicker__toggler" (click)="datepicker_1.toggle()">
    <i class="icon-calendar"></i>
    <span class="visually-hidden">Åpne datovelger</span>
  </button>

  <input class="form-control fhi-datepicker__form-control"
         id="datepicker_id"
         outsideDays="hidden"
         pattern=""
         placeholder="dd.mm.åååå"
         type="text"
         ngbDatepicker
         #datepicker_1="ngbDatepicker"/>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>Hoi!</p>`;
}
