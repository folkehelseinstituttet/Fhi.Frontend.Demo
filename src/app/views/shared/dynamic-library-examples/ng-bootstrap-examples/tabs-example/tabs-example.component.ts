import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabs-example',
  templateUrl: './tabs-example.component.html'
})
export class TabsExampleComponent {
  @Input() itemId!: string;
  @Input() itemIds!: any;

  active = 1;
}
