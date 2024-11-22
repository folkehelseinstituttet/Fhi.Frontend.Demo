import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { FhiMultiselectItem } from './fhi-multiselect.model';

@Component({
  selector: 'fhi-multiselect',
  imports: [CommonModule, FormsModule, NgSelectModule],
  standalone: true,
  templateUrl: './fhi-multiselect.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FhiMultiselectComponent {
  @Input() items: Array<FhiMultiselectItem> = [];
  @Input() labelForId: string = undefined;
  @Input() placeholder = '';
  @Input() disableTags: boolean;
  @Input() description: string = undefined;
  @Input() label = 'Label';
  @Input() notFoundText = 'Ingen elementer funnet';
  @Input() selectedItems: Array<any> = [];

  @Output() selectedItemsChange = new EventEmitter<Array<any>>();

  unselect(id: string) {
    if (!id) {
      return;
    }
    this.selectedItems = this.selectedItems.filter((item) => item !== id);
    this.selectedItemsChange.emit(this.selectedItems);
  }

  unselectAll() {
    this.selectedItems = [];
    this.selectedItemsChange.emit(this.selectedItems);
  }

  getSelectedName(selected: string) {
    return this.items.find((x) => x.id === selected).name;
  }

  onChange() {
    this.selectedItemsChange.emit(this.selectedItems);
  }
}
