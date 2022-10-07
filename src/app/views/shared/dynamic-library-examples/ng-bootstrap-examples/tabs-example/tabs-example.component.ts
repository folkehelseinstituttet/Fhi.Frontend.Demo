import { Component, Input } from '@angular/core';

import { LibraryItemIds } from 'src/app/library-item-ids';

@Component({
  selector: 'app-tabs-example',
  templateUrl: './tabs-example.component.html'
})
export class TabsExampleComponent {
  active = 1;
  @Input() itemId!: string;

  itemIds = LibraryItemIds;
}
