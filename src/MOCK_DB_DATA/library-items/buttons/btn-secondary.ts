import { LibraryItemIds } from 'src/app/views/shared/library/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const BtnSecondary: LibraryItem[] = [{
  id: LibraryItemIds.ButtonSecondary,
  title: 'Secondary button',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return `
<p>"Old" FHI button:</p>
<div class="d-flex flex-column flex-lg-row mb-4 mb-lg-0">
    <button type="button" class="btn btn-md fhi-btn-secondary mb-3 me-3">Standard</button>
</div>
<div class="d-flex flex-column flex-lg-row mb-6">
    <button type="button" class="btn btn-md fhi-btn-outline-secondary mb-3 mb-lg-0 me-3">Standard</button>
</div>

<p>Bootstrap buttons:</p>
<div class="mb-3">
    <button type="button" class="btn btn-secondary">Secondary button</button>
</div>
<div>
    <button type="button" class="btn btn-outline-secondary">Secondary button outlined</button>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<button type="button" class="btn btn-sm fhi-btn-secondary">Small, 120px</button>
<button type="button" class="btn btn-md fhi-btn-secondary">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-secondary">Large, 280px</button>

<button type="button" class="btn btn-sm fhi-btn-outline-secondary">Small, 120px</button>
<button type="button" class="btn btn-md fhi-btn-outline-secondary">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-outline-secondary">Large, 280px</button>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return ``;
}
