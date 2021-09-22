import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const TableSimple: LibraryExample[] = [{
  title: 'Tabell',
  exampleHtml: `
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Fornavn</th>
      <th>Etternavn</th>
      <th>Rolle</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>1202</td>
      <td>Birger Henrik</td>
      <td>Tybring-Gjedde Olssen</td>
      <td>Assistent</td>
    </tr>
    <tr>
      <td>2003</td>
      <td>Sigurd</td>
      <td>Bråten</td>
      <td>Designer</td>
    </tr>
    <tr>
      <td>1009</td>
      <td>Elida</td>
      <td>Egge</td>
      <td>Producer</td>
    </tr>
    <tr>
      <td>1337</td>
      <td>Marie</td>
      <td>Mul</td>
      <td>Regissør</td>
    </tr>
    <tr>
      <td>4211</td>
      <td>Elisabeth</td>
      <td>Kristiansen</td>
      <td>Script</td>
    </tr>
  </tbody>
</table>
`,
  category: categoryNames.tabell
}];
