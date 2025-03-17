import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { FhiAutosuggestItem } from './fhi-autosuggest.model';

@Component({
    selector: 'fhi-autosuggest',
    imports: [CommonModule, NgSelectModule, FormsModule],
    templateUrl: './fhi-autosuggest.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FhiAutosuggestComponent {
  @Input({ required: true }) items!: Array<FhiAutosuggestItem>;
  @Input() labelForId: string | undefined;
  @Input() placeholder: string | undefined;
  @Input() description: string | undefined;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) selectedItem!: number;
  @Input() notFoundText = 'Ingen elementer funnet';

  @Output() selectedItemChange = new EventEmitter<number>();

  onChange() {
    if (this.selectedItem) {
      this.selectedItemChange.emit(this.selectedItem);
    }
  }
}
