import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from 'src/app/services/url.service';
import { LibraryCssDataService } from './library-css-data.service';
import { LibraryMenuService } from '../_common/services/library-menu.service';
import { LibraryItem } from '../views/shared/library/models/library-item.model';
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
    private libraryCssDataService: LibraryCssDataService,
    private libraryMenuService: LibraryMenuService
  ) { }

  private subscription: Subscription = new Subscription();

  libraryItems: LibraryItem[];
  libraryItemsLoaded = false;
  libraryMenuLevel1Items = LibraryCssMenu.level1Items;
  libraryMenuLevel2Items: LibraryMenuLevel2Item[];
  libraryMenuLevel2Categories: LibraryMenuLevel2Category[];
  currentLibraryMenuLevel1Path: string;

  ngOnInit() {
    this.subscription.add(this.urlService.URL$
      .subscribe(() => {
        if (this.urlService.getFragment() === null) {
          this.currentLibraryMenuLevel1Path = this.urlService.getCurrentSegmentPath();
          this.getLibraryItems(this.currentLibraryMenuLevel1Path);
        }
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getLibraryItems(path: string) {
    this.libraryItemsLoaded = false;
    this.subscription.add(this.libraryCssDataService.getLibraryItems(path)
      .subscribe(libraryItems => {
        this.libraryItems = this.libraryMenuService.addItemId(libraryItems);
        this.libraryMenuLevel2Items = this.libraryMenuService.getLevel2MenuItems(this.libraryItems);
        this.libraryMenuLevel2Categories = this.libraryMenuService.getLevel2MenuItemsByCategory(this.libraryItems);
        this.libraryItemsLoaded = true;
      },
      error => this.getErrorMessage(error)));
  }

  private getErrorMessage(error: object) {
    console.log(error);
  }

}

