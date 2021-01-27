import { MenuNames } from '../../_felles/konstanter/menu-names';
import { UrlPaths } from '../../_felles/konstanter/url-paths';

import { LibraryMenuLevel1Item } from '../../shared/models/library-menu-level-1-item.model';

export class LibraryAngularMenu {
  static level1Items: LibraryMenuLevel1Item[] = [{
    name: MenuNames.angularBibliotekSharedComponents,
    routerLink: `/${UrlPaths.angularBibliotek}/${UrlPaths.angularBibliotekSharedComponents}`
  }];
}
