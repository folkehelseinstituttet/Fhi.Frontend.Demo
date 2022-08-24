import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from 'src/app/services/url.service';
import { ListOfVariationsDataService } from '../../shared/list-of-variations-data.service';
import { LibraryItem } from '../../shared/library/models/library-item.model';

@Component({
  selector: 'app-list-of-variations',
  templateUrl: './list-of-variations.component.html',
  styles: [
  ]
})
export class ListOfVariationsComponent implements OnInit, OnDestroy {

  libraryItems!: LibraryItem[];
  libraryItemsLoaded = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private urlService: UrlService,
    private listOfVariationsDataService: ListOfVariationsDataService
  ) { }

  ngOnInit() {
    this.subscription.add(this.urlService.URL$
      .subscribe(() => {
        this.getLibraryItems();
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getLibraryItems() {
    const lastSegmentPath = this.urlService.getLastSegmentPath();
    this.libraryItemsLoaded = false;
    this.listOfVariationsDataService.getLibraryItems(lastSegmentPath)
      .subscribe(libraryItems => {
        this.libraryItems = libraryItems;
        this.libraryItemsLoaded = true;
      },
      error => this.getErrorMessage(error));
  }

  private getErrorMessage(error: object) {
    console.log(error);
  }

}
