import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

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
  return `
<p>
  FHI Years er bygget på
  <a href="https://www.npmjs.com/package/@ng-select/ng-select">Angular ng-select</a>,
  og for å ta den i bruk i en Angular-applikasjon må NPM-pakken
  <a href="${CONST.FhiAngularComponentsNpmUrl}">@folkehelseinstituttet/angular-components</a>
  være lagt til som en "dependency".
</p>

<h2 class="h5">Nyttige lenker</h2>

<ul>
  <li>
    <a href="${CONST.FhiAngularComponentsGithubLibUrl}/fhi-autosuggest/README.md#API">
      API-dokumentasjon
    </a>
  </li>
  <li>
    <a href="${CONST.FhiAngularComponentsGithubLibUrl}/fhi-autosuggest">
      Kildekode
    </a>
  </li>
  <li>
    <a href="${CONST.ExampleComponentsGithubUrl}/form-controls">
      Demokode
    </a>
  </li>
</ul>`;
}
