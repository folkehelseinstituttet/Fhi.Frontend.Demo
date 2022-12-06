import { Component } from '@angular/core';

@Component({
  selector: 'app-prototype-pageheader',
  templateUrl: './prototype-pageheader.component.html'
})
export class PrototypePageheaderExampleComponent {
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
