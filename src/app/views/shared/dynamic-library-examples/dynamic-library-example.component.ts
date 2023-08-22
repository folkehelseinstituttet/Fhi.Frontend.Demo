import { Component, Input } from '@angular/core';

import { LibraryItemGroupsDataService } from '../services/library-item-groups-data.service';
import { LibraryItemsShared } from '../models/library-item.model';
import { LibraryItemsSharedDataService } from '../services/library-items-shared-data.service';

@Component({
  selector: 'app-dynamic-library-example',
  templateUrl: './dynamic-library-example.component.html'
})
export class DynamicLibraryExampleComponent {

  @Input() itemId: string;

  itemIds: any;
  itemIdsLoaded = false;

  libraryItemsShared!: LibraryItemsShared;

  constructor(
    private libraryItemsDataService: LibraryItemGroupsDataService,
    private libraryItemsSharedDataService: LibraryItemsSharedDataService
  ) { }

  ngOnInit() {
      this.getLibraryItemIds();

      // Testing new id and titel implementation!
      this.getLibraryItemsShared();
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

  private getLibraryItemsShared() {
    this.libraryItemsSharedDataService.getLibraryItemsShared()
      .subscribe({
        next: libraryItemsShared => {
          this.libraryItemsShared = libraryItemsShared;
        },
        error: error => this.getErrorMessage(error)
      });
  }

  private getErrorMessage(error: object) {
    console.log(error);
  }

}
