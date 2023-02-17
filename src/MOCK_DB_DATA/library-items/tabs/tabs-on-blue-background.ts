import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TabsOnBlueBackground: LibraryItem[] = [{
  id: LibraryItemIds.TabsOnBlueBackground,
  title: 'Tabs on light blue background',
  type: LibraryItemType.fhiAngular,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml(),
  fullScreenEnabled: true
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
<div class="fhi-bg fhi-bg-light-blue">
  <div class="fhi-bg__text-container">
    <h1>Overskrift</h1>
    <p>Annet innhold. Dette kan være rik tekst som lister og tabeller.</p>
  </div>

  <div class="fhi-bg__nav-tabs-container">

    <div class="fhi-nav-tabs">
      <ul ngbNav #nav="ngbNav" class="nav-tabs">
        <li ngbNavItem *ngFor="let tab of tabsList">
          <a ngbNavLink>{{ tab.tabName }}</a>
          <ng-template ngbNavContent>
            <div [innerHTML]="tab.tabContent"></div>
          </ng-template>
        </li>
      </ul>
  
      <div [ngbNavOutlet]="nav" class="fhi-nav-tabs__content"></div>
    </div>
    
  </div>
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
  Ved bruk av React Bootstrap Tabbed Components skal stilsettingen fra FHI Designsystem fungere. Husk <code>class="bg-secondary"</code> på wrapper og <code>class="bg-white"</code> på nav outlet.
</p>`;
}
