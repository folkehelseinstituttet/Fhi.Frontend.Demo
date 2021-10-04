import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FormSwitch: LibraryExample[] = [{
  title: 'Switchknapp',
  exampleHtml: `
<div class="form-check form-switch">
  <input class="form-check-input visually-hidden" type="checkbox" id="flexSwitchCheckDefault">
  <label class="form-check-label" for="flexSwitchCheckDefault">Toggle this switch element</label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input visually-hidden" type="checkbox" id="flexSwitchCheckChecked2" disabled>
  <label class="form-check-label" for="flexSwitchCheckChecked2">Disabled switch element</label>
</div>
`,
  category: categoryNames.skjema
}];

