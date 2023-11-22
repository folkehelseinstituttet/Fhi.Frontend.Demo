import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const Pagination: LibraryItem[] = [
  {
    id: LibraryItemIds.Pagination,
    title: 'Pagination',
    type: LibraryItemType.ngBootstrap,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<ngb-pagination [collectionSize]="120" [maxSize]="1" class="d-flex justify-content-end">
  <ng-template ngbPaginationPrevious>
    <i class="icon-arrow-left"></i>
    <span class="page-item__text ms-1">Forrige</span>
  </ng-template>
  <ng-template ngbPaginationNext>
    <span class="page-item__text me-1">Neste</span>
    <i class="icon-arrow-right"></i>
  </ng-template>
</ngb-pagination>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return ``;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Bootstrap-dokumentasjon for
  <a href="${CONST.BootstrapComponentsBaseUrl}/pagination">Pagination</a>.
</p>
<p>
  Pagination er implementert som en
  <a href="${CONST.NgBootstrapComponentsBaseUrl}/pagination">NgBootstrap Pagination</a>
  i FHI Designsystem.
</p>
<p>
  Hvis du benytter et annet Javascript-rammeverk må du selv finne passende tredjepartskomponent.
</p>`;
}
