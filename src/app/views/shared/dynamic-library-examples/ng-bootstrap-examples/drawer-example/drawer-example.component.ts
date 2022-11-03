import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drawer-example',
  templateUrl: './drawer-example.component.html'
})
export class DrawerExampleComponent {
  @ViewChild('DrawerTrigger') drawerTrigger!: ElementRef;
  @ViewChild('DrawerContent') drawerContent!: ElementRef;
  @ViewChild('mainContentArea') mainContentArea!: ElementRef;

  @Input() itemId!: string;
  @Input() itemIds!: any;

  drawerIsOpen:boolean = false;

  toggleDrawer() {
    this.drawerIsOpen = !this.drawerIsOpen;
    if (this.drawerIsOpen) {
      console.log(this.drawerContent.nativeElement.offsetHeight);
    }
  }
}
