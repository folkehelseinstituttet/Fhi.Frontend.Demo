import { Component, Input } from '@angular/core';
import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
    selector: 'app-paginations',
    templateUrl: './paginations.component.html',
    standalone: false
})
export class PaginationsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  page = 1;
  currentCollectionSize = 1024;
  currentPageSize = 50;
}
