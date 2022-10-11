import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const PaginationCollectionCounter: LibraryItem[] = [{
  id: LibraryItemIds.PaginationCollectionCounter,
  title: 'Pagination - Collection Counter',
  type: LibraryItemType.ngBootstrap,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return ``;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `<ngb-pagination [collectionSize]="70" [(page)]="page" class="fhi-pagination d-flex justify-content-end">
  <ng-template ngbPaginationPrevious>
      <i class="icon-chevron-left"></i>
      <span class="visually-hidden">Forrige</span>
  </ng-template>
  <ng-template ngbPaginationNext>
      <span class="visually-hidden">Neste</span>
      <i class="icon-chevron-right"></i>
  </ng-template>
  <ng-template ngbPaginationPages let-page let-pages="pages">
      <li class="fhi-custom-page-item" *ngIf="pages.length > 0">
          <span class="page-link">
              {{ page }} av {{pages.length}}
          </span>
      </li>
  </ng-template>
</ngb-pagination>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
  <p>
    Pagination - Collection Counter er implementert som en
    <a href="${NgBootstrapComponentsBaseUrl}/pagination">NgBootstrap Pagination</a>
    i FHI Designsystem.
  </p>
  <p>
    Hvis du benytter et annet Javascript-rammeverk må du selv finne passende tredjepartskomponent.
  </p>`;
}
