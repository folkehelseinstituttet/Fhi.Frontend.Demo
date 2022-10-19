import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-header-with-menu',
  templateUrl: './global-header-with-menu.component.html',
  styles: [
  ]
})
export class GlobalHeaderWithMenuExampleComponent implements OnInit {

  constructor() { }

  activeLink = 1;
  mainMenuIsOpen = false;

  ngOnInit() {
  }

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
