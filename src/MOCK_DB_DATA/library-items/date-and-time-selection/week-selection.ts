import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const WeekSelection: LibraryItem[] = [{
  id: LibraryItemIds.WeekSelection,
  title: 'Ukesvalg',
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
      [labelForId]="'year'"
      [items]="yearList"
      [label]="'År'"
      [notFoundText]="'Ikke mulig'"
      [(selectedItem)]="selectedYear">
    </fhi-autosuggest>
  </div>

  <div class="fhi-double-select__item">
    <fhi-autosuggest [description]="'Velg tilgjengelig uke'"
      [labelForId]="'week'"
      [items]="weekList"
      [label]="'Uke'"
      [notFoundText]="'Ikke mulig'"
      [(selectedItem)]="selectedWeek">
    </fhi-autosuggest>
  </div>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>Årsintervall er basert på modulen <a href="/developer/components/AdvancedSelect#${LibraryItemIds.AdvancedSelectAutosuggest}">Advanced select - autosuggest</a>.</p>`;
}
