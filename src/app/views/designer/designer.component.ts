import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from '../../services/url.service';
import { LibraryMenuService } from '../shared/services/library-menu.service';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
})
export class DesignerComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  topLevelMenuItems!: MenuItem[];
  secondLevelMenuItems!: MenuItem[];

  constructor(
    private urlService: UrlService,
    private libraryMenuService: LibraryMenuService,
  ) {}

  ngOnInit() {
    this.topLevelMenuItems = this.libraryMenuService.getTopLevelMenuItems();
    this.subscription.add(
      this.urlService.URL$.subscribe(() => {
        if (this.libraryMenuService.updateSecondLevelMenu()) {
          // console.log(this.secondLevelMenuItems = this.libraryMenuService.getSecondLevelMenuItems());
          // this.secondLevelMenuItems = this.libraryMenuService.getSecondLevelMenuItems();
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
