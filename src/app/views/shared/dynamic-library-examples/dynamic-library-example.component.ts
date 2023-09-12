import { Component, Input } from '@angular/core';

import { LibraryItemGroupsDataService } from '../services/library-item-groups-data.service';
import { LibraryItemsShared } from '../models/library-item.model';
import { LibraryItemsSharedDataService } from '../services/library-items-shared-data.service';

// TODO: data service allá LibraryItemsSharedDataService (not good practice to import from MOCK_DB_DATA!)
import { LibraryItemGroupsSharedData } from 'src/MOCK_DB_DATA/library-items/library-item-groups-shared-data';

@Component({
  selector: 'app-dynamic-library-example',
  templateUrl: './dynamic-library-example.component.html'
})
export class DynamicLibraryExampleComponent {

  @Input() groupId: string;
  @Input() itemId: string;

  groups = LibraryItemGroupsSharedData;
  itemIds: any;
  itemIdsLoaded = false;
  items!: LibraryItemsShared;


  constructor(
    private itemsDataService: LibraryItemGroupsDataService,
    private libraryItemsSharedDataService: LibraryItemsSharedDataService
  ) { }

  ngOnInit() {
      this.getLibraryItemIds();

      // Testing new id and titel implementation!
      this.getLibraryItemsShared();
  }

  private getLibraryItemIds() {
    this.itemIdsLoaded = false;
    this.itemsDataService.getLibraryItemIds()
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
          this.items = libraryItemsShared;
        },
        error: error => this.getErrorMessage(error)
      });
  }

  private getErrorMessage(error: object) {
    console.log(error);
  }

}
