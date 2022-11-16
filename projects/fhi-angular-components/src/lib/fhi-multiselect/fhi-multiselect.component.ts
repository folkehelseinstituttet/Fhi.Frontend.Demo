import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FhiMultiselectItem } from './fhi-multiselect.model';

@Component({
  selector: 'fhi-multiselect',
  templateUrl: './fhi-multiselect.component.html',
  styleUrls: ['./fhi-multiselect.component.scss']
})
export class FhiMultiselectComponent {

  @Input() items: Array<FhiMultiselectItem> = [];
  @Input() selectedItems: Array<any> = [];

  @Input() label: string = 'Label';
  @Input() description: string = 'Description';

  @Output() selectedItemsChange = new EventEmitter<Array<any>>();

  constructor() { }

  unselect(id: string) {
    if (!id) {
      return;
    }
    this.selectedItems = this.selectedItems.filter(item => item !== id);
    this.selectedItemsChange.emit(this.selectedItems);
  }

  unselectAll() {
    this.selectedItems = [];
    this.selectedItemsChange.emit(this.selectedItems);
  }

  getSelectedName(selected: string) {
    return this.items.find(x => x.id === selected).name;
  }

  onChange() {
    this.selectedItemsChange.emit(this.selectedItems);
  }

}
