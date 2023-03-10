import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TreeViewNavigation: LibraryItem[] = [{
  id: LibraryItemIds.TreeViewNavigation,
  title: 'Tree view navigation',
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
  return `<fhi-tree-view-navigation [items]="items"></fhi-tree-view-navigation>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>
  Tree view navigation en komponent som finnes i
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
        <th>[nodes]</th>
        <td><code>Array&lt;FhiTreeViewNavigationItem&gt;</code></td>
        <td><code>[]</code></td>
        <td>yes</td>
        <td>All items in your navigation tree.</td>
      </tr>
   </tbody>
  </table>
</div>`;
}
