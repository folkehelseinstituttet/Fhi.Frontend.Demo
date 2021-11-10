import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const TableSimple: LibraryExample[] = [{
  title: 'Tabell',
  exampleHtml: `
<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Fornavn</th>
        <th scope="col">Etternavn</th>
        <th scope="col">Rolle</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <th>1202</th>
        <td>Birger Henrik</td>
        <td>Tybring-Gjedde Olssen</td>
        <td>Assistent</td>
      </tr>
      <tr>
        <th>2003</th>
        <td>Sigurd</td>
        <td>Bråten</td>
        <td>Designer</td>
      </tr>
      <tr>
        <th>1009</th>
        <td>Elida</td>
        <td>Egge</td>
        <td>Producer</td>
      </tr>
      <tr>
        <th>1337</th>
        <td>Marie</td>
        <td>Mul</td>
        <td>Regissør</td>
      </tr>
      <tr>
        <th>4211</th>
        <td>Elisabeth</td>
        <td>Kristiansen</td>
        <td>Script</td>
      </tr>
    </tbody>
  </table>
</div>
`,
  category: categoryNames.tabell
}];
