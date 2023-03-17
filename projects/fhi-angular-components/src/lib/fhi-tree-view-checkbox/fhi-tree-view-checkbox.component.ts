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
  @Output() treeViewCheckboxToggle = new EventEmitter<FhiTreeViewCheckboxItem[]>();

  ngOnChanges() {
    this.createIds(this.items, 1);
    // console.log('FhiTreeViewCheckboxComponent.ngOnChanges()');
  }

  toggleExpanded(item: FhiTreeViewCheckboxItem) {
    item.isExpanded = !item.isExpanded;
  }

  toggleChecked(id: number | string) {
    // console.log('itemId', id);
    this.updateTreeState(id, this.items);
    this.treeViewCheckboxToggle.emit(this.items);
  }

  private updateTreeState(id: number | string, items: FhiTreeViewCheckboxItem[]) {
    items.forEach(item => {
      if (item.id === id) {
        item.isChecked = !item.isChecked;
      }
      if (item.children && item.children.length > 0) {
        this.updateTreeState(id, item.children);
      }
    });
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
