import { Component, Input } from '@angular/core';
import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
})
export class ToastsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  show1 = false;
  show2 = false;
  show3 = false;
  show4 = false;
}
