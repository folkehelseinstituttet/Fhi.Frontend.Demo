import { UrlPaths } from '../../_common/constants/url-paths';

import { MenuItem } from 'src/app/models/menu-item.model';

export class MenuData {
  static menutems: MenuItem[] = [{
    name: 'Components',
    routerLink: `/${UrlPaths.developer}/${UrlPaths.components}`
  }, {
    name: 'Colors, fonts',
    routerLink: `/${UrlPaths.developer}/${UrlPaths.colorsAndFonts}`
  }, {
    name: 'Icons',
    routerLink: `/${UrlPaths.developer}/${UrlPaths.icons}`
  // }, {
  //   name: 'Typography',
  //   routerLink: `/${UrlPaths.developer}/${UrlPaths.typography}`
  // }, {
  //   name: 'Colors',
  //   routerLink: `/${UrlPaths.developer}/${UrlPaths.colors}`
  }];
}
