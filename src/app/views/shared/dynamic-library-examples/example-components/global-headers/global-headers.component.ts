import { Component, Input } from '@angular/core';
import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
    selector: 'app-global-headers',
    templateUrl: './global-headers.component.html',
    standalone: false
})
export class GlobalHeadersComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

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
