import { LibraryItemIds } from 'src/app/library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Switch: LibraryItem[] = [{
  id: LibraryItemIds.FormSwitch,
  title: 'Switch',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


function getExampleHtml(): string {
  return `
<div class="form-check form-switch mb-2">
  <input class="form-check-input visually-hidden" type="checkbox" id="flexSwitchCheckDefault">
  <label class="form-check-label" for="flexSwitchCheckDefault">
    Skru på/av denne bryteren
  </label>
</div>
<div class="form-check form-switch mb-2">
  <input class="form-check-input visually-hidden" type="checkbox" id="flexSwitchCheckChecked2" checked>
  <label class="form-check-label" for="flexSwitchCheckChecked2">
    Skru av/på denne bryteren
  </label>
</div>

<p class="pt-5">Deaktiverte brytere</p>
<div class="form-check form-switch mb-2">
  <input class="form-check-input visually-hidden" type="checkbox" id="flexSwitchCheckChecked3" disabled>
  <label class="form-check-label" for="flexSwitchCheckChecked3">
    Deaktivert bryter
  </label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input visually-hidden" type="checkbox" id="flexSwitchCheckChecked4" checked disabled>
  <label class="form-check-label" for="flexSwitchCheckChecked4">
    Deaktivert bryter som er påskrudd
  </label>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<div class="form-check form-switch">
  <input class="form-check-input visually-hidden" type="checkbox" id="flexSwitchCheckDefault">
  <label class="form-check-label" for="flexSwitchCheckDefault">
    Ledetekst for switch-element
  </label>
</div>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
