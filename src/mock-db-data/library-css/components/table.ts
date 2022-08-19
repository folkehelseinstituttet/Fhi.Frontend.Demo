import { LibraryItem, LibraryItemType } from 'src/app/views/shared/library/models/library-item.model';

export const Table: LibraryItem[] = [{
  title: 'Table',
  type: LibraryItemType.html,
  exampleHtml: `
<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">First name</th>
        <th scope="col">Last name</th>
        <th scope="col">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>1202</th>
        <td>Birger Henrik</td>
        <td>Tybring-Gjedde Olssen</td>
        <td>Assistant</td>
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
        <td>Director</td>
      </tr>
      <tr>
        <th>4211</th>
        <td>Elisabeth</td>
        <td>Kristiansen</td>
        <td>Script</td>
      </tr>
    </tbody>
  </table>
</div>`,

  codeHtml: `
<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">First name</th>
        <th scope="col">Last name</th>
        <th scope="col">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>1202</th>
        <td>Birger Henrik</td>
        <td>Tybring-Gjedde Olssen</td>
        <td>Assistant</td>
      </tr>
    </tbody>
  </table>
</div>`
}];
