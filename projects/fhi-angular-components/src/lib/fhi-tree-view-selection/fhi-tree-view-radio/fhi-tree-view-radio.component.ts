import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FhiTreeViewSelectionComponent } from '../fhi-tree-view-selection.component';
import { FhiTreeViewSelectionItem as Item } from '../fhi-tree-view-selection-item.model';

@Component({
  selector: 'fhi-tree-view-radio',
  standalone: true,
  imports: [FhiTreeViewSelectionComponent],
  templateUrl: './fhi-tree-view-radio.component.html',
})
export class FhiTreeViewRadioComponent {
  @Input() enableFilter = false;
  @Input() filterLabel!: string;
  @Input({ required: true }) items!: Item[];
  @Input({ required: true }) name!: string;

  @Output() itemsChange = new EventEmitter<Item[]>();

  onItemsChange(items: Item[]) {
    this.items = items;
    this.itemsChange.emit(this.items);
  }
}
