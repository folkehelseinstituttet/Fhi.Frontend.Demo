import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { BootstrapComponentsBaseUrl, NgBootstrapComponentsBaseUrl } from '../../bootstrap-base-urls';

export const Switch: LibraryItem[] = [{
  id: 'switch',
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
    Toggle this switch element
  </label>
</div>
<div class="form-check form-switch mb-2">
  <input class="form-check-input visually-hidden" type="checkbox" id="flexSwitchCheckChecked2" checked>
  <label class="form-check-label" for="flexSwitchCheckChecked2">
    Toggle this switched on switch element
  </label>
</div>
<div class="form-check form-switch mb-2">
  <input class="form-check-input visually-hidden" type="checkbox" id="flexSwitchCheckChecked3" disabled>
  <label class="form-check-label" for="flexSwitchCheckChecked3">
    Disabled switch element
  </label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input visually-hidden" type="checkbox" id="flexSwitchCheckChecked4" checked disabled>
  <label class="form-check-label" for="flexSwitchCheckChecked4">
    Checked and disabled switch element
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
    Label for switch element
  </label>
</div>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
