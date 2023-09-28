import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';

export const FormControlSelect: LibraryItem[] = [{
  id: ITEMS.FormControlSelect.id,
  title: ITEMS.FormControlSelect.title,
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<label for="FormSelect" class="form-label">Ledetekst for select</label>
<select class="form-select" id="FormSelect">
  <option>Aktiver for å gjøre et valg</option>
  <option value="1">1</option>
  <option value="2">2</option>
</select>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return ``;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
