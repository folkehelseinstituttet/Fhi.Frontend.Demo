import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from '../_felles/services/url.service';
import { LibraryCssDataService } from './library-css-data.service';
import { LibraryMenuService } from '../_felles/services/library-menu.service';
import { LibraryExample } from '../shared/models/library-example.model';
import { LibraryCssMenu } from './konstanter/library-css-menu';
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

  libraryExamples: LibraryExample[];
  libraryExamplesLoaded = false;
  libraryMenuLevel1Items = LibraryCssMenu.level1Items;
  libraryMenuLevel2Items: LibraryMenuLevel2Item[];
  libraryMenuLevel2Categories: LibraryMenuLevel2Category[];
  currentLibraryMenuLevel1Path: string;

  ngOnInit() {
    this.currentLibraryMenuLevel1Path = this.urlService.urlSegmenter[1].path;
    this.getLibraryExamples(this.currentLibraryMenuLevel1Path);

    this.subscription.add(this.urlService.urlSegmenter$
      .subscribe(urlSegmenter => {
        if (this.urlService.urlFragment === undefined) {
          this.currentLibraryMenuLevel1Path = urlSegmenter[1].path;
          this.getLibraryExamples(this.currentLibraryMenuLevel1Path);
        }
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getLibraryExamples(path: string) {
    this.libraryExamplesLoaded = false;
    this.subscription.add(this.libraryCssDataService.getLibraryExamples(path)
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

