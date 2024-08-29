import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';

export const Modal: LibraryItem[] = [
  {
    id: ITEMS.Modal.id,
    title: ITEMS.Modal.title,
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
<!-- Eks. 1 -->
<fhi-modal>
  <ng-container fhi-modal.button>Åpne modal</ng-container>
  <ng-container fhi-modal.body><p>Modalvindu innhold.</p></ng-container>
</fhi-modal>

<!-- Eks. 2 -->
<fhi-modal
  [modalTitle]="'Overskrift'"
  [size]="'sm'"
  [actionButtons]="[{ name: 'Handling 1' }]"
  (modalAction)="onModalAction($event)"
>
  <ng-container fhi-modal.button>Åpne lite modalvindu</ng-container>
  <ng-container fhi-modal.body><p>Modalvindu innhold.</p></ng-container>
</fhi-modal>

<!-- Eks. 3 -->
<fhi-modal
  [modalTitle]="'Overskrift'"
  [actionButtons]="actionButtons"
  [size]="'fullscreen'"
  [openModalButtonClass]="'fhi-btn-icon'"
  (modalAction)="onModalAction($event)"
>
  <ng-container fhi-modal.button>
    <i class="icon-arrows-fullscreen"></i>
    <span class="btn__text">Åpne fullskjerm modalvindu</span>
  </ng-container>
  <ng-container fhi-modal.body>
    <pre><code>&#64;Input() actionButtons: FhiModalActionButton[] = {{ actionButtons | json }};</code></pre>
  </ng-container>
</fhi-modal>

<!-- Eks. 4 -->
<fhi-popover-menu
  [items]="[{ name: 'Åpne modal fra foreldrekomponent', action: 'openModal' }]"
  (actionEvent)="onPopoverActionOpenModalFromParent($event)"
></fhi-popover-menu>
<fhi-modal [parentAction]="modalParentAction" (dismissModal)="onDismissModal()">
  <ng-container fhi-modal.body><p>Modalvindu innhold.</p></ng-container>
</fhi-modal>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
