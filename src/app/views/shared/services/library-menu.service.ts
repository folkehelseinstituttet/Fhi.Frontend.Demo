import { Injectable } from '@angular/core';

import { LibraryItemSegmentPaths } from 'src/MOCK_DB_DATA/library-items/library-item-segment-paths';

import { UrlService } from 'src/app/services/url.service';
import { UrlSegment } from 'src/app/url-segment.constants';
import { MenuItem } from 'src/app/models/menu-item.model';
import { LibraryItemGroupsShared } from '../models/library-item.model';

const TopLevelMenuItemNames = {
  visualIdentity: 'Visuell identitet',
  components: 'Komponenter',
  layoutAndPageTemplates: 'Layout og sidemaler',
  prototypes: 'Eksempler på bruk',
};

@Injectable({
  providedIn: 'root',
})
export class LibraryMenuService {
  // TODO: try to remove this two properties when all item groups uses the new getSecondLevelMenuItems()
  private currentTopLevelMenuItem!: MenuItem;
  topLevelMenuItems!: MenuItem[];

  constructor(private urlService: UrlService) {}

  getTopLevelMenuItems(): MenuItem[] {
    const currentSegmentPath0 = this.urlService.getSegmentPath(0);
    this.topLevelMenuItems = [
      {
        name: TopLevelMenuItemNames.visualIdentity,
        link: `/${currentSegmentPath0}/${UrlSegment.visualIdentity}`,
      },
      {
        name: TopLevelMenuItemNames.components,
        link: `/${currentSegmentPath0}/${UrlSegment.components}`,
      },
      {
        name: TopLevelMenuItemNames.layoutAndPageTemplates,
        link: `/${currentSegmentPath0}/${UrlSegment.layoutAndPageTemplates}`,
      },
      {
        name: TopLevelMenuItemNames.prototypes,
        link: `/${currentSegmentPath0}/${UrlSegment.prototypes}`,
      },
    ];
    return this.topLevelMenuItems;
  }

  updateSecondLevelMenu(): boolean {
    const previousSegmentPath0 = this.urlService.getPreviousSegmentPath(0);
    const previousSegmentPath1 = this.urlService.getPreviousSegmentPath(1);
    const currentSegmentPath0 = this.urlService.getSegmentPath(0);
    const currentSegmentPath1 = this.urlService.getSegmentPath(1);

    if (
      previousSegmentPath0 !== currentSegmentPath0 ||
      previousSegmentPath1 !== currentSegmentPath1
    ) {
      this.currentTopLevelMenuItem = this.getCurrentTopLevelMenuItem();
      return true;
    }
    return false;
  }

  getSecondLevelMenuItems(libraryItemGroups: LibraryItemGroupsShared): MenuItem[] {
    const menu: MenuItem[] = [];
    Object.keys(libraryItemGroups).forEach((key) => {
      if (libraryItemGroups[key].parentUrlSegment === this.urlService.getSegmentPath(1)) {
        menu.push({
          name: libraryItemGroups[key].title,
          link: libraryItemGroups[key].id,
          titleLang: libraryItemGroups[key].titleLang,
        });
      }
    });
    return menu;
  }

  // TODO: all methods below can be removed when all item groups uses the new getSecondLevelMenuItems()

  getSecondLevelMenuItems_OLD(): MenuItem[] {
    if (this.currentTopLevelMenuItem === undefined) {
      return;
    }
    switch (this.currentTopLevelMenuItem.name) {
      case TopLevelMenuItemNames.visualIdentity:
        return this.getVisualIdentityMenu();

      case TopLevelMenuItemNames.components:
        return this.getComponentsMenu();

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
    console.error('Current path is not matching any menu items.');
  }

  private getVisualIdentityMenu(): MenuItem[] {
    return [];
  }

  private getComponentsMenu(): MenuItem[] {
    return [];
  }

  private getLayoutAndPageTemplatesMenu(): MenuItem[] {
    return [];
  }

  private getPrototypesMenu(): MenuItem[] {
    return [];
  }
}
