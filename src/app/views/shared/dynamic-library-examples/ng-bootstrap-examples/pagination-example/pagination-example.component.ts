import { Component, Input } from '@angular/core';

import { LibraryItemIds } from 'src/app/library-item-ids';

@Component({
  selector: 'app-pagination-example',
  templateUrl: './pagination-example.component.html'
})
export class PaginationExampleComponent {
  @Input() itemId!: string;
  page = 1;

  itemIds = LibraryItemIds;
  
  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }
}
