import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const NavPopoverMenu: LibraryItem[] = [
  {
    id: ITEMS.NavPopoverMenu.id,
    title: ITEMS.NavPopoverMenu.title,
    type: ItemType.angular,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Navs,
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
      <a href="${CONST.FhiAngularComponentsGithubLibUrl}/fhi-popover-menu/README.md#API">
        API-dokumentasjon
      </a>
    </li>
    <li>
      <a href="${CONST.FhiAngularComponentsGithubLibUrl}/fhi-popover-menu">
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
