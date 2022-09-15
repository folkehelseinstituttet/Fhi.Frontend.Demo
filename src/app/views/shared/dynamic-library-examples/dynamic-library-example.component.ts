import { Component, Input } from '@angular/core';

import { LibraryItemIds } from '../library/library-item-ids';

@Component({
  selector: 'app-dynamic-library-example',
  templateUrl: './dynamic-library-example.component.html'
})
export class DynamicLibraryExampleComponent {

  @Input() itemId: string;

  itemIds = LibraryItemIds;
}
