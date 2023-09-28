import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';

export const FormControlSwitch: LibraryItem[] = [{
  id: ITEMS.FormControlSwitch.id,
  title: ITEMS.FormControlSwitch.title,
  type: LibraryItemType.angular,
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
<div class="form-check form-switch">
  <input class="form-check-input visually-hidden" type="checkbox" id="formSwitch">
  <label class="form-check-label" for="formSwitch">
    Ledetekst for switch-element
  </label>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
