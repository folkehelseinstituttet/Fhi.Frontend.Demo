import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from '../../services/url.service';
import { UrlPaths } from '../../url-paths';

import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html'
})
export class DeveloperComponent implements OnInit {

  topLevelMenuItems!: MenuItem[];
  currentTopLevelMenuItem!: MenuItem;
  secondLevelMenuItems!: MenuItem[];

  private subscription: Subscription = new Subscription();

  constructor(
    private urlService: UrlService,
  ) { }

  ngOnInit() {
    this.topLevelMenuItems = this.getTopLevelMenuItems();
    this.subscription.add(this.urlService.URL$
      .subscribe(() => {
        const previousSegmentPath1 = this.urlService.getPreviousSegmentPath(1);
        const currentSegmentPath1 = this.urlService.getSegmentPath(1);

        if (previousSegmentPath1 === undefined || previousSegmentPath1 !== currentSegmentPath1) {
          this.currentTopLevelMenuItem = this.getCurrentTopLevelMenuItem();
          this.secondLevelMenuItems = this.getSecondLevelMenuItems();
        }
      }));
  }

  private getCurrentTopLevelMenuItem(): MenuItem {
    const topLevelMenuItem = this.topLevelMenuItems.find((item) => {
      return item.name.toLocaleLowerCase() === this.urlService.getSegmentPath(1)
    });
    if (topLevelMenuItem !== undefined) {
      return topLevelMenuItem;
    }
    console.info('Current path givs no match for existing menu items.')
  }

  private getTopLevelMenuItems(): MenuItem[] {
    return [{
      name: 'Components',
      link: `/${UrlPaths.developer}/${UrlPaths.components}`
    }, {
      name: 'Modules',
      link: `/${UrlPaths.developer}/${UrlPaths.modules}`
    }, {
      name: 'Page templates',
      link: `/${UrlPaths.developer}/${UrlPaths.pageTemplates}`
    }, {
      name: '...and some more stuff',
      link: `/${UrlPaths.developer}/${UrlPaths.stuff}`
    }];
  }

  private getSecondLevelMenuItems(): MenuItem[] {
    switch (this.currentTopLevelMenuItem.name) {
      case 'Components':
        return [{
          name: 'Accordion',
          link: 'accordion'
        }, {
          name: 'Table',
          link: 'table'
        }]
      case 'Modules':
        return [{
          name: 'Accordion (dummy)',
          link: 'accordion'
        }, {
          name: 'Table (dummy)',
          link: 'table'
        }]
    }
  }

}
