import { LibraryItemIds } from 'src/app/views/shared/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Input: LibraryItem[] = [{
  id: LibraryItemIds.FormInput,
  title: 'Text input',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return `
<label for="FormInput" class="form-label">Text input</label>
<input type="text" id="FormInput" class="form-control" placeholder="Regular text input">`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<label for="FormInput" class="form-label">Text input</label>
<input type="text" id="FormInput" class="form-control" placeholder="Regular text input">`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
