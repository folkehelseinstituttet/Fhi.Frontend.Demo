import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const AlertDismissible: LibraryItem[] = [{
  id: LibraryItemIds.AlertDismissible,
  title: 'Alert - dismissable',
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
<ngb-alert [class]="bordered" [type]="type" (closed)="close(alert)">
  <i class="icon-..."></i>
  {{ message }}
</ngb-alert>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Alert med lukkeknapp er implementert som en
  <a href="${NgBootstrapComponentsBaseUrl}/alert">NgBootstrap alert</a>
  i FHI Designsystem.
</p>
<p>
  Hvis du benytter et annet Javascript-rammeverk må du selv finne passende tredjeparts-komponent.
</p>`;
}
