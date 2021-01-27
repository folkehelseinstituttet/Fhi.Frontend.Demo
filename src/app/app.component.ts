import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { faInfoCircle } from '@fortawesome/pro-regular-svg-icons';

import { BrowserViewportService } from './_felles/services/browser-viewport.service';
import { UrlService } from './_felles/services/url.service';


import { faArrowCircleUp } from '@fortawesome/pro-light-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  private subscription = new Subscription();

  faInfoCircle = faInfoCircle;
  prosjektnavn = 'Frontend-bibliotek';
  prosjektbeskrivelse = 'Gjenbrukbar CSS og Angular-kode';
  isMobile: boolean;


  faArrowCircleUp = faArrowCircleUp;


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
        this.urlService.updateAfterNavigationEnd(this.router.parseUrl(event.urlAfterRedirects));
      });

    this.router.events
      .pipe(filter(event => event instanceof Scroll))
      .subscribe((event: Scroll) => {
        if (event.anchor) {
          this.viewportScroller.scrollToAnchor(event.anchor);
        }
      });

    this.browserViewportService.updateResponsiveProperties();
    fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => {
        this.browserViewportService.updateResponsiveProperties();
      });

    this.subscription.add(this.browserViewportService.isMobile$
      .subscribe(isMobile => {
        this.isMobile = isMobile;
      }));
  }

}
