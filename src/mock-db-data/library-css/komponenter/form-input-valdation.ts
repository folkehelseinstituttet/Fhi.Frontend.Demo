import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FormInputValidation: LibraryExample[] = [{
  title: 'Tekstfelt med validering',
  exampleHtml: `
<div>
  <label for="FormInputValidation" class="form-label">Tekstfelt med validering</label>
  <input type="text" id="FormInputValidation" class="form-control is-invalid" placeholder="">
  <div class="invalid-feedback">En forståelig feilmelding slik at bruker enkelt kan korrigere.</div>
</div>
`,
exampleMarkdown: `
<!-- ytre div for gruppering, men ikke absolutt nødvendig -->
<div>
  <label for="FormInputValidation" class="form-label">Tekstfelt med validering</label>
  <input type="text" id="FormInputValidation" class="form-control is-invalid" placeholder="">
  <div class="invalid-feedback">En forståelig feilmelding slik at bruker enkelt kan korrigere.</div>
</div>
`,
  category: categoryNames.skjema
}];
