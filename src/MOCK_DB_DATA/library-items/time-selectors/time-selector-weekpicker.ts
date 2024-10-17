import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const TimeSelectorWeekpicker: LibraryItem[] = [
  {
    id: ITEMS.TimeSelectorWeekpicker.id,
    title: ITEMS.TimeSelectorWeekpicker.title,
    type: ItemType.angular,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.TimeSelectors,
    dependencyType: ItemDependencyType.fhiAngular,
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
<fhi-weekpicker (weekSelect)="onWeekSelect($event)"></fhi-weekpicker>
`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
  <p><span lang="en">Weekpicker</span> er bygget på <a href="${CONST.NgBootstrapComponentsBaseUrl}/datepicker">NgBootstrap Datepicker</a>, og for å ta den i bruk i en Angular-applikasjon må NPM-pakken
  <a href="${CONST.FhiAngularComponentsNpmUrl}">@folkehelseinstituttet/angular-components</a>
  være lagt til som en dependency.</p>

  <h2 class="h5">Nyttige lenker</h2>
  <ul>
    <li>
      <a href="${CONST.FhiAngularComponentsGithubLibUrl}/fhi-weekpicker">
        Kildekode og API
      </a>
    </li>
    <li>
      <a href="${CONST.ExampleComponentsGithubUrl}/time-selectors">
        Kode for demo-eksempel
      </a>
    </li>
    <li>
      <a href="${CONST.FhiAngularComponentsNpmUrl}">
        NPM-pakke @folkehelseinstituttet/angular-components
      </a>
    </li>
  </ul>
  `;
}
