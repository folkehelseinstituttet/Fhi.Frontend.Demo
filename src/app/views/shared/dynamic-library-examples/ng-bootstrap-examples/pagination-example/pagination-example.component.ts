import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-example',
  templateUrl: './pagination-example.component.html',
})
export class PaginationExampleComponent {
  @Input() itemId!: string;
  @Input() itemIds!: any;

  page = 1;
  currentCollectionSize = 1000;
  currentPageSize = 50;
}
