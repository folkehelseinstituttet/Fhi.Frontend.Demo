import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TimeSelectorDateAndTime: LibraryItem[] = [{
  id: ITEMS.TimeSelectorDateAndTime.id,
  title: ITEMS.TimeSelectorDateAndTime.title,
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
<fhi-date-and-time (dateAndTimeSelect)="getDateAndTime($event)"></fhi-date-and-time>
`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  <a href="${CONST.FhiAngularComponentsNpmUrl}/fhi-date-and-time">FHI Date And Time</a> er en komponent i <a href="${CONST.FhiAngularComponentsNpmUrl}">FHI Angular Components</a>.
</p>
<p>
  Den er basert på <a href="/developer/components/time-selectors#time-selector-datepicker">FHI Datepicker</a>, og dersom du benytter annet javascript-rammeverk enn Angular må du finne passende tredjepartskomponent.
</p>`;
}
