import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TreeViewRadio: LibraryItem[] = [{
  id: LibraryItemIds.TreeViewRadio,
  title: 'Tree view selection - radio',
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
<fhi-tree-view-selection [(items)]="items" [singleSelection]="true"></fhi-tree-view-selection>`;
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
  API:
</p>
<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Input</th>
        <th scope="col">Type</th>
        <th scope="col">Default</th>
        <th scope="col">Required</th>
        <th scope="col" style="min-width: 300px">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>[enableCheckAll]</th>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>no</td>
        <td>Whether or not a button for (un)checking all checkboxes at one level should be included in the UI of the component. <code>[enableCheckAll]="true"</code> overrides <code>[singleSelection]</code></td>
      </tr>
      <tr>
        <th>[items]</th>
        <td><code>Array&lt;FhiTreeViewSelectionItem&gt;</code></td>
        <td><code>[]</code></td>
        <td>yes</td>
        <td>All items in your checkbox tree.</td>
      </tr>
      <tr>
        <th>(itemsChange)</th>
        <td><code>Array&lt;FhiTreeViewSelectionItem&gt;</code></td>
        <td><i>N/A</i></td>
        <td>no</td>
        <td>An output event for accessing the state of all items in your checkbox tree.</td>
      </tr>
      <tr>
        <th>[singleSelection]</th>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>no</td>
        <td>Renders as radio buttons instead of checkboxes, to allow for only one selection in the tree. <code>[enableCheckAll]="true"</code> overrides <code>[singleSelection]</code></td>
      </tr>
   </tbody>
  </table>
</div>`;
}
