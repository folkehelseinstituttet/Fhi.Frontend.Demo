import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Toast: LibraryItem[] = [{
  id: LibraryItemIds.Toast,
  title: 'Toast',
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
<div class="toast-container">
  <ngb-toast *ngIf="show" header="Toast title" [autohide]="true" (hidden)="show=false">
    Standard toast.
  </ngb-toast>
</div>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Bootstrap-dokumentasjon for
  <a href="${BootstrapComponentsBaseUrl}/toasts">Toast</a>
</p>
<p>
  Toast er impolementert som en
  <a href="${NgBootstrapComponentsBaseUrl}/toast">NgBootstrap Toast</a>
  i FHI Designsystem.
</p>
<p>
  Hvis du benytter et annet Javascript-rammeverk må du selv finne passende tredjeparts-komponent.
</p>`;
}
