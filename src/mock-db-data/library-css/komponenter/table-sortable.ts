import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const TableSortable: LibraryExample[] = [{
  title: 'Tabell - sorterbar',
  exampleHtml: `
<div class="table-responsive">
  <table class="table table-striped table-bordered">
    <thead>
      <tr>
        <th scope="col" role="columnheader" aria-sort="ascending"><button>ID</button></th>
        <th scope="col" role="columnheader" aria-sort="none"><button>Fornavn</button></th>
        <th scope="col" role="columnheader" aria-sort="none"><button>Etternavn</button></th>
        <th scope="col" role="columnheader" aria-sort="none"><button>Rolle</button></th>
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
</div>
`,
  category: categoryNames.tabell
}];
