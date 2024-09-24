import { Injectable } from '@angular/core';

import { FhiTreeViewNavigationItem } from '@folkehelseinstituttet/angular-components';

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
  constructor(private urlService: UrlService) {}

  getTopLevelMenuItems(): MenuItem[] {
    const currentSegmentPath0 = this.urlService.getSegmentPath(0);
    return [
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
      return true;
    }
    return false;
  }

  getSecondLevelMenuItems(libraryItemGroups: LibraryItemGroupsShared): FhiTreeViewNavigationItem[] {
    const menu: FhiTreeViewNavigationItem[] = [];
    Object.keys(libraryItemGroups).forEach((key) => {
      if (libraryItemGroups[key].parentUrlSegment === this.urlService.getSegmentPath(1)) {
        menu.push({
          name: libraryItemGroups[key].title,
          routerLink: libraryItemGroups[key].id,
          // titleLang: libraryItemGroups[key].titleLang,
        });
      }
    });
    return menu;
  }
}
