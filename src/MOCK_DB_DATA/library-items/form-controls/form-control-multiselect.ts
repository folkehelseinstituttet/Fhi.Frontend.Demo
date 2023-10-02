import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const FormControlMultiselect: LibraryItem[] = [{
  id: ITEMS.FormControlMultiselect.id,
  title: ITEMS.FormControlMultiselect.title,
  type: LibraryItemType.angular,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<fhi-multiselect
  description="Velg/søk etter navn"
  [items]="people"
  label="Navn"
  labelForId="navn-1"
  notFoundText="Ingen treff"
  placeholder="Søk"
  [(selectedItems)]="selectedPeople">
</fhi-multiselect>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return ``;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  FHI Multiselect er bygget på
  <a href="https://www.npmjs.com/package/@ng-select/ng-select">Angular ng-select</a>,
  og for å ta den i bruk i en Angular-applikasjon må NPM-pakken
  <a href="${CONST.FhiAngularComponentsNpmUrl}">@folkehelseinstituttet/angular-components</a>
  være lagt til som en "dependency".
</p>

<h2 class="h5">Nyttige lenker</h2>

<ul>
  <li>
    <a href="${CONST.FhiAngularComponentsGithubLibUrl}/fhi-multiselect/README.md#API">
      API-dokumentasjon
    </a>
  </li>
  <li>
    <a href="${CONST.FhiAngularComponentsGithubLibUrl}/fhi-multiselect">
      Kildekode
    </a>
  </li>
  <li>
    <a href="${CONST.ExampleComponentsGithubUrl}/form-controls/multiselect">
      Demokode
    </a>
  </li>
  <li>
    <a href="${CONST.FhiAngularComponentsNpmUrl}">
      NPM-pakke @folkehelseinstituttet/angular-components
    </a>
  </li>
</ul>`;
}
