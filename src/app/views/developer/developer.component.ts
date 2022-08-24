import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from '../../services/url.service';
import { SegmentPaths } from '../../segment-paths';

import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html'
})
export class DeveloperComponent implements OnInit, OnDestroy {

  topLevelMenuItems!: MenuItem[];
  currentTopLevelMenuItem!: MenuItem;
  secondLevelMenuItems!: MenuItem[];

  private subscription: Subscription = new Subscription();

  constructor(private urlService: UrlService) { }

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
      link: `/${SegmentPaths.developer}/${SegmentPaths.components}`
    }, {
      name: 'Modules',
      link: `/${SegmentPaths.developer}/${SegmentPaths.modules}`
    }, {
      name: 'Page templates',
      link: `/${SegmentPaths.developer}/${SegmentPaths.pageTemplates}`
    }, {
      name: '...and some more stuff',
      link: `/${SegmentPaths.developer}/${SegmentPaths.stuff}`
    }];
  }

  private getSecondLevelMenuItems(): MenuItem[] {
    switch (this.currentTopLevelMenuItem.name) {
      case 'Components':
        return this.getComponensMenu();
      case 'Modules':
        return this.getModulesMenu();
    }
  }

  private getComponensMenu(): MenuItem[] {
    return [{
      name: 'Accordion',
      link: 'accordion'
    }, {
      name: 'Table',
      link: 'table'
    }]
  }

  private getModulesMenu(): MenuItem[] {
    return [{
      name: 'Accordion (dummy)',
      link: 'accordion'
    }, {
      name: 'Table (dummy)',
      link: 'table'
    }];
  }

}
