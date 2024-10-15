import { LibraryItem } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemsSharedData as ITEMS } from '../library-items-shared-data';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';
import { ItemDependencyType, ItemType } from 'src/app/views/shared/item-type.enums';

export const TreeViewNavigation: LibraryItem[] = [
  {
    id: ITEMS.TreeViewNavigation.id,
    title: ITEMS.TreeViewNavigation.title,
    type: ItemType.angular,
    exampleHtml: getExampleHtml(),
    codeHtml: getCodeHtml(),
    documentationHtml: getDocumentationHtml(),
    parent: GROUPS.TreeViews,
    dependencyType: ItemDependencyType.fhiAngular,
  },
];

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
  For å ta i bruk denne komponenten i en Angular-applikasjon må NPM-pakken
  <a href="${CONST.FhiAngularComponentsNpmUrl}">@folkehelseinstituttet/angular-components</a>
  være lagt til som en "dependency".
</p>

<h2 class="h5">API</h2>
<div class="table-responsive">
  <table class="table table-sm">
    <tbody>
      <tr>
        <td>Input</th>
        <td>Type</th>
        <td>Default</th>
        <td>Required</th>
        <td>Description</th>
      </tr>
      <tr>
        <td><code>[items]</code></td>
        <td><code>Array&lt;FhiTreeViewNavigationItem&gt;</code></td>
        <td><code>[]</code></td>
        <td>yes</td>
        <td>All items in your navigation tree.</td>
      </tr>
  </tbody>
  </table>
</div>

<h2 class="h5">Nyttige lenker</h2>
<ul>
  <li>
    <a href="${CONST.FhiAngularComponentsGithubLibUrl}/fhi-tree-view-navigation">
      Kildekode
    </a>
  </li>
  <li>
    <a href="${CONST.ExampleComponentsGithubUrl}/tree-views">
      Demokode
    </a>
  </li>
</ul>`;

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
    <tbody>
      <tr>
        <td>Input</th>
        <td>Type</th>
        <td>Default</th>
        <td>Required</th>
        <td>Description</th>
      </tr>
      <tr>
        <td><code>[items]</code></td>
        <td><code>Array&lt;FhiTreeViewNavigationItem&gt;</code></td>
        <td><code>[]</code></td>
        <td>yes</td>
        <td>All items in your navigation tree.</td>
      </tr>
   </tbody>
  </table>
</div>`;
}
