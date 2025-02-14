import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { mergeMap, Subscription, tap } from 'rxjs';

import { UrlService } from 'src/app/services/url.service';
import {
  LibraryItem,
  LibraryItemGroup,
  LibraryItemGroupsShared,
} from '../../shared/models/library-item.model';
import { SharedConstants as CONST } from '../../shared/shared.constants';
import { LibraryItemsDataService } from '../../shared/services/library-items-data.service';

@Component({
    selector: 'app-library-items-section',
    templateUrl: './library-items-section.component.html',
    standalone: false
})
export class LibraryItemsSectionComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  isDebugging = false;
  lang_NO: string = CONST.languageLocaleId_NO;
  lang_EN: string = CONST.languageLocaleId_EN;
  libraryItems!: LibraryItem[];
  group!: LibraryItemGroup;
  sectionTitle!: string;
  sectionTitleLang!: string;
  sectionIntro!: string;
  currentAnchor: string;
  dataIsLoaded = false;

  constructor(
    private urlService: UrlService,
    private libraryItemsDataService: LibraryItemsDataService,
    private viewportScroller: ViewportScroller,
  ) {}

  ngOnInit() {
    this.currentAnchor = window.location.hash.substring(1);

    this.subscription.add(
      this.urlService.URL$.pipe(
        tap(() => (this.dataIsLoaded = false)),
        mergeMap(() => this.libraryItemsDataService.getLibraryItemGroupsShared()),
      ).subscribe((libraryItemGroupsShared) => {
        const lastSegmentPath = this.urlService.getLastSegmentPath();
        this.isDebugging = this.urlService.getSegmentPath(1) === 'debug';
        this.getLibraryItems(lastSegmentPath, libraryItemGroupsShared);
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  scrollToLibraryItem(itemId: string) {
    this.currentAnchor = itemId;
    this.viewportScroller.scrollToAnchor(itemId);
    window.location.hash = itemId;
  }

  private getLibraryItems(
    lastSegmentPath: string,
    libraryItemGroupsShared: LibraryItemGroupsShared,
  ) {
    this.subscription.add(
      this.libraryItemsDataService
        .getLibraryItemGroup(lastSegmentPath, libraryItemGroupsShared)
        .subscribe({
          next: (libraryItemGroup) => {
            this.group = libraryItemGroup;
            this.sectionTitle = libraryItemGroup.title;
            this.sectionTitleLang = libraryItemGroup.titleLang;
            this.sectionIntro = libraryItemGroup.intro;
            this.libraryItems = libraryItemGroup.libraryItems;
            this.dataIsLoaded = true;
          },
          error: (error) => error,
        }),
    );
  }
}
