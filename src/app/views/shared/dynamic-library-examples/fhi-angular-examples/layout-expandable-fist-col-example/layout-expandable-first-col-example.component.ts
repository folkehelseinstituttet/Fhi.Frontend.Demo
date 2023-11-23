import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout-expandable-first-col-example',
  templateUrl: './layout-expandable-first-col-example.component.html',
})
export class LayoutExpandableFistColExampleComponent {
  @ViewChild('drawerContent') drawerContent: ElementRef;

  @Input() itemId!: string;
  @Input() itemIds!: any;

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
