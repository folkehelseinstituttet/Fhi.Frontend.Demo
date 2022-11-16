import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { FhiAutosuggestItem } from './fhi-autosuggest.model';

@Component({
  selector: 'fhi-autosuggest',
  templateUrl: './fhi-autosuggest.component.html',
  styleUrls: ['./fhi-autosuggest.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FhiAutosuggestComponent {

  @Input() items: Array<FhiAutosuggestItem> = [];
  @Input() selectedItem: number;

  @Input() description: string = 'Description';
  @Input() forId!: string;
  @Input() label: string = 'Label';
  @Input() placeholder: string = undefined;

  @Output() selectedItemChange = new EventEmitter<number>();

  onChange() {
    this.selectedItemChange.emit(this.selectedItem);
  }

}
