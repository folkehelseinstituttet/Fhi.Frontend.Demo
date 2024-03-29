import { Component, Input } from '@angular/core';

import { UrlSegment } from 'src/app/url-segment.constants';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
})
export class MainMenuComponent {
  @Input() projectName: string;

  mainMenuIsOpen = false;

  mainMenuItems: MenuItem[] = [
    {
      name: 'For utviklere',
      link: `/${UrlSegment.developer}`,
      // }, {
      //   name: 'For designere',
      //   link: `/${UrlSegment.designer}`
    },
  ];

  mainMenuClose(): void {
    this.mainMenuIsOpen = false;
  }

  mainMenuToggle(): void {
    this.mainMenuIsOpen = !this.mainMenuIsOpen;
  }
}
