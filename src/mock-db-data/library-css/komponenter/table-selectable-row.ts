import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const TableSelectableRow: LibraryExample[] = [{
  title: 'Tabell - selekterbar rad',
  exampleHtml: `
<table>
  <thead>
    <tr>
      <th>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="trChk1">
          <label class="custom-control-label" for="trChk1"></label>
        </div>
      </th>
      <th>Fornavn</th>
      <th>Etternavn</th>
      <th>Rolle</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="trChk2">
          <label class="custom-control-label" for="trChk2"></label>
        </div>
      </td>
      <td>Henrik</td>
      <td>Olsen</td>
      <td>Assistent</td>
    </tr>
    <tr class="tr-selected">
      <td>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="trChk3" checked>
          <label class="custom-control-label" for="trChk3"></label>
        </div>
      </td>
      <td>Sigurd</td>
      <td>Bråten</td>
      <td>Designer</td>
    </tr>
  </tbody>
</table>
`,
  category: categoryNames.tabell
}];
