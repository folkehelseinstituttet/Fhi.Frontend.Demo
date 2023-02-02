import { Injectable } from '@angular/core';

import { LibraryItemSegmentPaths } from 'src/MOCK_DB_DATA/library-items/library-item-segment-paths';

import { UrlService } from 'src/app/services/url.service';
import { SegmentPaths } from 'src/app/segment-paths';
import { MenuItem } from 'src/app/models/menu-item.model';

const TopLevelMenuItemNames = {
  visualIdentity: 'Visuell identitet',
  components: 'Komponenter',
  modules: 'Moduler',
  layoutAndPageTemplates: 'Layout og sidemaler',
  prototypes: 'Eksempler på bruk',
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
    }, {
      name: TopLevelMenuItemNames.layoutAndPageTemplates,
      link: `/${currentSegmentPath0}/${SegmentPaths.layoutAndPageTemplates}`
    }, {
      name: TopLevelMenuItemNames.prototypes,
      link: `/${currentSegmentPath0}/${SegmentPaths.prototypes}`
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

      case TopLevelMenuItemNames.layoutAndPageTemplates:
        return this.getLayoutAndPageTemplatesMenu();

      case TopLevelMenuItemNames.prototypes:
        return this.getPrototypesMenu();
    }
  }

  private getCurrentTopLevelMenuItem(): MenuItem {
    const topLevelMenuItem = this.topLevelMenuItems.find((item) => {
      return item.link.split('/')[2] === this.urlService.getSegmentPath(1);
    });
    if (topLevelMenuItem !== undefined) {
      return topLevelMenuItem;
    }
    console.error('Current path is not matching any menu items.')
  }

  private getVisualIdentityMenu(): MenuItem[] {
    return [{
      name: 'Farger',
      link: LibraryItemSegmentPaths.color
    }, {
      name: 'Ikonsett',
      link: LibraryItemSegmentPaths.icons
    }, {
      name: 'Typografi',
      link: LibraryItemSegmentPaths.typography
    }];
  }

  private getComponentsMenu(): MenuItem[] {
    return [{
      name: 'Accordions',
      link: LibraryItemSegmentPaths.accordion
    }, {
      name: 'Advanced select',
      link: LibraryItemSegmentPaths.advancedSelect
    }, {
      name: 'Alerts',
      link: LibraryItemSegmentPaths.alerts
    }, {
      name: 'Badge',
      link: LibraryItemSegmentPaths.badge
    }, {
      name: 'Breadcrumb',
      link: LibraryItemSegmentPaths.breadcrumb
    }, {
      name: 'Button group',
      link: LibraryItemSegmentPaths.buttongroup
    }, {
      name: 'Buttons',
      link: LibraryItemSegmentPaths.buttons
    }, {
      name: 'Datepicker',
      link: LibraryItemSegmentPaths.datepicker
    }, {
      name: 'Forms',
      link: LibraryItemSegmentPaths.forms
    }, {
      name: 'Modal',
      link: LibraryItemSegmentPaths.modal
    }, {
      name: 'Navigation tile',
      link: LibraryItemSegmentPaths.navigationtile
    }, {
      name: 'Pagination',
      link: LibraryItemSegmentPaths.pagination
    }, {
      name: 'Search',
      link: LibraryItemSegmentPaths.search
    }, {
      name: 'Spinners',
      link: LibraryItemSegmentPaths.spinners
    }, {
      name: 'Tables',
      link: LibraryItemSegmentPaths.table
    }, {
      name: 'Tabs',
      link: LibraryItemSegmentPaths.tabs
    }, {
      name: 'Tags',
      link: LibraryItemSegmentPaths.tags
    }, {
      name: 'Toast',
      link: LibraryItemSegmentPaths.toast
    }, {
      name: 'Tooltip',
      link: LibraryItemSegmentPaths.tooltip
    }]
  }

  private getModulesMenu(): MenuItem[] {
    return [{
      name: 'Date and time selection',
      link: LibraryItemSegmentPaths.dateandtimeselection
    }, {
      name: 'Drawer',
      link: LibraryItemSegmentPaths.drawer
    }, {
      name: 'Global footer',
      link: LibraryItemSegmentPaths.globalfooter
    }, {
      name: 'Global header',
      link: LibraryItemSegmentPaths.globalheader
    }, {
      name: 'Treeview builder',
      link: LibraryItemSegmentPaths.treeview
    }];
  }

  private getLayoutAndPageTemplatesMenu(): MenuItem[] {
    return [{
      name: 'Layout',
      link: LibraryItemSegmentPaths.layoutandpagetemplates
    }];
  }

  private getPrototypesMenu(): MenuItem[] {
    return [{
      name: 'Global Header',
      link: LibraryItemSegmentPaths.prototypepageheader
    }, {
      name: 'Forms',
      link: LibraryItemSegmentPaths.prototypeforms
    }, {
      name: 'Tables',
      link: LibraryItemSegmentPaths.prototypetablewithexpandablecontent
    }];
  }

}
