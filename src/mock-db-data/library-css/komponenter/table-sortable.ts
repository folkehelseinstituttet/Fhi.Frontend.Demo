import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const TableSortable: LibraryExample[] = [{
  title: 'Tabell - sorterbar',
  exampleHtml: `
<div class="table-responsive mb-5">
  <table class="table table-striped table-bordered">
    <thead>
      <tr>
        <th scope="col" tabindex="0" aria-sort="descending" aria-label="Sorter tabellen stigende basert på ID"><span class="text-decoration-underline">ID</span> <i class="icon-chevron-down"></i></th>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sorter tabellen stigende basert på Fornavn"><span class="text-decoration-underline">Fornavn</span> <i class="icon-chevron-expand"></i></th>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sorter tabellen stigende basert på Etternavn"><span class="text-decoration-underline">Etternavn</span> <i class="icon-chevron-expand"></i></th>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sorter tabellen stigende basert på Rolle"><span class="text-decoration-underline">Rolle</span> <i class="icon-chevron-expand"></i></th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <th>2003</th>
        <td>Sigurd</td>
        <td>Bråten</td>
        <td>Designer</td>
      </tr>
      <tr>
        <th>1202</th>
        <td>Henrik</td>
        <td>Olsen</td>
        <td>Assistent</td>
      </tr>
      <tr>
        <th>1009</th>
        <td>Elida</td>
        <td>Egge</td>
        <td>Producer</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="table-responsive pt-5">
  <table class="table table-striped table-bordered">
    <thead>
      <tr>
      <th scope="col" tabindex="0" aria-sort="none" aria-label="Sorter tabellen stigende basert på ID"><span class="text-decoration-underline">ID</span> <i class="icon-chevron-expand"></i></th>
      <th scope="col" tabindex="0" aria-sort="none" aria-label="Sorter tabellen stigende basert på Fornavn"><span class="text-decoration-underline">Fornavn</span> <i class="icon-chevron-expand"></i></th>
      <th scope="col" tabindex="0" aria-sort="ascending" aria-label="Sorter tabellen synkende basert på Etternavn"><span class="text-decoration-underline">Etternavn</span> <i class="icon-chevron-up"></i></th>
      <th scope="col" tabindex="0" aria-sort="none" aria-label="Sorter tabellen stigende basert på Rolle"><span class="text-decoration-underline">Rolle</span> <i class="icon-chevron-expand"></i></th>
      </tr>
    </thead>

    <tbody>
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
        <th>1202</th>
        <td>Henrik</td>
        <td>Olsen</td>
        <td>Assistent</td>
      </tr>
    </tbody>
  </table>
</div>
`,
  exampleMarkdown: `
<div class="table-responsive">
  <table class="table table-striped table-bordered">
    <thead>
      <tr>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sorter tabellen stigende basert på ID">
          <span class="text-decoration-underline">ID</span>
          <i class="icon-chevron-expand"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sorter tabellen stigende basert på Fornavn">
          <span class="text-decoration-underline">Fornavn</span>
          <i class="icon-chevron-expand"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="ascending" aria-label="Sorter tabellen synkende basert på Etternavn">
          <span class="text-decoration-underline">Etternavn</span>
          <i class="icon-chevron-up"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sorter tabellen stigende basert på Rolle">
          <span class="text-decoration-underline">Rolle</span>
          <i class="icon-chevron-expand"></i>
        </th>
      </tr>
    </thead>

    <tbody>
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
        <th>1202</th>
        <td>Henrik</td>
        <td>Olsen</td>
        <td>Assistent</td>
      </tr>
    </tbody>
  </table>
</div>
`,
  category: categoryNames.tabell
}];
