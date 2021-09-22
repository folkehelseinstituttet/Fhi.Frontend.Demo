import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const TableSortable: LibraryExample[] = [{
  title: 'Tabell - sorterbar',
  exampleHtml: `
<table>
  <thead>
    <tr>
      <th><button>ID</button></th>
      <th><button>Fornavn</button></th>
      <th><button>Etternavn</button></th>
      <th><button>Rolle</button></th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>1202</td>
      <td>Henrik</td>
      <td>Olsen</td>
      <td>Assistent</td>
    </tr>
    <tr>
      <td>2003</td>
      <td>Sigurd</td>
      <td>Bråten</td>
      <td>Designer</td>
    </tr>
  </tbody>
</table>
`,
  category: categoryNames.tabell
}];
