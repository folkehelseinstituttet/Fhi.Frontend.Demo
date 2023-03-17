import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { FhiTreeViewCheckboxItem } from './fhi-tree-view-checkbox-item.model';

@Component({
  selector: 'fhi-tree-view-checkbox',
  templateUrl: './fhi-tree-view-checkbox.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FhiTreeViewCheckboxComponent {

  @Input() items: FhiTreeViewCheckboxItem[] = [];
  @Output() itemsChange = new EventEmitter<FhiTreeViewCheckboxItem[]>();

  ngOnChanges() {
    this.createIds(this.items, 1);
  }

  toggleItem(item: FhiTreeViewCheckboxItem) {
    item.isExpanded = !item.isExpanded;
  }

  checkTreeState(itemId: number | string) {
    console.log('itemId', itemId);
  }

  private createIds(items: FhiTreeViewCheckboxItem[], id: number) {
    items.forEach(item => {
      if (item.id === undefined) {
        item.id = id++;
      }
      if (item.children && item.children.length > 0) {
        this.createIds(item.children, ((id - 1) * 10) + 1);
      }
    });
  }
}
