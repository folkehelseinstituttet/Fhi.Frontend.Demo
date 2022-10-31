import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const Drawer: LibraryItem[] = [{
  id: LibraryItemIds.Drawer,
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
<div class="position-relative">
  <ng-template #content let-offcanvas>
    <div class="offcanvas-header">
      <h4 class="offcanvas-title">Offcanvas title</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="offcanvas.dismiss('Cross click')"></button>
    </div>
    <div class="offcanvas-body">
      <p>Innhold</p>
    </div>
  </ng-template>
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
