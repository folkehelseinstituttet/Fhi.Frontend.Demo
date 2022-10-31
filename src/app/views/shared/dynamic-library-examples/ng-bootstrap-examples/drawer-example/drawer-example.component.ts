import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-drawer-example',
  templateUrl: './drawer-example.component.html'
})
export class DrawerExampleComponent {
  @Input() itemId!: string;
  @Input() itemIds!: any;
}
