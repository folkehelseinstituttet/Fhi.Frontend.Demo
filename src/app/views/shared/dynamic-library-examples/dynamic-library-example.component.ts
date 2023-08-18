import { Component, Input } from '@angular/core';

import { LibraryItemsDataService } from '../services/library-items-data.service';
import { LibraryItemsShared } from '../models/library-item.model';

@Component({
  selector: 'app-dynamic-library-example',
  templateUrl: './dynamic-library-example.component.html'
})
export class DynamicLibraryExampleComponent {

  @Input() itemId: string;

  itemIds: any;
  itemIdsLoaded = false;

  libraryItemsShared!: LibraryItemsShared;
  libraryItemsSharedLoaded = false;


  constructor(private libraryItemsDataService: LibraryItemsDataService) { }

  ngOnInit() {
      this.getLibraryItemIds();

      // Testing new id and titel implementation!
      // TODO: shold be a service called in DeveloperComponent, since API is now kalled for every item!
      this.geLibraryItemsShared();
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

  private geLibraryItemsShared() {
    this.itemIdsLoaded = false;
    this.libraryItemsDataService.geLibraryItemsShared()
      .subscribe(libraryItemsShared => {
        console.log('libraryItemsShared', libraryItemsShared);
        this.libraryItemsShared = libraryItemsShared;
        this.libraryItemsSharedLoaded = true;
      },
      error => this.getErrorMessage(error));
  }

  private getErrorMessage(error: object) {
    console.log(error);
  }

}
