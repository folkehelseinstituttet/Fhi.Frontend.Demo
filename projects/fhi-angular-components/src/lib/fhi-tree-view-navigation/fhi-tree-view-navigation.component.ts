import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { FhiTreeViewNavigationItem as Item } from './fhi-tree-view-navigation-item.model';

@Component({
  selector: 'fhi-tree-view-navigation',
  templateUrl: './fhi-tree-view-navigation.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FhiTreeViewNavigationComponent {
  @Input() items: Item[] = [];

  ngOnChanges() {
    this.createIds(this.items, 1);
  }

  toggleExpanded(item: Item) {
    item.isExpanded = !item.isExpanded;
  }

  private createIds(items: Item[], id: number) {
    items.forEach((item) => {
      if (item.id === undefined) {
        item.id = id++;
      }
      if (item.children && item.children.length > 0) {
        this.createIds(item.children, (id - 1) * 10 + 1);
      }
    });
  }
}
