import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TreeViewCheckbox: LibraryItem[] = [{
  id: LibraryItemIds.TreeViewCheckbox,
  title: 'Tree view checkbox',
  type: LibraryItemType.fhiAngular,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return ``;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return `
<fhi-tree-view-checkbox
  [enableCheckAll]="true"
  [(items)]="items">
</fhi-tree-view-checkbox>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Tree view navigation er en komponent som finnes i
  <a href="https://www.npmjs.com/package/@folkehelseinstituttet/angular-components">@folkehelseinstituttet/angular-components</a>.
</p>
<p>
  API'et består kun av en input:
</p>
<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Input</th>
        <th scope="col">Type</th>
        <th scope="col">Default</th>
        <th scope="col">Required</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>[enableCheckAll]</th>
        <td><code>boolean</code></td>
        <td><code>true</code></td>
        <td>no</td>
        <td>Whether or not a button for (un)checking all checkboxes at one level should be included in the UI of the component.</td>
      </tr>
      <tr>
        <th>[(items)]</th>
        <td><code>Array&lt;FhiTreeViewCheckboxItem&gt;</code></td>
        <td><code>[]</code></td>
        <td>yes</td>
        <td>A two way binding to access the state of all items in your checkbox tree.</td>
      </tr>
   </tbody>
  </table>
</div>`;
}
