import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TreeViewBuilder: LibraryItem[] = [{
  id: LibraryItemIds.TreeViewBuilder,
  title: 'Tree view builder',
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
<div class="mb-2">
  <button class="btn fhi-btn-flat-secondary p-0">
    <i class="icon-plus-circle-fill"></i>
    <span>Legg til element</span>
  </button>
</div>

<tree-root [nodes]="treeViewSimpleNodes">
  <ng-template #treeNodeTemplate let-node let-index="index">
    <div class="tree-column">
      <span>{{ node.data.name }}</span>
      <button class="btn">
        <i class="icon-pencil"></i>
      </button>
      <button class="btn">
        <i class="icon-plus-circle"></i>
      </button>
      <button class="btn">
        <i class="icon-trash-can"></i>
      </button>
    </div>
  </ng-template>
</tree-root>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
<p>Tree view builder er bygget på <a href="https://www.npmjs.com/package/@circlon/angular-tree-component">Circlon Angular Tree Component</a></p>`;
}
