import { Component, Input } from '@angular/core';
import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
})
export class PrototypeFormsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;
}
