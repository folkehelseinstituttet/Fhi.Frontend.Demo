import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const FormSelect: LibraryExample[] = [{
  title: 'Nedtrekksliste (select)',
  exampleHtml: `
<!-- ytre div for gruppering, men ikke absolutt nødvendig -->
<div>
  <label for="FormSelect" class="form-label">Nedtrekksliste</label>
  <select class="form-select" id="FormSelect">
    <option>Åpne for å gjøre et valg</option>
    <option value="1">1</option>
    <option value="2">2</option>
  </select>
</div>
`,
  category: categoryNames.skjema
}];
