import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const BtnFlat: LibraryItem[] = [{
  id: 'transparentbutton',
  title: 'Transparent button',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return `
<div class="d-flex flex-column flex-lg-row mb-4 mb-lg-0">
  <button type="button" class="btn btn-sm fhi-btn-flat mb-3 me-3">Small, 120px</button>
  <button type="button" class="btn btn-md fhi-btn-flat mb-3 me-3">Standard, 170px</button>
  <button type="button" class="btn btn-lg fhi-btn-flat mb-3">Large, 280px</button>
</div>
<div>
  <button type="button" class="btn fhi-btn-flat">Dynamic width</button>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<button type="button" class="btn btn-sm fhi-btn-flat">Small, 120px</button>
<button type="button" class="btn btn-md fhi-btn-flat">Standard, 170px</button>
<button type="button" class="btn btn-lg fhi-btn-flat">Large, 280px</button>

<button type="button" class="btn fhi-btn-flat">Dynamic width</button>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}

