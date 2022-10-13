import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Checkbox: LibraryItem[] = [{
  id: LibraryItemIds.FormCheckbox,
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
    Huk av sjekkboksen
  </label>
</div>
<div class="form-check mb-2">
  <input class="form-check-input" type="checkbox" value="" id="customCheck1" checked>
  <label class="form-check-label" for="customCheck1">
    Fjern avhuking i denne sjekkboksen
  </label>
</div>

<p class="pt-5">Deaktiverte checkboxer</p>
<div class="form-check mb-2">
  <input class="form-check-input" type="checkbox" value="" id="customCheck2" disabled>
  <label class="form-check-label" for="customCheck2">
    Deaktivert sjekkboks
  </label>
</div>
<div class="form-check mb-2">
  <input class="form-check-input" type="checkbox" value="" id="customCheck3" checked disabled>
  <label class="form-check-label" for="customCheck3">
    Deaktivert avkrysset sjekkboks
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
    Ledetekst for sjekkboks
  </label>
</div>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
