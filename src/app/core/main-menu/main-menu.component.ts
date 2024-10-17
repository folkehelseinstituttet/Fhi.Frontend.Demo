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
      name: 'Komponenter',
      link: `/${UrlSegment.developer}/${UrlSegment.components}`,
    },
    {
      name: 'Visuell identitet',
      link: `/${UrlSegment.developer}/${UrlSegment.visualIdentity}`,
    },
  ];

  mainMenuClose(): void {
    this.mainMenuIsOpen = false;
  }

  mainMenuToggle(): void {
    this.mainMenuIsOpen = !this.mainMenuIsOpen;
  }
}
