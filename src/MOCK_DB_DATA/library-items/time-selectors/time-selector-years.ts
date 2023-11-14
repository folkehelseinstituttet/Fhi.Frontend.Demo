import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';

export const TimeSelectorYears: LibraryItem[] = [
  {
    id: ITEMS.TimeSelectorYears.id,
    title: ITEMS.TimeSelectorYears.title,
    type: LibraryItemType.angular,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
  },
];

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
<fhi-years
  [minYear]="2000"
  [maxYear]="2030"
  [years]="[2011]"
  (yearSelect)="onYearSelect($event)"
></fhi-years>
`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
