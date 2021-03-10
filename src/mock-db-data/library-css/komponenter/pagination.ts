import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const Pagination: LibraryExample[] = [{
  title: 'Paginasjon',
  exampleHtml: `
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item disabled">
      <span class="page-link">
        <span aria-hidden="true">&laquo;</span>
      </span>
    </li>
    <li class="page-item active" aria-current="page">
      <span class="page-link">1</span>
    </li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Neste">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
`,
  category: categoryNames.paginasjon
}];
