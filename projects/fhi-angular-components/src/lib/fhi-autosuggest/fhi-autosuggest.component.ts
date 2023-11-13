import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { FhiAutosuggestItem } from './fhi-autosuggest.model';

@Component({
  selector: 'fhi-autosuggest',
  templateUrl: './fhi-autosuggest.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FhiAutosuggestComponent {
  @Input() items: Array<FhiAutosuggestItem> = [];
  @Input() labelForId: string = 'id' + Math.random().toString().substring(2);
  @Input() placeholder: string = '';

  @Input() description: string = undefined;
  @Input() label: string = 'Label';
  @Input() selectedItem: number = null;
  @Input() notFoundText: string = 'Ingen elementer funnet';

  @Output() selectedItemChange = new EventEmitter<number>();

  onChange() {
    if (this.selectedItem) {
      this.selectedItemChange.emit(this.selectedItem);
    }
  }
}
