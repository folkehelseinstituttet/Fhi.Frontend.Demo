import { Component, Input } from '@angular/core';

import { LibraryItemsDataService } from '../services/library-items-data.service';

@Component({
  selector: 'app-dynamic-library-example',
  templateUrl: './dynamic-library-example.component.html'
})
export class DynamicLibraryExampleComponent {

  @Input() itemId: string;

  itemIds: any;
  itemIdsLoaded = false;

  constructor(private libraryItemsDataService: LibraryItemsDataService) { }

  ngOnInit() {
    this.getLibraryItemIds();
  }

  private getLibraryItemIds() {
    this.itemIdsLoaded = false;
    this.libraryItemsDataService.getLibraryItemIds()
      .subscribe(libraryItemIds => {
        this.itemIds = libraryItemIds;
        this.itemIdsLoaded = true;
      },
      error => this.getErrorMessage(error));
  }

  private getErrorMessage(error: object) {
    console.log(error);
  }

}
