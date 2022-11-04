import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drawer-example',
  templateUrl: './drawer-example.component.html'
})
export class DrawerExampleComponent {
  @ViewChild('drawerContent') drawerContent: ElementRef;
  @ViewChild('drawerTrigger') drawerTrigger: ElementRef;
  @ViewChild('drawerContent2') drawerContent2: ElementRef;
  @ViewChild('drawerTrigger2') drawerTrigger2: ElementRef;

  @Input() itemId!: string;
  @Input() itemIds!: any;

  drawerHeight:number = 0;
  drawerHeight2:number = 0;
  drawerIsOpen:boolean = false;
  drawerIsOpen2:boolean = false;

  toggleDrawer() {
    this.drawerIsOpen = !this.drawerIsOpen;

    if (this.drawerIsOpen) {
      this.drawerHeight = this.drawerContent.nativeElement.offsetHeight + this.drawerTrigger.nativeElement.offsetHeight;
    } else {
      this.drawerHeight = 0;
    }
  }

  toggleDrawer2() {
    this.drawerIsOpen2 = !this.drawerIsOpen2;
    
    if (this.drawerIsOpen2) {
      this.drawerHeight2 = this.drawerContent2.nativeElement.offsetHeight + this.drawerTrigger2.nativeElement.offsetHeight;
    } else {
      this.drawerHeight2 = 0;
    }
  }
}
