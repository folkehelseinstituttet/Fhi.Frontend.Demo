import { MenuNames } from '../../_common/constants/menu-names';
import { UrlPaths } from '../../_common/constants/url-paths';

import { LibraryMenuLevel1Item } from '../../shared/models/library-menu-level-1-item.model';

export class LibraryCssMenu {
  static level1Items: LibraryMenuLevel1Item[] = [{
  //   name: MenuNames.cssLibraryPageTemplates,
  //   routerLink: `/${UrlPaths.cssLibrary}/${UrlPaths.cssLibraryPageTemplates}`
  // }, {
  //   name: MenuNames.cssLibraryModules,
  //   routerLink: `/${UrlPaths.cssLibrary}/${UrlPaths.cssLibraryModules}`
  // }, {
    name: MenuNames.cssLibraryComponents,
    routerLink: `/${UrlPaths.cssLibrary}/${UrlPaths.cssLibraryComponents}`
  }, {
  //   name: MenuNames.cssLibraryUtilityClasses,
  //   routerLink: `/${UrlPaths.cssLibrary}/${UrlPaths.cssLibraryUtilityClasses}`
  // }, {
    name: MenuNames.cssLibraryColorsFonts,
    routerLink: `/${UrlPaths.cssLibrary}/${UrlPaths.cssLibraryColorsFonts}`
  // }, {
  //   name: MenuNames.cssLibraryIcons,
  //   routerLink: `/${UrlPaths.cssLibrary}/${UrlPaths.cssLibraryIcons}`
  }];
}
