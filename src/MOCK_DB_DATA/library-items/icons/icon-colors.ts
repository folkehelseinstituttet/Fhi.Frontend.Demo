import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { includedIcons } from './icon-set.GENERATED';

export const IconColors: LibraryItem[] = [{
  id: LibraryItemIds.IconColors,
  title: 'Ikonfarger',
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
<div class="d-flex flex-wrap">
  <div class="me-3"><i class="icon-arrow-left icon-red"></i></div>
  <div class="me-3"><i class="icon-cloud-fog icon-green"></i></div>
  <div class="bg-dark px-1"><i class="icon-cloud-fog icon-white"></i></div>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string {
  return `
<i class="icon-arrow-left icon-red"></i>
<i class="icon-cloud-fog icon-green"></i>
<i class="icon-cloud-fog icon-white"></i>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
