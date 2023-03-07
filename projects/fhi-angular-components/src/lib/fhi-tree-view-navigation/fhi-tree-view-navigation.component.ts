import { Component, Input, ViewEncapsulation } from '@angular/core';

import { FhiTreeViewNavigationNode } from './fhi-tree-view-navigation-item.model';

@Component({
  selector: 'fhi-tree-view-navigation',
  templateUrl: './fhi-tree-view-navigation.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FhiTreeViewNavigationComponent {

  @Input() nodes: Array<FhiTreeViewNavigationNode> = [];

}
