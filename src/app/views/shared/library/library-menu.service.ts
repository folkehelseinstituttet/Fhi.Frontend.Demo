import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { UrlService } from 'src/app/services/url.service';
import { MenuItem } from 'src/app/models/menu-item.model';
import { SegmentPaths } from 'src/app/segment-paths';

const TopLevelMenuItemName = {
  components: 'Components',
  colorsAndFonts: 'Colors, Fonts',
  icons: 'Icons'
};

@Injectable({
  providedIn: 'root'
})
export class LibraryMenuService {

  constructor(private urlService: UrlService) { }

  // private urlSubject = new ReplaySubject<void>(1);

  topLevelMenuItems!: MenuItem[];

  private currentTopLevelMenuItem!: MenuItem;

  getTopLevelMenuItems(): MenuItem[] {
    const currentSegmentPath0 = this.urlService.getSegmentPath(0);
    this.topLevelMenuItems = [{
      name: TopLevelMenuItemName.components,
      link: `/${currentSegmentPath0}/${SegmentPaths.components}`
    }, {
      name: TopLevelMenuItemName.colorsAndFonts,
      link: `/${currentSegmentPath0}/${SegmentPaths.colorsAndFonts}`
    }, {
      name: TopLevelMenuItemName.icons,
      link: `/${currentSegmentPath0}/${SegmentPaths.iconsDeprecated}`
    }];
    return this.topLevelMenuItems;
  }

  updateSecondLevelMenu(): boolean {
    const previousSegmentPath0 = this.urlService.getPreviousSegmentPath(0);
    const previousSegmentPath1 = this.urlService.getPreviousSegmentPath(1);
    const currentSegmentPath0 = this.urlService.getSegmentPath(0);
    const currentSegmentPath1 = this.urlService.getSegmentPath(1);

    if (previousSegmentPath0 !== currentSegmentPath0 || previousSegmentPath1 !== currentSegmentPath1) {
      this.currentTopLevelMenuItem = this.getCurrentTopLevelMenuItem();
      return true;
    }
    return false;
  }

  getSecondLevelMenuItems(): MenuItem[] {
    if (this.currentTopLevelMenuItem === undefined) {
      return;
    }
    switch (this.currentTopLevelMenuItem.name) {
      case TopLevelMenuItemName.components:
        return this.getComponentsMenu();

      case TopLevelMenuItemName.colorsAndFonts:
        return this.getColorsAndFontsMenu();

      case TopLevelMenuItemName.icons:
        return this.getIconsMenu();
    }
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

  private getComponentsMenu(): MenuItem[] {
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
      name: 'Search',
      link: SegmentPaths.search
    }, {
      name: 'Tables',
      link: SegmentPaths.table
    }, {
      name: 'Tags',
      link: SegmentPaths.tags
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
