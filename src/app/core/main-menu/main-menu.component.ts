import { Component, Input } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { MenuItem } from '../../models/menu-item.model';
import { SegmentPaths } from '../../segment-paths';

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
    name: 'CSS library', // TODO: 'For developers', or something like that?
    link: `/${SegmentPaths.developer}`
  }];

  mainMenuClose(): void {
    this.mainMenuIsOpen = false;
  }

  mainMenuToggle(): void {
    this.mainMenuIsOpen = !this.mainMenuIsOpen;
  }

}
