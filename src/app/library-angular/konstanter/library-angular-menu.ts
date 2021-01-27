import { MenuNames } from '../../_felles/konstanter/menu-names';
import { UrlPaths } from '../../_felles/konstanter/url-paths';

import { LibraryMenuLevel1Item } from '../../shared/models/library-menu-level-1-item.model';

export class LibraryAngularMenu {
  static level1Items: LibraryMenuLevel1Item[] = [{
    name: MenuNames.angularBibliotekNgBootstrap,
    routerLink: `/${UrlPaths.angularBibliotek}/${UrlPaths.angularBibliotekNgBootstrap}`
  }, {
    name: MenuNames.angularBibliotekFontAwesome,
    routerLink: `/${UrlPaths.angularBibliotek}/${UrlPaths.angularBibliotekFontAwesome}`
  // }, {
  //   name: MenuNames.angularBibliotekSharedComponents,
  //   routerLink: `/${UrlPaths.angularBibliotek}/${UrlPaths.angularBibliotekSharedComponents}`
  // }, {
  //   name: MenuNames.angularBibliotekReactiveForms,
  //   routerLink: `/${UrlPaths.angularBibliotek}/${UrlPaths.angularBibliotekReactiveForms}`
  }];
}
