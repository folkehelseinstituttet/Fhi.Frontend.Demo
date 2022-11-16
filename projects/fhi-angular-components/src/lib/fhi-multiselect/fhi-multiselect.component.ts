import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { FhiMultiselectItem } from './fhi-multiselect.model';

@Component({
  selector: 'fhi-multiselect',
  templateUrl: './fhi-multiselect.component.html',
  styleUrls: ['./fhi-multiselect.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FhiMultiselectComponent {

  @Input() items: Array<FhiMultiselectItem> = [];
  @Input() selectedItems: Array<any> = [];

  @Input() description: string = 'Description';
  @Input() forId!: string;
  @Input() label: string = 'Label';
  @Input() placeholder: string = undefined;

  @Output() selectedItemsChange = new EventEmitter<Array<any>>();

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
