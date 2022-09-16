import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

const itemTitle = 'Modal';

export const Modal: LibraryItem[] = [{
  id: LibraryItemIds.Modal,
  title: itemTitle,
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
<ng-template #content let-modal>
  <div class="modal-header">
    <h2 class="modal-title" id="modal-basic-title">Profile update</h2>
    <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss()"></button>
  </div>
  <div class="modal-body">
    <p>Modal content.</p>
    <p>This may be any kind of content.</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn fhi-btn-outline-secondary" (click)="modal.close()">Cancel</button>
    <button type="button" class="btn fhi-btn-primary" (click)="modal.close('Save click')">Save</button>
  </div>
</ng-template>
<p>
  <button class="btn fhi-btn-primary" (click)="open(content)">Launch modal (default size)</button>
</p>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Bootstrap documentation for
  <a href="${BootstrapComponentsBaseUrl}/${itemTitle.toLocaleLowerCase()}">${itemTitle}</a>
</p>
<p>
  The ${itemTitle} is implemented as a
  <a href="${NgBootstrapComponentsBaseUrl}/${itemTitle.toLocaleLowerCase()}">ngBootstrap ${itemTitle}</a>
  in the FHI Designsystem.
</p>
<p>
  If you use another Javascript framework, you will have to find a suitable 3. party library.
</p>`;
}
