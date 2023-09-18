import { Component, Input } from '@angular/core';

import { LibraryItemGroupsDataService } from '../services/library-item-groups-data.service';
import { LibraryItemGroupsSharedDataService } from '../services/library-item-groups-shared-data.service';
import { LibraryItemGroupsShared, LibraryItemsShared } from '../models/library-item.model';
import { LibraryItemsSharedDataService } from '../services/library-items-shared-data.service';

@Component({
  selector: 'app-dynamic-library-example',
  templateUrl: './dynamic-library-example.component.html'
})
export class DynamicLibraryExampleComponent {

  @Input() groupId: string;
  @Input() itemId: string;

  groups!: LibraryItemGroupsShared;
  itemIds: any;
  itemIdsLoaded = false;
  items!: LibraryItemsShared;


  constructor(
    private itemsDataService: LibraryItemGroupsDataService,
    private libraryItemGroupsSharedDataService: LibraryItemGroupsSharedDataService,
    private libraryItemsSharedDataService: LibraryItemsSharedDataService
  ) { }

  ngOnInit() {
      this.groups = this.libraryItemGroupsSharedDataService.libraryItemGroupsShared;
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
