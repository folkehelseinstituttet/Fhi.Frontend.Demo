import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const NavTabs: LibraryItem[] = [
  {
    id: ITEMS.NavTabs.id,
    title: ITEMS.NavTabs.title,
    type: ItemType.angular,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Navs,
    dependencyType: ItemDependencyType.ngBootstrap,
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
<div class="fhi-nav-tabs">
  <ul ngbNav #nav="ngbNav" class="nav-tabs">
    <li ngbNavItem *ngFor="let tab of tabsList">
      <a ngbNavLink>
        <i [attr.class]="tab.icon" *ngIf="tab.icon"></i>
        {{ tab.tabName }}
      </a>
      <ng-template ngbNavContent>
        <div [innerHTML]="tab.tabContent"></div>
      </ng-template>
    </li>
  </ul>

  <div [ngbNavOutlet]="nav"></div>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Bootstrap-dokumentasjon for
  <a href="${CONST.BootstrapComponentsBaseUrl}/navs-tabs/#tabs">Tabs</a>.
</p>
<p>
  Tabs er implementert som en
  <a href="${CONST.NgBootstrapComponentsBaseUrl}/nav">NgBootstrap Nav</a>
  i FHI Designsystem.
</p>
<p>
  Ved bruk av React Bootstrap Tabbed components bør det fungere ved å wrappe denne i en<br>
  <code>&lt;div class="fhi-nav-tabs"&gt;&lt;/div&gt;</code> for å få korrekt stilsetting.
</p>`;
}
