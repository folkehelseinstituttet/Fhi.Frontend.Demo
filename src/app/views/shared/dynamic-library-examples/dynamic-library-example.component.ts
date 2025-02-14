import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { mergeMap, Subscription, tap } from 'rxjs';

import {
  LibraryItemGroup,
  LibraryItemGroupsShared,
  LibraryItemsShared,
} from '../models/library-item.model';
import { LibraryItemsDataService } from '../services/library-items-data.service';
import { UrlService } from 'src/app/services/url.service';

@Component({
    selector: 'app-dynamic-library-example',
    templateUrl: './dynamic-library-example.component.html',
    standalone: false
})
export class DynamicLibraryExampleComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input() group: LibraryItemGroup;
  @Input() itemId: string;

  groups!: LibraryItemGroupsShared;
  items: LibraryItemsShared;
  dataIsLoaded = false;

  constructor(
    private libraryItemsDataService: LibraryItemsDataService,
    private urlService: UrlService,
  ) {}

  ngOnInit() {
    this.groups = this.libraryItemsDataService.libraryItemGroupsShared;
    this.subscription.add(
      this.urlService.URL$.pipe(
        tap(() => (this.dataIsLoaded = false)),
        mergeMap(() => this.libraryItemsDataService.getLibraryItemsShared()),
      ).subscribe((libraryItemsShared) => {
        this.items = libraryItemsShared;
        this.dataIsLoaded = true;
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
