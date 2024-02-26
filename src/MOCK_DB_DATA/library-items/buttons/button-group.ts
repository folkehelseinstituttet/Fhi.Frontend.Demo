import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const ButtonGroup: LibraryItem[] = [
  {
    id: ITEMS.ButtonGroup.id,
    title: ITEMS.ButtonGroup.title,
    type: LibraryItemType.angular,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
  },
];

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
<div class="btn-group fhi-btn-group" role="group">
  <button class="btn fhi-btn-group__btn">Knapp 1</button>
  <button class="btn fhi-btn-group__btn active">Knapp 2</button>

  <button type="button" class="btn fhi-btn-group__btn">Split-knapp</button>
  <div class="btn-group" ngbDropdown role="group" aria-label="Button group with nested dropdown">
    <button type="button" class="btn fhi-btn-group__btn" ngbDropdownToggle></button>
    <div class="dropdown-menu" ngbDropdownMenu>
      <button ngbDropdownItem>En</button>
      <button ngbDropdownItem>To</button>
      <button ngbDropdownItem>Tre</button>
    </div>
  </div>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Button group er basert på Bootstraps
  <a href="${CONST.BootstrapComponentsBaseUrl}/button-group">Button group</a>.
</p>`;
}
