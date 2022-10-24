import { Component } from '@angular/core';

@Component({
  selector: 'app-global-header-with-menu',
  templateUrl: './global-header-with-menu.component.html'
})
export class GlobalHeaderWithMenuExampleComponent {
  activeLink = 1;
  mainMenuIsOpen = false;

  linkSwitch(num) {
    this.activeLink = num;
  }

  mainMenuClose(): void {
    this.mainMenuIsOpen = false;
  }

  mainMenuToggle(): void {
    this.mainMenuIsOpen = !this.mainMenuIsOpen;
  }
}
