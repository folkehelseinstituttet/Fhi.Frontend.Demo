import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';

export const TimeSelectorYear: LibraryItem[] = [{
  id: ITEMS.TimeSelectorYear.id,
  title: ITEMS.TimeSelectorYear.title,
  type: LibraryItemType.angular,
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
<fhi-year-selector [label]="'Velg år'"
                   [initialYearList]="yearList"
                   [initialSelectedYear]="'2011'"
                   (selectedYearChange)="selectYear($event)"></fhi-year-selector>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
