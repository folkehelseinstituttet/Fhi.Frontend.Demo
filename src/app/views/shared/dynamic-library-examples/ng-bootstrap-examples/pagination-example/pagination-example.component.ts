import { Component, Input } from '@angular/core';

import { LibraryItemIds } from 'src/app/library-item-ids';

@Component({
  selector: 'app-pagination-example',
  templateUrl: './pagination-example.component.html'
})
export class PaginationExampleComponent {
  @Input() itemId!: string;

  itemIds = LibraryItemIds;

  page = 1;
  currentCollectionSize = 1000;
  currentPageSize = 50;
}
