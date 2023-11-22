import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-layout-templates',
  templateUrl: './layout-templates.component.html',
})
export class LayoutTemplatesComponent {
  @ViewChild('drawerContent') drawerContent: ElementRef;

  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  drawerHeight = 0;
  drawerIsOpen = false;

  toggleDrawer() {
    this.drawerIsOpen = !this.drawerIsOpen;

    if (this.drawerIsOpen) {
      this.drawerHeight = this.drawerContent.nativeElement.offsetHeight;
    } else {
      this.drawerHeight = 0;
    }
  }
}
