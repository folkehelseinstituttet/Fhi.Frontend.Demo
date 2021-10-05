import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FormInput: LibraryExample[] = [{
  title: 'Tekstfelt',
  exampleHtml: `
<label for="FormInput" class="form-label">Tekstfelt</label>
<input type="text" id="FormInput" class="form-control" placeholder="Standard tekstfelt">
`,
exampleMarkdown: `
<!-- ytre div for gruppering, men ikke absolutt nødvendig -->
<div>
  <label for="FormInput" class="form-label">Tekstfelt</label>
  <input type="text" id="FormInput" class="form-control" placeholder="Standard tekstfelt">
</div>
`,
  category: categoryNames.skjema
}];
