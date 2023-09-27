import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const NavTabs: LibraryItem[] = [{
  id: ITEMS.NavTabs.id,
  title: ITEMS.NavTabs.title,
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
<div class="fhi-nav-tabs">
  <ul ngbNav #nav="ngbNav" class="nav-tabs">
    <li ngbNavItem *ngFor="let tab of tabsList">
      <a ngbNavLink>{{ tab.tabName }}</a>
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
  Ved bruk av React Bootstrap Tabbed components er det bare å wrappe i en<br>
  <code>&lt;div class="fhi-nav-tabs"&gt;&lt;/div&gt;</code>.
</p>`;
}
