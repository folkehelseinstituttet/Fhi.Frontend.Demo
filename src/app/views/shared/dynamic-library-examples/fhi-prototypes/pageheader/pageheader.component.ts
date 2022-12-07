import { Component } from '@angular/core';
import { PrototypePageheaderDataService } from './pageheader-data.service';

@Component({
  selector: 'app-prototype-pageheader',
  templateUrl: './pageheader.component.html',
  providers: [PrototypePageheaderDataService]
})
export class PrototypePageheaderExampleComponent {
  activeLink: number = -1;
  mainMenuIsOpen: boolean = false;
  prototypeMenuItems: any = [];

  constructor(private dataService: PrototypePageheaderDataService) {}

  ngOnInit() {
    this.prototypeMenuItems = this.dataService.getPrototypeMenuItems();
  }

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
