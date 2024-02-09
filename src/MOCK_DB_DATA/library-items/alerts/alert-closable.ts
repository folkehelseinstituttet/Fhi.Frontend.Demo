import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const AlertClosable: LibraryItem[] = [
  {
    id: ITEMS.AlertClosable.id,
    title: ITEMS.AlertClosable.title,
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
  return `
<ngb-alert [ngClass]="{ 'fhi-alert-bordered': bordered }" [type]="type" (closed)="close(alert)">
  <i class="icon-[name]"></i>
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
  <a href="${CONST.NgBootstrapComponentsBaseUrl}/alert">NgBootstrap alert</a>
  i FHI Designsystem.
</p>
<p>
  Hvis du benytter et annet Javascript-rammeverk må du selv finne passende tredjepartskomponent.
</p>`;
}
