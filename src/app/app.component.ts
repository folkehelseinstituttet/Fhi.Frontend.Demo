import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

import { BrowserViewportService } from './services/browser-viewport.service';
import { UrlService } from './services/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  projectName = 'Frontend library';
  projectDescription = 'Reusable CSS';

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private browserViewportService: BrowserViewportService,
    private urlService: UrlService
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.urlService.updateOnNavigationEnd(event);
      });

    this.router.events
      .pipe(filter(event => event instanceof Scroll))
      .subscribe((event: Scroll) => {
        if (event.anchor) {
          this.viewportScroller.scrollToAnchor(event.anchor);
        }
      });

    this.browserViewportService.initResponsiveProperties();
    fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => {
        this.browserViewportService.updateResponsiveProperties();
      });
  }

}
