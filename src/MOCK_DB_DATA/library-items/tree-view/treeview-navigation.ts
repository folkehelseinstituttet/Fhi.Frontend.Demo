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
  return `
<tree-root class="fhi-angular-tree-navigation fhi-angular-tree-no-drop-slots" [nodes]="navigationNodes">
  <ng-template #treeNodeTemplate let-node>
    <a class="fhi-angular-tree-navigation__link"
      [routerLink]="node.data.uri"
      *ngIf="node.data.uri.substr(0, 4) !== 'http'">{{ node.data.name }}</a>
    <a class="fhi-angular-tree-navigation__link"
      [href]="node.data.uri"
      *ngIf="node.data.uri.substr(0, 4) === 'http'">{{ node.data.name }}</a>
  </ng-template>
</tree-root>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return ``;
}
