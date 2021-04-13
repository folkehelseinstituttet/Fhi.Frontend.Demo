import { Component, Input } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { MainMenuItem } from './main-menu-item.model';
import { UrlPaths } from '../../_felles/konstanter/url-paths';
import { MenuNames } from 'src/app/_felles/konstanter/menu-names';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html'
})
export class MainMenuComponent {

  @Input() prosjektnavn: string;

  faBars = faBars;
  faTimes = faTimes;
  mainMenuIsOpen = false;

  mainMenuItems: MainMenuItem[] = [{
    name: MenuNames.cssBibliotek,
    routerLink: `/${UrlPaths.cssBibliotek}`
  }, {
    name: MenuNames.angularBibliotek,
    routerLink: `/${UrlPaths.angularBibliotek}`
  }];

  mainMenuClose(): void {
    this.mainMenuIsOpen = false;
  }

  mainMenuToggle(): void {
    this.mainMenuIsOpen = !this.mainMenuIsOpen;
  }

}
