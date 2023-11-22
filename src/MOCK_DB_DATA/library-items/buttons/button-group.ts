import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const ButtonGroup: LibraryItem[] = [
  {
    id: ITEMS.ButtonGroup.id,
    title: ITEMS.ButtonGroup.title,
    type: LibraryItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="btn-group fhi-btn-group" role="group" aria-label="Velg tidsintervall">
  <input type="radio" class="btn-check fhi-btn-group__check" name="btnradio" id="btnradio1" checked>
  <label class="btn fhi-btn-group__btn" for="btnradio1">Dag</label>

  <input type="radio" class="btn-check fhi-btn-group__check" name="btnradio" id="btnradio2">
  <label class="btn fhi-btn-group__btn" for="btnradio2">Måned</label>

  <input type="radio" class="btn-check fhi-btn-group__check" name="btnradio" id="btnradio3">
  <label class="btn fhi-btn-group__btn" for="btnradio3">År</label>
</div>`;
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
  return `
<p>
  Button group er basert på Bootstraps
  <a href="${CONST.BootstrapComponentsBaseUrl}/button-group">Button group</a>.
</p>`;
}
