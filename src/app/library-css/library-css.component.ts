import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from 'src/app/_common/services/url-service/url.service';
import { UrlUtilitiesService } from 'src/app/_common/services/url-service/url-utilities.service';
import { LibraryCssDataService } from './library-css-data.service';
import { LibraryMenuService } from '../_common/services/library-menu.service';
import { LibraryItem } from '../shared/models/library-example.model';
import { LibraryCssMenu } from './constants/library-css-menu';
import { LibraryMenuLevel2Item } from 'src/app/shared/models/library-menu-level-2-item.model';
import { LibraryMenuLevel2Category } from '../shared/models/library-menu-level-2-category.model';

@Component({
  selector: 'app-library-css',
  templateUrl: './library-css.component.html'
})
export class LibraryCssComponent implements OnInit, OnDestroy {

  constructor(
    private urlService: UrlService,
    private urlUtilities: UrlUtilitiesService,
    private libraryCssDataService: LibraryCssDataService,
    private libraryMenuService: LibraryMenuService
  ) { }

  private subscription: Subscription = new Subscription();

  libraryExamples: LibraryItem[];
  libraryExamplesLoaded = false;
  libraryMenuLevel1Items = LibraryCssMenu.level1Items;
  libraryMenuLevel2Items: LibraryMenuLevel2Item[];
  libraryMenuLevel2Categories: LibraryMenuLevel2Category[];
  currentLibraryMenuLevel1Path: string;

  ngOnInit() {
    this.currentLibraryMenuLevel1Path = this.urlUtilities.getCurrentSegmentPath();
    this.getLibraryItems(this.currentLibraryMenuLevel1Path);

    this.subscription.add(this.urlService.urlTree$
      .subscribe(() => {
        if (this.urlUtilities.getFragment() === null) {
          this.currentLibraryMenuLevel1Path = this.urlUtilities.getCurrentSegmentPath();
          this.getLibraryItems(this.currentLibraryMenuLevel1Path);
        }
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getLibraryItems(path: string) {
    this.libraryExamplesLoaded = false;
    this.subscription.add(this.libraryCssDataService.getLibraryItems(path)
      .subscribe(libraryExamples => {
        this.libraryExamples = this.libraryMenuService.addItemId(libraryExamples);
        this.libraryMenuLevel2Items = this.libraryMenuService.getLevel2MenuItems(this.libraryExamples);
        this.libraryMenuLevel2Categories = this.libraryMenuService.getLevel2MenuItemsByCategory(this.libraryExamples);
        this.libraryExamplesLoaded = true;
      },
      error => this.getErrorMessage(error)));
  }

  private getErrorMessage(error: object) {
    console.log(error);
  }

}

