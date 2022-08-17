import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const Pagination: LibraryItem[] = [{
  title: 'Pagination',
  type: LibraryItemType.html,
  exampleHtml: `
<nav aria-label="Sidenavigasjon">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link" href="#">
        <span class="visually-hidden">Previous</span>
        &laquo;
      </a>
    </li>
    <li class="page-item active" aria-current="page">
      <a class="page-link" href="#">1</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">2</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">3</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">
        <span class="visually-hidden">Next</span>
        &raquo;
      </a>
    </li>
  </ul>
</nav>
`,
  category: categoryNames.pagination
}];
