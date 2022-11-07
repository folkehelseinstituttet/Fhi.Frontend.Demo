import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drawer-example',
  templateUrl: './drawer-example.component.html'
})
export class DrawerExampleComponent {
  @ViewChild('drawerContent') drawerContent: ElementRef;

  @Input() itemId!: string;
  @Input() itemIds!: any;

  drawerHeight:number = 0;
  drawerIsOpen:boolean = false;

  toggleDrawer() {
    this.drawerIsOpen = !this.drawerIsOpen;

    if (this.drawerIsOpen) {
      this.drawerHeight = this.drawerContent.nativeElement.offsetHeight;
    } else {
      this.drawerHeight = 0;
    }
  }
}
