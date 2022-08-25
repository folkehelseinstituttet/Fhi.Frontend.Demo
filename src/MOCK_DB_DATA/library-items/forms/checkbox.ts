import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Checkbox: LibraryItem[] = [{
  id: 'checkbox',
  title: 'Checkbox',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return `
<div class="form-check mb-2">
  <input class="form-check-input" type="checkbox" value="" id="customCheck">
  <label class="form-check-label" for="customCheck">
    Check this checkbox
  </label>
</div>
<div class="form-check mb-2">
  <input class="form-check-input" type="checkbox" value="" id="customCheck1" checked>
  <label class="form-check-label" for="customCheck1">
    Check this checked checkbox
  </label>
</div>
<div class="form-check mb-2">
  <input class="form-check-input" type="checkbox" value="" id="customCheck2" disabled>
  <label class="form-check-label" for="customCheck2">
    Disabled checkbox
  </label>
</div>
<div class="form-check mb-2">
  <input class="form-check-input" type="checkbox" value="" id="customCheck3" checked disabled>
  <label class="form-check-label" for="customCheck3">
    Disabled checked checkbox
  </label>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="customCheck">
  <label class="form-check-label" for="customCheck">
    Label for checkbox
  </label>
</div>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
