import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';

export const TimeSelectorWeek: LibraryItem[] = [{
  id: ITEMS.TimeSelectorWeek.id,
  title: ITEMS.TimeSelectorWeek.title,
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
<fhi-weekpicker 
  [id]="'id'"
  [week]="week"
  [minWeek]="'1910-1'"
  [maxWeek]="'2020-50'"
  (weekSelect)="onWeekSelect($event)">
</fhi-weekpicker>
`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return ``;
}
