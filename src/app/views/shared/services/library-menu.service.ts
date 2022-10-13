import { Injectable } from '@angular/core';

import { UrlService } from 'src/app/services/url.service';
import { SegmentPaths } from 'src/app/segment-path';
import { MenuItem } from 'src/app/models/menu-item.model';

const TopLevelMenuItemNames = {
  visualIdentity: 'Visuell identitet',
  components: 'Komponenter',
  modules: 'Moduler'
};

@Injectable({
  providedIn: 'root'
})
export class LibraryMenuService {

  topLevelMenuItems!: MenuItem[];

  private currentTopLevelMenuItem!: MenuItem;

  constructor(private urlService: UrlService) { }

  getTopLevelMenuItems(): MenuItem[] {
    const currentSegmentPath0 = this.urlService.getSegmentPath(0);
    this.topLevelMenuItems = [{
      name: TopLevelMenuItemNames.visualIdentity,
      link: `/${currentSegmentPath0}/${SegmentPaths.visualIdentity}`
    }, {
      name: TopLevelMenuItemNames.components,
      link: `/${currentSegmentPath0}/${SegmentPaths.components}`
    }, {
      name: TopLevelMenuItemNames.modules,
      link: `/${currentSegmentPath0}/${SegmentPaths.modules}`
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
      case TopLevelMenuItemNames.visualIdentity:
        return this.getVisualIdentityMenu();

      case TopLevelMenuItemNames.components:
        return this.getComponentsMenu();

      case TopLevelMenuItemNames.modules:
        return this.getModulesMenu();
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

  private getVisualIdentityMenu(): MenuItem[] {
    return [{
      name: 'Farger',
      link: SegmentPaths.color
    }, {
      name: 'Ikonsett',
      link: SegmentPaths.icons
    }, {
      name: 'Typografi',
      link: SegmentPaths.typography
    }];
  }

  private getComponentsMenu(): MenuItem[] {
    return [{
      name: 'Accordions',
      link: SegmentPaths.accordion
    }, {
      name: 'Advanced select',
      link: SegmentPaths.advancedSelect
    }, {
      name: 'Alerts',
      link: SegmentPaths.alerts
    }, {
      name: 'Badge',
      link: SegmentPaths.badge
    }, {
      name: 'Breadcrumb',
      link: SegmentPaths.breadcrumb
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
      name: 'Navigation tile',
      link: SegmentPaths.navigationtile
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
      name: 'Tabs',
      link: SegmentPaths.tabs
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

  private getModulesMenu(): MenuItem[] {
    return [{
      name: 'Global header',
      link: SegmentPaths.globalheader
    }];
  }

}
