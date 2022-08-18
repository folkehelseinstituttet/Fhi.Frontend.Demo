import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from 'src/app/services/url.service';
import { DeveloperDataService } from './developer-data.service';

import { LibraryItem } from '../shared/library/models/library-item.model';
import { MenuItem } from 'src/app/models/menu-item.model';
import { DeveloperMenuData } from './developer-menu-data';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html'
})
export class DeveloperComponent implements OnInit {

  libraryItems!: LibraryItem[];
  libraryItemsLoaded = false;
  topLevelMenuItems: MenuItem[] = DeveloperMenuData.menutems;
  secondLevelMenuItems!: MenuItem[];

  private subscription: Subscription = new Subscription();

  constructor(
    private urlService: UrlService,
    private developerDataService: DeveloperDataService
  ) { }

  ngOnInit() {
    this.subscription.add(this.urlService.URL$
      .subscribe(() => {
        if (this.urlService.getFragment() === null) {
          const currentTopLevelSegementPath = this.urlService.getCurrentSegmentPath();
          this.getLibraryItems(currentTopLevelSegementPath);
        }
      }));
  }

  private getLibraryItems(path: string) {
    this.libraryItemsLoaded = false;
    this.subscription.add(this.developerDataService.getLibraryItems(path)
      .subscribe(libraryItems => {
        console.log('libraryItems', libraryItems);
      },
      error => this.getErrorMessage(error)));
  }

  private getErrorMessage(error: object) {
    console.log(error);
  }

}
