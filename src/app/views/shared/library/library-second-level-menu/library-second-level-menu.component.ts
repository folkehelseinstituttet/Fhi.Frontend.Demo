import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LibrarySecondLevelMenuDataService } from './library-second-level-menu-data.service';

import { MenuItem } from 'src/app/models/menu-item.model';
import { LibraryItemFilter } from '../models/library-item-filter.model';

@Component({
  selector: 'app-library-second-level-menu',
  templateUrl: './library-second-level-menu.component.html'
})
export class LibrarySecondLevelMenuComponent implements OnInit {

  menuItems!: MenuItem[];
  menuItemsLoaded = false;
  activeNavTab = 0;
  libraryItemFilter: LibraryItemFilter = { name: '' };

  private subscription: Subscription = new Subscription();

  constructor(
    private menuDataService: LibrarySecondLevelMenuDataService
  ) { }

  ngOnInit() {
    this.subscription.add(this.menuDataService.getMenuItems()
      .subscribe(menuItems => {
        this.menuItems = menuItems;
        this.menuItemsLoaded = true;
      },
      error => this.getErrorMessage(error)));
  }

  private getErrorMessage(error: object) {
    console.log(error);
  }

}
