import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FormSwitch: LibraryExample[] = [{
  title: 'Switchknapp',
  exampleHtml: `<div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" id="customSwitch1">
  <label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
</div>
<div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" disabled id="customSwitch2">
  <label class="custom-control-label" for="customSwitch2">Disabled switch element</label>
</div>
`,
  category: categoryNames.skjema
}];

