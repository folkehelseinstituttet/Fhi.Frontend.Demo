import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BrowserViewportService } from 'src/app/services/browser-viewport.service';
import { MenuItem } from 'src/app/models/menu-item.model';

@Component({
  selector: 'app-library-top-level-menu',
  templateUrl: './library-top-level-menu.component.html',
})
export class LibraryTopLevelMenuComponent implements OnInit, OnDestroy {
  @Input() menuItems: MenuItem[];

  isMobile: boolean;

  private subscription = new Subscription();

  constructor(private browserViewportService: BrowserViewportService) {}

  ngOnInit() {
    this.subscription.add(
      this.browserViewportService.isMobile$.subscribe((isMobile) => {
        this.isMobile = isMobile;
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
