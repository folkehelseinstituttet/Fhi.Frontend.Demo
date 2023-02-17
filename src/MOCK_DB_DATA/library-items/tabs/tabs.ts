import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const Tabs: LibraryItem[] = [{
  id: LibraryItemIds.Tabs,
  title: 'Tabs',
  type: LibraryItemType.ngBootstrap,
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
  Ved bruk av React Bootstrap Tabbed components husk å wrappe i en <code>class="fhi-nav-tabs"</code>.
</p>`;
}
