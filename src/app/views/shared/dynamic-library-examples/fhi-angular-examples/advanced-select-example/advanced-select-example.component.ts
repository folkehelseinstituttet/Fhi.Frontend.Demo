import { Component, Input } from '@angular/core';

import { LibraryItemIds } from 'src/app/library-item-ids';

@Component({
  selector: 'app-advanced-select-example',
  templateUrl: './advanced-select-example.component.html',
  styles: [
  ]
})
export class AdvancedSelectExampleComponent {

  @Input() itemId!: string;

  itemIds = LibraryItemIds;
}
