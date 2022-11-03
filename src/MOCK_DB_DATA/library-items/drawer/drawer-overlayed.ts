import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const DrawerOverlayed: LibraryItem[] = [{
  id: LibraryItemIds.DrawerOverlayed,
  title: 'Drawer',
  type: LibraryItemType.ngBootstrap,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml(),
  hasPreviewButton: true
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
<div class="fhi-drawer">
  <div class="fhi-drawer__trigger-bar-vertical">
    <button type="button" class="btn fhi-btn-flat">Åpne</button>
  </div>
  
  <div class="fhi-drawer__content">
    <p>Skuffinnhold</p>
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
  <a href="${CONST.BootstrapComponentsBaseUrl}/offcanvas">Offcanvas</a>.
</p>
<p>
  Drawer er implementert som en
  <a href="${CONST.NgBootstrapComponentsBaseUrl}/offcanvas">NgBootstrap Offcanvas</a>
  i FHI Designsystem.
</p>
<p>
  Hvis du benytter et annet Javascript-rammeverk må du selv finne passende tredjepartskomponent.
</p>`;
}
