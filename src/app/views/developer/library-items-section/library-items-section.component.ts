import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from 'src/app/services/url.service';
import { LibraryItemGroupsDataService } from '../../shared/services/library-item-groups-data.service';
import { LibraryItem } from '../../shared/models/library-item.model';

@Component({
  selector: 'app-library-items-section',
  templateUrl: './library-items-section.component.html'
})
export class LibraryItemsSectionComponent implements OnInit, OnDestroy {

  isDebugging = false;
  libraryItems!: LibraryItem[];
  libraryItemsLoaded = false;
  sectionTitle!: string;
  sectionIntro!: string;

  private subscription: Subscription = new Subscription();

  constructor(
    private urlService: UrlService,
    private libraryItemsDataService: LibraryItemGroupsDataService
  ) { }

  ngOnInit() {
    this.subscription.add(this.urlService.URL$
      .subscribe(() => {
        this.isDebugging = (this.urlService.getSegmentPath(1) === 'debug') ? true : false;
        this.getLibraryItems();
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getLibraryItems() {
    const lastSegmentPath = this.urlService.getLastSegmentPath();
    this.libraryItemsLoaded = false;

    if (lastSegmentPath === 'fhiangularhighcharts') {

      // TODO: remove if test when all segmentPaths use getLibraryItemGroup()
      //       and getLibraryItems() can deprecates. And use mergeMap() instead
      //       of nesting this subscription inside URL$-susbsrcription (see DeveloperComponent
      //       for the mergeMap syntax)

      this.libraryItemsDataService.getLibraryItemGroup(lastSegmentPath)
        .subscribe(libraryItemGroup => {
          this.sectionTitle = libraryItemGroup.title;
          this.sectionIntro = libraryItemGroup.intro;
          this.libraryItems = libraryItemGroup.libraryItems;
          this.libraryItemsLoaded = true;
        },
        error => this.getErrorMessage(error));

    } else {
      this.sectionTitle = undefined;
      this.libraryItemsDataService.getLibraryItems(lastSegmentPath)
        .subscribe(libraryItems => {
          this.libraryItems = libraryItems;
          this.libraryItemsLoaded = true;
        },
        error => this.getErrorMessage(error));
    }

  }

  private getErrorMessage(error: object) {
    console.log(error);
  }

}
