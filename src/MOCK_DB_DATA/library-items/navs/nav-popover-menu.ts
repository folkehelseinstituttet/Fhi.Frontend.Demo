import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const NavPopoverMenu: LibraryItem[] = [
  {
    id: ITEMS.NavPopoverMenu.id,
    title: ITEMS.NavPopoverMenu.title,
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
  return `<fhi-popover-menu [items]="popoverMenuItems" (actionEvent)="action($event)"></fhi-popover-menu>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
  <p>
    For å ta i bruk denne komponenten i en Angular-applikasjon må NPM-pakken
    <a href="${CONST.FhiAngularComponentsNpmUrl}">@folkehelseinstituttet/angular-components</a>
    være lagt til som en "dependency".
  </p>
  
  <h2 class="h5">Nyttige lenker</h2>
  
  <ul>
    <li>
      <a href="${CONST.FhiAngularComponentsGithubLibUrl}/fhi-popover/README.md#API">
        API-dokumentasjon
      </a>
    </li>
    <li>
      <a href="${CONST.FhiAngularComponentsGithubLibUrl}/fhi-popover">
        Kildekode
      </a>
    </li>
    <li>
      <a href="${CONST.ExampleComponentsGithubUrl}/navs">
        Demokode
      </a>
    </li>
  </ul>`;
}
