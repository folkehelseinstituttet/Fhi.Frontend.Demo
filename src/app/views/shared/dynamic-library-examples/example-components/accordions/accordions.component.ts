import { Component, Input } from '@angular/core';

import { LibraryItemsSharedDataService } from '../../../services/library-items-shared-data.service';
import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html'
})
export class AccordionsComponent {
  @Input() itemId!: string;

  items!: LibraryItemsShared;

  constructor(
    private libraryItemsSharedDataService: LibraryItemsSharedDataService
  ) { }

  ngOnInit() {
    this.items = this.libraryItemsSharedDataService.libraryItemsShared;
  }

}
