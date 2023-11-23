import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-global-headers',
  templateUrl: './global-headers.component.html',
})
export class GlobalHeadersExampleComponent {
  @Input() itemId!: string;
  @Input() itemIds!: any;

  activeLink = 1;
  mainMenuIsOpen = false;

  linkSwitch(num: number) {
    this.activeLink = num;
  }

  mainMenuClose(): void {
    this.mainMenuIsOpen = false;
  }

  mainMenuToggle(): void {
    this.mainMenuIsOpen = !this.mainMenuIsOpen;
  }
}
