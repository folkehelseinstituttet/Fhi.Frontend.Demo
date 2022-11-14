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
<mat-tree [dataSource]="dataSource" [treeControl]="treeControl" class="fhi-material-tree">
  <mat-tree-node *matTreeNodeDef="let node" matTreeNodeToggle>
    <a class="fhi-material-tree__link"
      [routerLink]="node.uri"
      *ngIf="node.uri.substr(0, 4) !== 'http'">{{ node.name }}</a>
    <a class="fhi-material-tree__link"
      [href]="node.uri"
      *ngIf="node.uri.substr(0, 4) === 'http'">{{ node.name }}</a>
  </mat-tree-node>

  <mat-nested-tree-node *matTreeNodeDef="let node; when: hasChild">
    <div class="mat-tree-node">
      <button class="fhi-material-tree__toggler" mat-icon-button matTreeNodeToggle [attr.aria-label]="'Toggle ' + node.name">
        <i [ngClass]="{'icon-chevron-up' : treeControl.isExpanded(node), 'icon-chevron-down' : !treeControl.isExpanded(node)}"></i>
      </button>
      <a class="fhi-material-tree__link"
        [routerLink]="node.uri"
        *ngIf="node.uri.substr(0, 4) !== 'http'">{{ node.name }}</a>
      <a class="fhi-material-tree__link"
        [href]="node.uri"
        *ngIf="node.uri.substr(0, 4) === 'http'">{{ node.name }}</a>
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
<p>Tree view navigation er bygget på <a href="https://material.angular.io/components/tree/overview">Angular Material Tree</a>.</p>`;
}
