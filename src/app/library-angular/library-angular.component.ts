import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from 'src/app/_felles/services/url-service/url.service';
import { UrlUtilitiesService } from 'src/app/_felles/services/url-service/url-utilities.service';
import { UrlPaths } from 'src/app/_felles/konstanter/url-paths';
import { LibraryAngularDataService } from './library-angular-data.service';
import { LibraryMenuService } from '../_felles/services/library-menu.service';
import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryAngularMenu } from './konstanter/library-angular-menu';
import { LibraryMenuLevel2Item } from '../shared/models/library-menu-level-2-item.model';
import { LibraryMenuLevel2Category } from '../shared/models/library-menu-level-2-category.model';

@Component({
  selector: 'app-library-angular',
  templateUrl: './library-angular.component.html'
})
export class LibraryAngularComponent implements OnInit, OnDestroy {

  constructor(
    private urlService: UrlService,
    private urlUtilities: UrlUtilitiesService,
    private libraryAngularDataService: LibraryAngularDataService,
    private libraryMenuService: LibraryMenuService
  ) { }

  private subscription: Subscription = new Subscription();

  urlPaths = UrlPaths;
  libraryExamples: LibraryExample[];
  libraryExamplesLoaded = false;
  libraryMenuLevel1Items = LibraryAngularMenu.level1Items;
  libraryMenuLevel2Items: LibraryMenuLevel2Item[];
  libraryMenuLevel2Categories: LibraryMenuLevel2Category[];
  currentLibraryMenuLevel1Path: string;

  ngOnInit() {
    this.currentLibraryMenuLevel1Path = this.urlUtilities.getCurrentSegmentPath();
    this.getLibraryExamples(this.currentLibraryMenuLevel1Path);

    this.subscription.add(this.urlService.urlTree$
      .subscribe(() => {
        if (this.urlUtilities.getFragment() === null) {
          this.currentLibraryMenuLevel1Path = this.urlUtilities.getCurrentSegmentPath();
          this.getLibraryExamples(this.currentLibraryMenuLevel1Path);
        }
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getLibraryExamples(path: string): void {
    this.libraryExamplesLoaded = false;
    this.subscription.add(this.libraryAngularDataService.getLibraryExamples(path)
      .subscribe(libraryExamples => {
        this.libraryExamples = this.libraryMenuService.addItemId(libraryExamples);
        this.libraryMenuLevel2Items = this.libraryMenuService.getLevel2MenuItems(this.libraryExamples);
        this.libraryMenuLevel2Categories = this.libraryMenuService.getLevel2MenuItemsByCategory(this.libraryExamples);
        this.libraryExamplesLoaded = true;
      },
      error => this.getErrorMessage(error)));
  }

  private getErrorMessage(error: object): void {
    console.log(error);
  }

}
