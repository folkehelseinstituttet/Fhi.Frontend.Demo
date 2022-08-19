import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from '../../services/url.service';
import { DeveloperDataService } from './developer-data.service';
import { SecondLevelMenuService } from '../shared/second-level-menu.service';
import { LibraryItemIdService } from '../shared/library-item-id.service';
import { UrlPaths } from '../../url-paths';

import { LibraryItem } from '../shared/library/models/library-item.model';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html'
})
export class DeveloperComponent implements OnInit {

  libraryItems!: LibraryItem[];
  libraryItemsLoaded = false;
  topLevelMenuItems!: MenuItem[];
  secondLevelMenuItems!: MenuItem[];

  private subscription: Subscription = new Subscription();

  constructor(
    private urlService: UrlService,
    private developerDataService: DeveloperDataService,
    private secondLevelMenuService: SecondLevelMenuService,
    private libraryItemIdService: LibraryItemIdService
  ) { }

  ngOnInit() {
    this.topLevelMenuItems = this.getTopLevelMenuItems();
    this.subscription.add(this.urlService.URL$
      .subscribe(() => {
        if (!this.libraryItemsLoaded || this.urlService.getFragment() === null) {
          const currentTopLevelSegementPath = this.urlService.getCurrentSegmentPath();
          this.getLibraryItems(currentTopLevelSegementPath);
        }
      }));
  }

  private getLibraryItems(path: string) {
    this.libraryItemsLoaded = false;
    this.subscription.add(this.developerDataService.getLibraryItems(path)
      .subscribe(libraryItemsWithoutId => {
        this.libraryItems = this.libraryItemIdService.addItemId(libraryItemsWithoutId);
        this.secondLevelMenuItems = this.secondLevelMenuService.getSecondLevelMenuItems(this.libraryItems);
        this.libraryItemsLoaded = true;
      },
      error => this.getErrorMessage(error)));
  }

  private getErrorMessage(error: object) {
    console.log(error);
  }

  private getTopLevelMenuItems(): MenuItem[] {
    return [{
      name: 'Components',
      link: `/${UrlPaths.developer}/${UrlPaths.components}`
    }, {
      name: 'Colors, fonts',
      link: `/${UrlPaths.developer}/${UrlPaths.colorsAndFonts}`
    }, {
      name: 'Icons',
      link: `/${UrlPaths.developer}/${UrlPaths.icons}`
    // }, {
    //   name: 'Typography',
    //   link: `/${UrlPaths.developer}/${UrlPaths.typography}`
    // }, {
    //   name: 'Colors',
    //   link: `/${UrlPaths.developer}/${UrlPaths.colors}`
    }];
  }

}
