import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';

export const TableSortable: LibraryItem[] = [{
  id: 'tablesortable',
  title: 'Table - sortable',
  type: LibraryItemType.html,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `
<div class="table-responsive mb-5">
  <table class="table table-striped table-bordered" data-sort-column="1">
    <thead>
      <tr>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sort table based on ID">
          <span class="text-decoration-underline">ID</span>
          <i class="icon-chevron-down"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sort table based on First name">
          <span class="text-decoration-underline">First name</span>
          <i class="icon-chevron-expand"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="ascending" aria-label="Sort table based on Last name, descending">
          <span class="text-decoration-underline">Last name</span>
          <i class="icon-chevron-expand"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sort table based on Role">
          <span class="text-decoration-underline">Role</span>
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
        <th>1202</th>
        <td>Henrik</td>
        <td>Olsen</td>
        <td>Assistant</td>
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
  <table class="table table-striped table-bordered" data-sort-column="3">
    <thead>
      <tr>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sort table based on ID">
          <span class="text-decoration-underline">ID</span>
          <i class="icon-chevron-expand"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sort table based on First name">
          <span class="text-decoration-underline">First name</span>
          <i class="icon-chevron-expand"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="ascending" aria-label="Sort table based on Last name, descending">
          <span class="text-decoration-underline">Last name</span>
          <i class="icon-chevron-up"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sort table based on Role">
          <span class="text-decoration-underline">Role</span>
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
        <td>Assistant</td>
      </tr>
    </tbody>
  </table>
</div>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<div class="table-responsive">
  <!-- Note the [data-sort-column] attribute that is used to set the currently sorted column style -->
  <table class="table table-striped table-bordered" data-sort-column="3">
    <thead>
      <tr>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sort table based on ID">
          <span class="text-decoration-underline">ID</span>
          <i class="icon-chevron-expand"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sort table based on First name">
          <span class="text-decoration-underline">First name</span>
          <i class="icon-chevron-expand"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="ascending" aria-label="Sort table based on Last name, descending">
          <span class="text-decoration-underline">Last name</span>
          <i class="icon-chevron-up"></i>
        </th>
        <th scope="col" tabindex="0" aria-sort="none" aria-label="Sort table based on Role">
          <span class="text-decoration-underline">Role</span>
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
        <td>Assistant</td>
      </tr>
    </tbody>
  </table>
</div>`;
}

/*
 * Return null to remove Code from library-item.
 */
function getDocumentationHtml(): string | null {
  return null;
}
