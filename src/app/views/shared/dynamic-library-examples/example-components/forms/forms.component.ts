import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class PrototypeFormsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;
}
