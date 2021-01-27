import { MenuNames } from '../../_felles/konstanter/menu-names';
import { UrlPaths } from '../../_felles/konstanter/url-paths';

import { LibraryMenuLevel1Item } from '../../shared/models/library-menu-level-1-item.model';

export class LibraryCssMenu {
  static level1Items: LibraryMenuLevel1Item[] = [{
  //   name: MenuNames.cssBibliotekSidemaler,
  //   routerLink: `/${UrlPaths.cssBibliotek}/${UrlPaths.cssBibliotekSidemaler}`
  // }, {
  //   name: MenuNames.cssBibliotekModuler,
  //   routerLink: `/${UrlPaths.cssBibliotek}/${UrlPaths.cssBibliotekModuler}`
  // }, {
    name: MenuNames.cssBibliotekKomponenter,
    routerLink: `/${UrlPaths.cssBibliotek}/${UrlPaths.cssBibliotekKomponenter}`
  }, {
  //   name: MenuNames.cssBibliotekHjelpeklasser,
  //   routerLink: `/${UrlPaths.cssBibliotek}/${UrlPaths.cssBibliotekHjelpeklasser}`
  // }, {
    name: MenuNames.cssBibliotekFargerSkrift,
    routerLink: `/${UrlPaths.cssBibliotek}/${UrlPaths.cssBibliotekFargerSkrift}`
  // }, {
  //   name: MenuNames.cssBibliotekIkoner,
  //   routerLink: `/${UrlPaths.cssBibliotek}/${UrlPaths.cssBibliotekIkoner}`
  }];
}
