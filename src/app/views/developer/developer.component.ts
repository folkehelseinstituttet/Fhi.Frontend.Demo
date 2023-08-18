import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { UrlService } from '../../services/url.service';
import { LibraryMenuService } from '../shared/services/library-menu.service';
import { MenuItem } from '../../models/menu-item.model';
import { LibraryItemGroupsSharedDataService } from '../shared/services/library-item-groups-shared-data.service';
import { LibraryItemGroupsShared } from '../shared/models/library-item.model';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html'
})
export class DeveloperComponent implements OnInit, OnDestroy {

  topLevelMenuItems!: MenuItem[];
  secondLevelMenuItems!: MenuItem[];
  isDebugging = false;
  libraryItemGroupsShared!: LibraryItemGroupsShared;

  private subscription: Subscription = new Subscription();

  constructor(
    private urlService: UrlService,
    private libraryMenuService: LibraryMenuService,
    private libraryItemGroupsSharedDataService: LibraryItemGroupsSharedDataService
  ) { }

  ngOnInit() {
    this.topLevelMenuItems = this.libraryMenuService.getTopLevelMenuItems();
    this.subscription.add(this.urlService.URL$.pipe(mergeMap(
      () => this.libraryItemGroupsSharedDataService.getLibraryItemGroupsShared()
    )).subscribe({
        next: libraryItemGroupsShared => {
          this.isDebugging = (this.urlService.getSegmentPath(1) === 'debug') ? true : false;
          if (!this.isDebugging && this.libraryMenuService.updateSecondLevelMenu()) {
            this.secondLevelMenuItems = this.libraryMenuService.getSecondLevelMenuItems(libraryItemGroupsShared);
          }
        },
        error: error => console.log(error)
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
