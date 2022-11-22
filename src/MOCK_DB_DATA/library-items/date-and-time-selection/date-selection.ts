import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const DateSelection: LibraryItem[] = [{
  id: LibraryItemIds.DateSelection,
  title: 'Årsintervall',
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
<div class="fhi-double-select">
  <div class="fhi-double-select__item">
    <fhi-autosuggest [description]="'Årstall 4 siffer'"
      [labelForId]="'year-from'"
      [items]="yearList"
      [label]="'Fra år'"
      [(selectedItem)]="selectedFromYear">
    </fhi-autosuggest>
  </div>

  <div class="fhi-double-select__item fhi-double-select__item-w-interval-indicator">
    <fhi-autosuggest [description]="'Årstall 4 siffer'"
      [labelForId]="'year-to'"
      [items]="yearList"
      [label]="'Til år'"
      [(selectedItem)]="selectedToYear">
    </fhi-autosuggest>
  </div>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>Årsintervall er bygget opp med to instanser av modulen <a href="/developer/components/AdvancedSelect#${LibraryItemIds.AdvancedSelectAutosuggest}">Advanced select - autosuggest</a>.</p>`;
}
