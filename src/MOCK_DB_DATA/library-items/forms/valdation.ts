import { LibraryItemIds } from 'src/app/views/shared/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Validation: LibraryItem[] = [{
  id: LibraryItemIds.FormValidation,
  title: 'Validation',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return `
<div>
  <label for="FormInputValidation" class="form-label">Text input w/validation</label>
  <input type="text" id="FormInputValidation" class="form-control is-invalid" placeholder="">
  <div class="invalid-feedback">Understandable error message.</div>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<label for="FormInputValidation" class="form-label">Text input w/validation</label>
<input type="text" id="FormInputValidation" class="form-control is-invalid" placeholder="">
<div class="invalid-feedback">Understandable error message.</div>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
