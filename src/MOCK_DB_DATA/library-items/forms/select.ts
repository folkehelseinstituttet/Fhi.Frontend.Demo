import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Select: LibraryItem[] = [{
  id: LibraryItemIds.FormSelect,
  title: 'Select',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return `
<label for="FormSelect" class="form-label">Select med flervalg</label>
<select class="form-select" id="FormSelect">
  <option>Aktivér for å gjøre et valg</option>
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
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
