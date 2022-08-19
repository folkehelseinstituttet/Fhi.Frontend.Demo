import { UrlPaths } from '../../url-paths';

import { MenuItem } from 'src/app/models/menu-item.model';

export class DeveloperMenuData {
  static menutems: MenuItem[] = [{
    name: 'Components',
    link: `/${UrlPaths.developer}/${UrlPaths.components}`
  }, {
    name: 'Colors, fonts',
    link: `/${UrlPaths.developer}/${UrlPaths.colorsAndFonts}`
  }, {
    name: 'Icons',
    link: `/${UrlPaths.developer}/${UrlPaths.icons}`
  // }, {
  //   name: 'Typography',
  //   link: `/${UrlPaths.developer}/${UrlPaths.typography}`
  // }, {
  //   name: 'Colors',
  //   link: `/${UrlPaths.developer}/${UrlPaths.colors}`
  }];
}
