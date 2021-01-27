import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FormInputValidation: LibraryExample[] = [{
  title: 'Tekstfelt med validering',
  exampleHtml: `
<div class="form-group">
  <label for="FormInputValidation">Tekstfelt med validering</label>
  <input type="text" id="FormInputValidation" class="form-control is-invalid" placeholder="">
  <div class="invalid-feedback">Dette ble ikke helt riktig.</div>
</div>
`,
  category: categoryNames.skjema
}];
