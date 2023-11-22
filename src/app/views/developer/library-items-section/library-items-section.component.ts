import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from 'src/app/services/url.service';
import { LibraryItemGroupsDataService } from '../../shared/services/library-item-groups-data.service';
import { LibraryItem } from '../../shared/models/library-item.model';
import { SharedConstants as CONST } from '../../shared/shared.constants';

@Component({
  selector: 'app-library-items-section',
  templateUrl: './library-items-section.component.html',
})
export class LibraryItemsSectionComponent implements OnInit, OnDestroy {
  isDebugging = false;
  lang_NO: string = CONST.languageLocaleId_NO;
  lang_EN: string = CONST.languageLocaleId_EN;
  libraryItems!: LibraryItem[];
  libraryItemsLoaded = false;
  groupId!: string;
  sectionTitle!: string;
  sectionTitleLang!: string;
  sectionIntro!: string;

  private subscription: Subscription = new Subscription();

  constructor(
    private urlService: UrlService,
    private itemsDataService: LibraryItemGroupsDataService,
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.urlService.URL$.subscribe(() => {
        const lastSegmentPath = this.urlService.getLastSegmentPath();
        this.isDebugging = this.urlService.getSegmentPath(1) === 'debug' ? true : false;
        this.libraryItemsLoaded = false;
        this.getLibraryItems(lastSegmentPath);
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getLibraryItems(lastSegmentPath: string) {
    this.itemsDataService.getLibraryItemGroup(lastSegmentPath).subscribe({
      next: (libraryItemGroup) => {
        this.groupId = libraryItemGroup.id;
        this.sectionTitle = libraryItemGroup.title;
        this.sectionTitleLang = libraryItemGroup.titleLang;
        this.sectionIntro = libraryItemGroup.intro;
        this.libraryItems = libraryItemGroup.libraryItems;
        this.libraryItemsLoaded = true;
      },
      error: (error) => this.getLibraryItems_OLD(lastSegmentPath, error),
    });
  }

  // TODO:
  //   Remove if test when all segmentPaths use getLibraryItemGroup()
  //   and getLibraryItems() can be deprecated.
  private getLibraryItems_OLD(lastSegmentPath: string, error: any) {
    // console.log('getLibraryItems_OLD -> error', error);
    this.sectionTitle = undefined;
    this.itemsDataService.getLibraryItems(lastSegmentPath).subscribe(
      (libraryItems) => {
        this.libraryItems = libraryItems;
        this.libraryItemsLoaded = true;
      },
      (error) => this.getErrorMessage(error),
    );
  }

  private getErrorMessage(error: object) {
    console.log(error);
  }
}
