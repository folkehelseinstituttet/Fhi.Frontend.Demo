import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FhiTreeViewSelectionComponent } from './fhi-tree-view-selection.component';
import { FhiTreeViewSelectionItem as Item } from './fhi-tree-view-selection-item.model';

@Component({
  selector: 'fhi-tree-view-checkbox',
  standalone: true,
  imports: [FhiTreeViewSelectionComponent],
  templateUrl: './fhi-tree-view-checkbox.component.html',
})
export class FhiTreeViewCheckboxComponent {
  @Input() enableCheckAll = false;
  @Input() items: Item[];

  @Output() itemsChange = new EventEmitter<Item[]>();

  onItemsChange(items: Item[]) {
    this.items = items;
  }
}
