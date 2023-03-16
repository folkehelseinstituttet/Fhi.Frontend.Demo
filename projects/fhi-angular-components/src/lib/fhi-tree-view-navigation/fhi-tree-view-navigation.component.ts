import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { FhiTreeViewNavigationItem } from './fhi-tree-view-navigation-item.model';

@Component({
  selector: 'fhi-tree-view-navigation',
  templateUrl: './fhi-tree-view-navigation.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FhiTreeViewNavigationComponent {

  @Input() items: FhiTreeViewNavigationItem[] = [];

  toggleNode(node: FhiTreeViewNavigationItem) {
    node.isExpanded = !node.isExpanded;
  }

  ngOnChanges() {
    this.createIds(this.items, 1);
  }

  private createIds(nodes: FhiTreeViewNavigationItem[], id: number) {
    nodes.forEach(node => {
      if (node.id === undefined) {
        node.id = id++;
      }
      if (node.children && node.children.length > 0) {
        this.createIds(node.children, ((id - 1) * 10) + 1);
      }
    });
  }

}
