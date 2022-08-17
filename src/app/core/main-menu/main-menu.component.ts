import { Component, Input } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { MenuItem } from '../../models/menu-item.model';
import { UrlPaths } from '../../_common/constants/url-paths';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html'
})
export class MainMenuComponent {

  @Input() projectName: string;

  faBars = faBars;
  faTimes = faTimes;
  mainMenuIsOpen = false;

  mainMenuItems: MenuItem[] = [{
    name: 'CSS library (Developer)',
    link: `/${UrlPaths.developer}`
  }, {
    name: 'CSS library',
    link: `/${UrlPaths.cssLibrary}`
  }];

  mainMenuClose(): void {
    this.mainMenuIsOpen = false;
  }

  mainMenuToggle(): void {
    this.mainMenuIsOpen = !this.mainMenuIsOpen;
  }

}
