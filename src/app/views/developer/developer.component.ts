import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { FhiTreeViewNavigationItem } from '@folkehelseinstituttet/angular-components';

import { UrlService } from '../../services/url.service';
import { MenuItem } from '../../models/menu-item.model';
import { LibraryMenuService } from '../shared/services/library-menu.service';
import { LibraryItemGroupsShared } from '../shared/models/library-item.model';
import { LibraryItemsDataService } from '../shared/services/library-items-data.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
})
export class DeveloperComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  topLevelMenuItems!: MenuItem[];
  secondLevelMenuItems!: Array<FhiTreeViewNavigationItem>;
  isDebugging = false;
  libraryItemGroupsShared!: LibraryItemGroupsShared;
  dataIsLoaded = false;

  constructor(
    private urlService: UrlService,
    private libraryMenuService: LibraryMenuService,
    private libraryItemsDataService: LibraryItemsDataService,
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.urlService.URL$.pipe(
        tap(() => (this.dataIsLoaded = false)),
        mergeMap(() => this.libraryItemsDataService.getLibraryItemGroupsShared()),
      ).subscribe({
        next: (libraryItemGroupsShared) => {
          this.topLevelMenuItems = this.libraryMenuService.getTopLevelMenuItems();
          this.isDebugging = this.urlService.getSegmentPath(1) === 'debug';
          if (!this.isDebugging && this.libraryMenuService.updateSecondLevelMenu()) {
            this.secondLevelMenuItems =
              this.libraryMenuService.getSecondLevelMenuItems(libraryItemGroupsShared);
          }
          this.dataIsLoaded = true;
        },
        error: (error) => console.log(error),
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
