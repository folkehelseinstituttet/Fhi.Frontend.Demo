import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const FormSwitch: LibraryExample[] = [{
  title: 'Switches',
  exampleHtml: `
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
</div>
`,
  codeMarkdown: `
<div class="form-check form-switch">
  <input class="form-check-input visually-hidden" type="checkbox" id="flexSwitchCheckDefault">
  <label class="form-check-label" for="flexSwitchCheckDefault">
    Label for switch element
  </label>
</div>
`,
  category: categoryNames.forms
}];

