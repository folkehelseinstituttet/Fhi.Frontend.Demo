import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const BtnPrimary: LibraryItem[] = [{
  id: LibraryItemIds.ButtonPrimary,
  title: 'Primary button',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return `
<div class="d-flex flex-column flex-lg-row mb-4 mb-lg-0">
  <button type="button" class="btn btn-sm fhi-btn-primary mb-3 me-3">Small, 120px</button>
  <button type="button" class="btn btn-md fhi-btn-primary mb-3 me-3">Standard, 170px</button>
  <button type="button" class="btn btn-lg fhi-btn-primary mb-3">Large, 280px</button>
</div>
<div class="d-flex flex-column flex-lg-row">
  <button type="button" class="btn btn-sm fhi-btn-outline-primary mb-3 mb-lg-0 me-3">Small, 120px</button>
  <button type="button" class="btn btn-md fhi-btn-outline-primary mb-3 mb-lg-0 me-3">Standard, 170px</button>
  <button type="button" class="btn btn-lg fhi-btn-outline-primary">Large, 280px</button>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<button type="button" class="btn btn-sm fhi-btn-primary">Small, 120px</button>
<button type="button" class="btn btn-md fhi-btn-primary">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-primary">Large, 280px</button>

<button type="button" class="btn btn-sm fhi-btn-outline-primary">Small, 120px</button>
<button type="button" class="btn btn-md fhi-btn-outline-primary">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-outline-primary">Large, 280px</button>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
