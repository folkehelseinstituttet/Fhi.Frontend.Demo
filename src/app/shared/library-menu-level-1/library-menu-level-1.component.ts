import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BrowserViewportService } from 'src/app/services/browser-viewport.service';
import { LibraryMenuLevel1Item } from '../models/library-menu-level-1-item.model';

@Component({
  selector: 'app-library-menu-level-1',
  templateUrl: './library-menu-level-1.component.html'
})
export class LibraryMenuLevel1Component implements OnInit {

  private subscription = new Subscription();

  constructor(private browserViewportService: BrowserViewportService) { }

  isMobile: boolean;

  @Input() menuItems: LibraryMenuLevel1Item[];

  ngOnInit() {
    this.subscription.add(this.browserViewportService.isMobile$
      .subscribe(isMobile => {
        this.isMobile = isMobile;
      }));
  }
}
