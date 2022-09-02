import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from '../../services/url.service';
import { SegmentPaths } from '../../segment-paths';

import { MenuItem } from '../../models/menu-item.model';

const TopLevelMenuItemName = {
  components: 'Components',
  colorsAndFonts: 'Colors, Fonts',
  icons: 'Icons'
};

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
      return item.link.split('/')[2] === this.urlService.getSegmentPath(1)
    });
    if (topLevelMenuItem !== undefined) {
      return topLevelMenuItem;
    }
    console.error('Current path is not matching any menu items.')
  }

  private getTopLevelMenuItems(): MenuItem[] {
    return [{
      name: TopLevelMenuItemName.components,
      link: `/${SegmentPaths.developer}/${SegmentPaths.components}`
    }, {
      name: TopLevelMenuItemName.colorsAndFonts,
      link: `/${SegmentPaths.developer}/${SegmentPaths.colorsAndFonts}`
    }, {
      name: TopLevelMenuItemName.icons,
      link: `/${SegmentPaths.developer}/${SegmentPaths.iconsDeprecated}`
    }];
  }

  private getSecondLevelMenuItems(): MenuItem[] {
    if (this.currentTopLevelMenuItem === undefined) {
      return;
    }
    switch (this.currentTopLevelMenuItem.name) {
      case TopLevelMenuItemName.components:
        return this.getComponensMenu();

      case TopLevelMenuItemName.colorsAndFonts:
        return this.getColorsAndFontsMenu();

      case TopLevelMenuItemName.icons:
        return this.getIconsMenu();
    }
  }

  private getComponensMenu(): MenuItem[] {
    return [{
      name: 'Accordions',
      link: SegmentPaths.accordion
    }, {
      name: 'Alerts',
      link: SegmentPaths.alerts
    }, {
      name: 'Badge',
      link: SegmentPaths.badge
    }, {
      name: 'Buttons',
      link: SegmentPaths.buttons
    }, {
      name: 'Forms',
      link: SegmentPaths.forms
    }, {
      name: 'Modal',
      link: SegmentPaths.modal
    }, {
      name: 'Pagination',
      link: SegmentPaths.pagination
    }, {
      name: 'Tables',
      link: SegmentPaths.table
    }, {
      name: 'Toast',
      link: SegmentPaths.toast
    }, {
      name: 'Tooltip',
      link: SegmentPaths.tooltip
    }]
  }

  private getColorsAndFontsMenu(): MenuItem[] {
    return [{
      name: 'Color',
      link: SegmentPaths.color
    }, {
      name: 'Typography',
      link: SegmentPaths.typography
    }];
  }

  private getIconsMenu(): MenuItem[] {
    return [{
      name: 'Icon set',
      link: SegmentPaths.icons
    }];
  }

}
