import { LibraryItemIds } from '../library-item-ids';
import { LibraryItem, LibraryItemType } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemConstants as CONST } from '../library-item-constants';

export const TreeViewCheckbox: LibraryItem[] = [{
  id: LibraryItemIds.TreeViewCheckbox,
  title: 'Tree view med checkbox',
  type: LibraryItemType.fhiAngular,
  exampleHtml: getExampleHtml(),
  codeHtml: getCodeHtml(),
  documentationHtml: getDocumentationHtml()
}];


/*
 * Return value is ignored if LibraryItemType is not html
 */
function getExampleHtml(): string {
  return `<fhi-tree-view-checkbox></fhi-tree-view-checkbox>`;
}

/*
 * Return empty string to use a copy of exampleHtml as codeHtml.
 * Return null to remove Code from library-item.
 */
function getCodeHtml(): string | null {
  return ``;
  return `
<mat-tree class="fhi-material-tree fhi-material-tree--check"
  [dataSource]="dataSource"
  [treeControl]="treeControl">
  <mat-tree-node *matTreeNodeDef="let node" matTreeNodeToggle>
    <div class="d-flex flex-column justify-content-center">
      <div class="form-check">
        <input class="form-check-input"
               type="checkbox"
               value=""
               [id]="node.id"
               [checked]="node.checked"
               (click)="checkTreeState(node.id)">
        <label class="form-check-label" [for]="node.id">
          {{ node.name }}
        </label>
      </div>
    </div>
  </mat-tree-node>

  <mat-nested-tree-node *matTreeNodeDef="let node; when: hasChild; let i = index">
    <div class="mat-tree-node">
      <button class="fhi-material-tree__toggler fhi-material-tree__toggler--plus"
            mat-icon-button
            matTreeNodeToggle
            [attr.aria-label]="'Vis/skjul undernivåer av ' + node.name">
      <i [ngClass]="
         {
          'icon-dash-circle' : treeControl.isExpanded(node) && !node.anyCheckedInSelection,
          'icon-plus-circle' : !treeControl.isExpanded(node) && !node.anyCheckedInSelection,
          'icon-dash-circle-fill' : treeControl.isExpanded(node) && node.anyCheckedInSelection,
          'icon-plus-circle-fill' : !treeControl.isExpanded(node) && node.anyCheckedInSelection
         }"></i>
      </button>
      <div class="d-flex flex-column justify-content-center">
        <div class="form-check">
          <input class="form-check-input"
                 type="checkbox"
                 value=""
                 [id]="node.id"
                 [checked]="node.checked"
                 (click)="checkTreeState(node.id)">
          <label class="form-check-label" [for]="node.id">
            {{ node.name }}
          </label>
        </div>
      </div>
    </div>

    <div class="fhi-material-tree__nested-group" [class.fhi-material-tree__invisible]="!treeControl.isExpanded(node)" role="group">
      <ng-container matTreeNodeOutlet></ng-container>
    </div>
  </mat-nested-tree-node>
</mat-tree>`;
}

/*
 * Return null to remove Documentation from library-item.
 */
function getDocumentationHtml(): string | null {
  return `
`;
  return `
  <p>Vis/skjul noder på Tree view med checkbox er bygget på <a href="https://material.angular.io/components/tree/overview">Angular Material Tree</a>.</p>
  <p>Checkboxer er bygget på Bootstraps <a href="https://getbootstrap.com/docs/5.2/forms/checks-radios/">Checks</a>.</p>`;
}
