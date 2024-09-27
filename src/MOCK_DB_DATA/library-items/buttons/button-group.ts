import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const ButtonGroup: LibraryItem[] = [
  {
    id: ITEMS.ButtonGroup.id,
    title: ITEMS.ButtonGroup.title,
    type: LibraryItemType.ngBootstrap,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.Buttons,
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
<!-- Radio buttons eksempel -->
<div class="btn-group fhi-btn-group" role="group" aria-label="Velg tidsintervall">
  <input type="radio" class="btn-check fhi-btn-group__check" name="btnradio" id="btnradio1" checked />
  <label class="btn fhi-btn-group__btn" for="btnradio1">Dag</label>

  <input type="radio" class="btn-check fhi-btn-group__check" name="btnradio" id="btnradio2" />
  <label class="btn fhi-btn-group__btn" for="btnradio2">Måned</label>

  <input type="radio" class="btn-check fhi-btn-group__check" name="btnradio" id="btnradio3" />
  <label class="btn fhi-btn-group__btn" for="btnradio3">År</label>
</div>

<!-- Eksempel med knapper og split button -->
<div class="btn-group fhi-btn-group me-5" role="group">
  <button class="btn fhi-btn-group__btn active">Knapp 1</button>
  <button class="btn fhi-btn-group__btn">Knapp 2</button>

  <div class="btn-group" role="group">
    <button type="button" class="btn fhi-btn-group__btn fhi-btn-group__split-btn">Knapp 3 (split)</button>
    <div class="btn-group fhi-dropdown" ngbDropdown role="group" aria-label="Button group with nested dropdown">
      <button
        type="button"
        class="btn fhi-btn-group__btn fhi-dropdown__btn fhi-btn-group__split-btn-toggler"
        aria-label="Velg noe..."
        ngbDropdownToggle
      ></button>
      <div class="dropdown-menu" ngbDropdownMenu>
        <button ngbDropdownItem>A</button>
        <button ngbDropdownItem>B</button>
        <button ngbDropdownItem>C</button>
      </div>
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
  Button group er basert på 
  <a href="${CONST.BootstrapComponentsBaseUrl}/button-group">Bootstraps Button group</a>.
</p>
<p>
  Vi benytter
  <a href="${CONST.NgBootstrapComponentsBaseUrl}/dropdown">NgBootstrap Dropdown</a> for split-button.
</p>
<p>
  Fullstendig <a href="${CONST.ExampleComponentsGithubUrl}/buttons">kode for disse eksemplene</a> på Github.
</p>`;
}
