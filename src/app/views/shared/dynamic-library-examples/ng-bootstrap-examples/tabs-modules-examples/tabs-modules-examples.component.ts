import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabs-modules-examples',
  templateUrl: './tabs-modules-examples.component.html'
})
export class TabsModulesExamplesComponent {
  @Input() itemId!: string;
  @Input() itemIds!: any;

  active = 1;
}
