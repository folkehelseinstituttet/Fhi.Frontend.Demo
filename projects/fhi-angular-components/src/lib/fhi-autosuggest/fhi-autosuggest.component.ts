import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { FhiAutosuggestItem } from './fhi-autosuggest.model';

@Component({
  selector: 'fhi-autosuggest',
  imports: [CommonModule, NgSelectModule],
  standalone: true,
  templateUrl: './fhi-autosuggest.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FhiAutosuggestComponent {
  @Input() items: Array<FhiAutosuggestItem> = [];
  @Input() labelForId: string = undefined;
  @Input() placeholder = '';
  @Input() description: string = undefined;
  @Input() label = 'Label';
  @Input() selectedItem: number = null;
  @Input() notFoundText = 'Ingen elementer funnet';

  @Output() selectedItemChange = new EventEmitter<number>();

  onChange() {
    if (this.selectedItem) {
      this.selectedItemChange.emit(this.selectedItem);
    }
  }
}
