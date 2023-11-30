import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
})
export class LayoutsComponent {
  @ViewChild('drawerContent') drawerContent: ElementRef;

  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  drawerHeight = 0;
  drawerIsOpen = false;

  layoutTitle = 'Sidens overskrift';
  layoutType = 'a';

  toggleDrawer() {
    this.drawerIsOpen = !this.drawerIsOpen;

    if (this.drawerIsOpen) {
      this.drawerHeight = this.drawerContent.nativeElement.offsetHeight;
    } else {
      this.drawerHeight = 0;
    }
  }
}
