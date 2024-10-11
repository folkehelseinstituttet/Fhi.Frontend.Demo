import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const FormControlRadio: LibraryItem[] = [
  {
    id: ITEMS.FormControlRadio.id,
    title: ITEMS.FormControlRadio.title,
    type: ItemType.html,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.FormControls,
    dependencyType: ItemDependencyType.css,
  },
];

/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="form-check mb-2">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="customRadio1">
  <label class="form-check-label" for="customRadio1">
    Ledetekst for radioknapp, valg 1
  </label>
</div>
<div class="form-check mb-2">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="customRadio2" checked>
  <label class="form-check-label" for="customRadio2">
    Ledetekst for forhåndsvalgt radioknapp, valg 2
  </label>
</div>
<p class="pt-5">Deaktiverte radioknapper</p>
<div class="form-check mb-2">
  <input class="form-check-input" type="radio" name="flexRadioDefault2" id="customRadio3" disabled>
  <label class="form-check-label" for="customRadio3">
    Deaktivert radioknapp
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault2" id="customRadio4" checked disabled>
  <label class="form-check-label" for="customRadio4">
    Deaktivert forhåndsvalgt radioknapp
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
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="radioInput">
  <label class="form-check-label" for="radioInput">
    Ledetekst for radioknapp
  </label>
</div>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
