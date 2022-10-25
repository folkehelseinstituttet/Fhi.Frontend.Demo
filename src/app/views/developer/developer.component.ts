import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from '../../services/url.service';
import { LibraryMenuService } from '../shared/services/library-menu.service';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html'
})
export class DeveloperComponent implements OnInit, OnDestroy {

  topLevelMenuItems!: MenuItem[];
  secondLevelMenuItems!: MenuItem[];
  isDebugging = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private urlService: UrlService,
    private libraryMenuService: LibraryMenuService
  ) { }

  ngOnInit() {
    if (this.urlService.getSegmentPath(1) === 'debug') {
      this.isDebugging = true;
    }
    this.topLevelMenuItems = this.libraryMenuService.getTopLevelMenuItems();
    this.subscription.add(this.urlService.URL$
      .subscribe(() => {
        if (!this.isDebugging && this.libraryMenuService.updateSecondLevelMenu()) {
          this.secondLevelMenuItems = this.libraryMenuService.getSecondLevelMenuItems();
        }
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
